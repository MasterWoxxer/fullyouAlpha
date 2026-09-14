import { supabase } from "./supabaseClient";

export interface FocusItem {
  id: number;
  user_id: string;
  title: string;
  kind: string | null;
  created_at: string;
  archived_at: string | null;
}

export interface LensDefinition {
  id: number;
  key: string;
  label: string;
  min_value: number;
  max_value: number;
  sort_order: number;
}

export interface PresentationState {
  parked: boolean;
  x: number | null;
  y: number | null;
}

export interface WorthItMap {
  items: FocusItem[];
  lensDefinitions: LensDefinition[];
  ratings: Record<number, Record<string, number>>; // focusItemId -> lensKey -> current value
  presentation: Record<number, PresentationState>; // focusItemId -> park/position state
}

export async function getPresentationState(userId: string): Promise<Record<number, PresentationState>> {
  const { data, error } = await supabase
    .from("map_presentation_state")
    .select("focus_item_id, parked, x, y")
    .eq("user_id", userId);
  if (error) throw error;

  const presentation: Record<number, PresentationState> = {};
  for (const row of data ?? []) {
    presentation[row.focus_item_id] = { parked: row.parked, x: row.x, y: row.y };
  }
  return presentation;
}

export async function getWorthItMap(userId: string): Promise<WorthItMap> {
  const [itemsRes, lensRes, eventsRes, presentation] = await Promise.all([
    supabase
      .from("focus_items")
      .select("*")
      .eq("user_id", userId)
      .is("archived_at", null)
      .order("created_at", { ascending: true }),
    supabase.from("lens_definitions").select("*").order("sort_order", { ascending: true }),
    supabase
      .from("lens_rating_events")
      .select("focus_item_id, lens_key, value, observed_at")
      .eq("user_id", userId)
      .order("observed_at", { ascending: true }),
    getPresentationState(userId),
  ]);

  if (itemsRes.error) throw itemsRes.error;
  if (lensRes.error) throw lensRes.error;
  if (eventsRes.error) throw eventsRes.error;

  // reduce append-only event log down to the latest value per (item, lens)
  const ratings: WorthItMap["ratings"] = {};
  for (const event of eventsRes.data ?? []) {
    ratings[event.focus_item_id] ??= {};
    ratings[event.focus_item_id][event.lens_key] = event.value;
  }

  return {
    items: itemsRes.data ?? [],
    lensDefinitions: lensRes.data ?? [],
    ratings,
    presentation,
  };
}

export async function upsertPresentationState(
  userId: string,
  focusItemId: number,
  patch: { parked?: boolean; x?: number; y?: number },
): Promise<void> {
  const existing = await supabase
    .from("map_presentation_state")
    .select("parked, x, y")
    .eq("user_id", userId)
    .eq("focus_item_id", focusItemId)
    .maybeSingle();
  if (existing.error) throw existing.error;

  const { error } = await supabase.from("map_presentation_state").upsert(
    {
      user_id: userId,
      focus_item_id: focusItemId,
      parked: patch.parked ?? existing.data?.parked ?? false,
      x: patch.x ?? existing.data?.x ?? null,
      y: patch.y ?? existing.data?.y ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,focus_item_id" },
  );
  if (error) throw error;
}

export async function createFocusItem(
  userId: string,
  title: string,
  kind?: string,
): Promise<FocusItem> {
  const { data, error } = await supabase
    .from("focus_items")
    .insert({ user_id: userId, title, kind: kind ?? null })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function appendLensRating(
  userId: string,
  focusItemId: number,
  lensKey: string,
  value: number,
  source = "user",
): Promise<void> {
  const { error } = await supabase.from("lens_rating_events").insert({
    user_id: userId,
    focus_item_id: focusItemId,
    lens_key: lensKey,
    value,
    observed_at: new Date().toISOString(),
    source,
  });

  if (error) throw error;
}

// hard delete, cleanup only (e.g. accidental duplicate items) — not the "archive" concept from the spec
export async function deleteFocusItem(userId: string, focusItemId: number): Promise<void> {
  const ratingsDelete = await supabase
    .from("lens_rating_events")
    .delete()
    .eq("user_id", userId)
    .eq("focus_item_id", focusItemId);
  if (ratingsDelete.error) throw ratingsDelete.error;

  const presentationDelete = await supabase
    .from("map_presentation_state")
    .delete()
    .eq("user_id", userId)
    .eq("focus_item_id", focusItemId);
  if (presentationDelete.error) throw presentationDelete.error;

  const itemDelete = await supabase
    .from("focus_items")
    .delete()
    .eq("user_id", userId)
    .eq("id", focusItemId);
  if (itemDelete.error) throw itemDelete.error;
}
