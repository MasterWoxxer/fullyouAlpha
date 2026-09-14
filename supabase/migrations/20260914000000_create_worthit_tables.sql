-- Worth-It Filter (bubbles) minimal persistent slice: isolated in its own schema
-- so it can't collide with other Woxxer/Full You tables already in this project.
create schema if not exists fullyou_alpha;

create table if not exists fullyou_alpha.focus_items (
  id integer generated always as identity primary key,
  user_id text not null,
  title text not null,
  kind text,
  created_at timestamptz not null default now(),
  archived_at timestamptz
);

create table if not exists fullyou_alpha.lens_definitions (
  id integer generated always as identity primary key,
  key text not null unique,
  label text not null,
  min_value integer not null default 1,
  max_value integer not null default 10,
  sort_order integer not null default 0
);

-- append-only: never update/delete rows, only insert new events
create table if not exists fullyou_alpha.lens_rating_events (
  id integer generated always as identity primary key,
  user_id text not null,
  focus_item_id integer not null references fullyou_alpha.focus_items(id),
  lens_key text not null references fullyou_alpha.lens_definitions(key),
  value integer not null,
  observed_at timestamptz not null default now(),
  recorded_at timestamptz not null default now(),
  source text not null default 'user'
);

create index if not exists lens_rating_events_lookup
  on fullyou_alpha.lens_rating_events (user_id, focus_item_id, lens_key, observed_at desc);

insert into fullyou_alpha.lens_definitions (key, label, sort_order) values
  ('today', 'Motivation / pull today', 1),
  ('mission', 'Importance to mission', 2),
  ('realMoney', 'Real money now', 3),
  ('moneyPotential', 'Money potential', 4),
  ('enjoyWork', 'Enjoy the work', 5),
  ('goodWorld', 'Good in the world', 6),
  ('momentum', 'External momentum', 7)
on conflict (key) do nothing;
