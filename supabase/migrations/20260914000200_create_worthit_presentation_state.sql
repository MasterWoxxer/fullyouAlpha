-- "Parked" (tucked out of the field) and bubble position are presentation-only state,
-- but still need to persist across sessions/devices so users don't lose their park work.
create table if not exists fullyou_alpha.map_presentation_state (
  user_id text not null,
  focus_item_id integer not null references fullyou_alpha.focus_items(id),
  parked boolean not null default false,
  x double precision,
  y double precision,
  updated_at timestamptz not null default now(),
  primary key (user_id, focus_item_id)
);

grant all on fullyou_alpha.map_presentation_state to service_role;
