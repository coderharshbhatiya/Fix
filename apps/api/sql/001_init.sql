create extension if not exists postgis;

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  firebase_uid text unique not null,
  role text not null default 'user',
  name text,
  phone text,
  photo_url text,
  created_at timestamptz not null default now()
);

create table if not exists providers (
  id uuid primary key references users(id) on delete cascade,
  trade text,
  service_radius_km int default 10,
  avg_rating numeric default 0,
  ratings_count int default 0
);
