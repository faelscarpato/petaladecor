create or replace function public.get_catalog_products(
  p_slug text,
  p_query text default null,
  p_brand text default null,
  p_category text default null,
  p_limit int default 60,
  p_offset int default 0
)
returns table (
  id uuid,
  code text,
  name text,
  brand text,
  category text,
  description text,
  image_url text,
  store_name text,
  whatsapp_phone text
)
language sql
security definer
set search_path = public
as $$
  select
    p.id,
    p.code,
    p.name,
    p.brand,
    p.category,
    p.description,
    p.image_url,
    c.store_name,
    c.whatsapp_phone
  from public_catalogs c
  join products p on p.tenant_id = c.tenant_id
  where c.slug = p_slug
    and c.is_active = true
    and p.is_active = true
    and (p_query is null or (
      p.name ilike '%' || p_query || '%'
      or p.brand ilike '%' || p_query || '%'
      or p.code ilike '%' || p_query || '%'
      or p.category ilike '%' || p_query || '%'
    ))
    and (p_brand is null or p.brand = p_brand)
    and (p_category is null or p.category = p_category)
  order by p.name asc
  limit p_limit
  offset p_offset;
$$;

grant execute on function public.get_catalog_products(
  text,
  text,
  text,
  text,
  int,
  int
) to anon, authenticated;
