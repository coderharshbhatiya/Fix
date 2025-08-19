-- Core domain tables (minimal columns to run)

create table if not exists categories (
  id serial primary key,
  name text not null,
  slug text unique not null,
  parent_id int references categories(id)
);

insert into categories (name, slug)
values ('Plumbing','plumbing'),('Electrician','electrician'),('Cleaning','cleaning')
on conflict do nothing;

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null,
  category_id int references categories(id) not null,
  title text not null,
  description text,
  pricing_type text not null default 'fixed',
  price_min int,
  price_max int,
  base_price int,
  is_instant_book boolean default false,
  is_active boolean default true
);

create table if not exists requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  category_id int references categories(id) not null,
  title text not null,
  description text,
  emergency boolean default false,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table if not exists bids (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references requests(id) on delete cascade,
  provider_id uuid not null,
  amount int not null,
  eta_min int,
  note text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique(provider_id, request_id)
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  type text not null,
  request_id uuid references requests(id),
  service_id uuid references services(id),
  user_id uuid not null,
  provider_id uuid not null,
  status text not null default 'pending_payment',
  subtotal_amount int not null,
  emergency_fee int not null default 0,
  service_fee int not null,
  total_amount int not null,
  created_at timestamptz not null default now()
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  provider_order_id text,
  provider_payment_id text,
  status text not null,
  amount_cents int not null,
  currency text not null default 'INR',
  user_id uuid,
  booking_id uuid references bookings(id),
  raw jsonb
);

-- Simple seed of demo services
insert into services (provider_id, category_id, title, description, pricing_type, base_price, is_instant_book)
values ('00000000-0000-0000-0000-000000000001', 1, 'Tap Fix', 'Fix leaking tap', 'fixed', 299, true),
       ('00000000-0000-0000-0000-000000000002', 2, 'Fan Install', 'Install ceiling fan', 'fixed', 499, true)
on conflict do nothing;
