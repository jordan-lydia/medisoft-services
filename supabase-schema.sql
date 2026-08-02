-- =============================================================
-- Medisoft Services - Supabase initialization script
-- =============================================================
-- 1) Enable the UUID extension if it does not exist.
create extension if not exists pgcrypto;

-- 2) Public tables
create table if not exists public.services (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    description text,
    icon text default 'fa-cog',
    image text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists public.partners (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    url text,
    logo text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists public.teams (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    description text,
    tags text[] default '{}',
    image text,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists public.realisations (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    description text,
    media_type text default 'photo',
    media_url text,
    type text default 'photo',
    tags text[] default '{}',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists public.actualites (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    category text default 'Actualité',
    excerpt text,
    content text,
    image text,
    date date default current_date,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists public.service_requests (
    id uuid primary key default gen_random_uuid(),
    service_name text,
    service_id text,
    full_name text not null,
    email text not null,
    phone text not null,
    company text,
    preferred_date text,
    message text,
    status text default 'pending',
    timestamp timestamptz default now(),
    date_formatted text
);

create table if not exists public.partnership_messages (
    id uuid primary key default gen_random_uuid(),
    name text,
    email text,
    company text,
    message text,
    pdf_url text,
    timestamp timestamptz default now(),
    date_formatted text
);

create table if not exists public.visitors (
    id text primary key default 'visitor-counter',
    count integer default 0
);

-- 3) Useful indexes
create index if not exists idx_services_created_at on public.services (created_at desc);
create index if not exists idx_partners_created_at on public.partners (created_at desc);
create index if not exists idx_teams_created_at on public.teams (created_at desc);
create index if not exists idx_realisations_created_at on public.realisations (created_at desc);
create index if not exists idx_actualites_date on public.actualites (date desc);
create index if not exists idx_service_requests_timestamp on public.service_requests (timestamp desc);
create index if not exists idx_partnership_messages_timestamp on public.partnership_messages (timestamp desc);

-- 4) Storage bucket for files (media)
insert into storage.buckets (id, name, public)
values ('medisoft-media', 'medisoft-media', true)
on conflict (id) do nothing;

-- 5) Reset all RLS policies; then create secure ones.
alter table public.services enable row level security;
alter table public.partners enable row level security;
alter table public.teams enable row level security;
alter table public.realisations enable row level security;
alter table public.actualites enable row level security;
alter table public.service_requests enable row level security;
alter table public.partnership_messages enable row level security;
alter table public.visitors enable row level security;

-- Public read policies for site content
create policy "public_read_services" on public.services
    for select using (true);

create policy "public_read_partners" on public.partners
    for select using (true);

create policy "public_read_teams" on public.teams
    for select using (true);

create policy "public_read_realisations" on public.realisations
    for select using (true);

create policy "public_read_actualites" on public.actualites
    for select using (true);

-- Public insert for contact forms
create policy "public_insert_service_requests" on public.service_requests
    for insert with check (true);

create policy "public_insert_partnership_messages" on public.partnership_messages
    for insert with check (true);

create policy "public_upsert_visitors" on public.visitors
    for insert with check (true);

create policy "public_update_visitors" on public.visitors
    for update using (true) with check (true);

create policy "public_select_visitors" on public.visitors
    for select using (true);

-- Authenticated admin CRUD policies
create policy "admin_all_services" on public.services
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

create policy "admin_all_partners" on public.partners
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

create policy "admin_all_teams" on public.teams
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

create policy "admin_all_realisations" on public.realisations
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

create policy "admin_all_actualites" on public.actualites
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

create policy "admin_all_service_requests" on public.service_requests
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

create policy "admin_all_partnership_messages" on public.partnership_messages
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

create policy "admin_all_visitors" on public.visitors
    for all using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

-- 6) Optional seed data
insert into public.services (title, description, icon, image)
values
    ('Conseil Informatique', 'Audit technique, stratégie IT et accompagnement personnalisé', 'fa-lightbulb', 'Conseil Informatique.jpeg'),
    ('Maintenance Réseaux', 'Gestion complète de votre infrastructure réseau et sécurité', 'fa-server', 'Maintenance & Administration Réseaux (7).jpeg'),
    ('Caméras de Surveillance', 'Solutions de vidéosurveillance haute définition', 'fa-camera', 'Installation de Caméras de Surveillance.jpeg'),
    ('Systèmes Embarqués', 'Conception de solutions IoT sur mesure', 'fa-microchip', 'Systèmes Embarqués (5).jpeg')
on conflict do nothing;

insert into public.partners (name, url, logo)
values
    ('Mwalimu Logistics', 'https://mwalimulogistics.com/', 'mwalimu.jpg'),
    ('Thiermar Company', 'https://www.thiermarcompany.com/accueil', 'thiermar.jpg'),
    ('Kamoto Copper Company', 'https://www.kamotocoppercompany.com/', 'kamoto.jpg'),
    ('Malabar Group', 'https://www.malabar-group.com/', 'malabar.jpg')
on conflict do nothing;

insert into public.teams (name, description, tags, image)
values
    ('Systèmes Embarqués', 'Notre équipe spécialisée en IoT', ARRAY['5 experts', 'IoT'], 'Systèmes Embarqués.jpeg.jpeg'),
    ('Équipe Technique', 'Nos experts à votre service', ARRAY['12 ingénieurs', '24/7 Support'], 'Équipe technique.jpeg')
on conflict do nothing;

insert into public.realisations (title, description, media_type, media_url, type, tags)
values
    ('Installation Caméras de Surveillance', 'Installation professionnelle de vidéosurveillance', 'photo', 'Installation de Caméras de Surveillance.jpeg', 'surveillance', ARRAY['Surveillance', 'Sécurité']),
    ('Projet IoT - Malabar Group', 'Installation système embarqué', 'video', 'Projet IoT - Malabar Group video.mp4', 'embarque', ARRAY['IoT', 'Malabar']),
    ('Maintenance Réseaux', 'Configuration et maintenance réseau', 'photo', 'Maintenance & Administration Réseaux (2).jpeg', 'reseau', ARRAY['Réseau', 'Maintenance']),
    ('Installation Électrique', 'Installation électrique bâtiment', 'video', 'elec.mp4', 'video', ARRAY['Électricité', 'Bâtiment'])
on conflict do nothing;

insert into public.actualites (title, category, excerpt, content, image, date)
values
    ('Medisoft Services s''implante à Lubumbashi', 'Expansion', 'Nous sommes fiers d''annoncer l''ouverture de notre nouveau bureau à Lubumbashi...', 'Medisoft Services continue son expansion en République Démocratique du Congo.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', current_date),
    ('Nouvelle solution de surveillance IA disponible', 'Innovation', 'Découvrez notre nouvelle gamme de caméras intelligentes avec reconnaissance faciale.', 'Nous sommes ravis d''annoncer le lancement de notre nouvelle gamme de caméras...', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800', current_date - 7),
    ('Partenariat stratégique avec Microsoft Azure', 'Partenariat', 'Medisoft Services devient partenaire officiel Microsoft Azure.', 'Nous avons le plaisir d''annoncer notre nouveau partenariat avec Microsoft Azure.', 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800', current_date - 14)
on conflict do nothing;

insert into public.visitors (id, count)
values ('visitor-counter', 0)
on conflict (id) do nothing;

-- 7) Storage policy for the public bucket
create policy "public_read_medisoft_bucket"
on storage.objects for select using (bucket_id = 'medisoft-media');

create policy "authenticated_insert_medisoft_bucket"
on storage.objects for insert with check (
    bucket_id = 'medisoft-media' and auth.role() = 'authenticated'
);

create policy "authenticated_update_medisoft_bucket"
on storage.objects for update using (
    bucket_id = 'medisoft-media' and auth.role() = 'authenticated'
) with check (bucket_id = 'medisoft-media' and auth.role() = 'authenticated');

create policy "authenticated_delete_medisoft_bucket"
on storage.objects for delete using (
    bucket_id = 'medisoft-media' and auth.role() = 'authenticated'
);
