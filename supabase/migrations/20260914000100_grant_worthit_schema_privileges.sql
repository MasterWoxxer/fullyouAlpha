-- Exposing a schema via the Data API settings doesn't grant Postgres privileges on it —
-- do that explicitly here so the service_role (and future anon/authenticated roles) can use it.
grant usage on schema fullyou_alpha to service_role, anon, authenticated;

grant all on all tables in schema fullyou_alpha to service_role;
grant usage, select on all sequences in schema fullyou_alpha to service_role;

alter default privileges in schema fullyou_alpha grant all on tables to service_role;
alter default privileges in schema fullyou_alpha grant usage, select on sequences to service_role;
