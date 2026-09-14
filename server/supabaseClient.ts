import { createClient } from "@supabase/supabase-js";
import ws from "ws";

if (!process.env.SUPABASE_URL) {
  throw new Error("SUPABASE_URL is not set, ensure the Supabase project is configured");
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set, ensure the Supabase project is configured");
}

// service_role key bypasses RLS — server-side only, never expose to the browser/iframe
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    db: { schema: "fullyou_alpha" },
    // Node 20 has no native WebSocket global; supabase-js's realtime client needs one even though we don't use realtime features
    realtime: { transport: ws as any },
  },
);
