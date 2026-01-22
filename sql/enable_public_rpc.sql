alter function public.get_catalog_products(p_slug text)
security definer
set search_path = public;

grant execute on function public.get_catalog_products(text) to anon, authenticated;
