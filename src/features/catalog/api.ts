import { supabase } from "../../lib/supabase";

export type CatalogProduct = {
  id: string;
  code: string | null;
  name: string;
  brand: string;
  category: string | null;
  description: string | null;
  image_url: string | null;
  store_name: string;
  whatsapp_phone: string;
};

export type CatalogQuery = {
  slug: string;
  query?: string;
  brand?: string;
  category?: string;
  limit?: number;
  offset?: number;
};

export type CatalogBrand = {
  brand: string;
};

export async function fetchCatalogProducts(
  params: CatalogQuery
): Promise<CatalogProduct[]> {
  const {
    slug,
    query,
    brand,
    category,
    limit = 60,
    offset = 0,
  } = params;

  const { data, error } = await supabase.rpc("get_catalog_products", {
    p_slug: slug,
    p_query: query || null,
    p_brand: brand || null,
    p_category: category || null,
    p_limit: limit,
    p_offset: offset,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return [];
  }

  return data as CatalogProduct[];
}

export async function fetchCatalogBrands(slug: string): Promise<CatalogBrand[]> {
  const { data, error } = await supabase.rpc("get_catalog_brands", {
    p_slug: slug,
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    return [];
  }

  return data as CatalogBrand[];
}
