create or replace function public.get_catalog_brands(p_slug text)
returns table (brand text)
language sql
security definer
set search_path = public
as $$
  select distinct p.brand
  from public_catalogs c
  join products p on p.tenant_id = c.tenant_id
  where c.slug = p_slug
    and c.is_active = true
    and p.is_active = true
    and p.brand is not null
  order by p.brand asc;
$$;

grant execute on function public.get_catalog_brands(text) to anon, authenticated;
