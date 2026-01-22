import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import InstallBanner from "../pwa/InstallBanner";
import {
  fetchCatalogBrands,
  fetchCatalogProducts,
  type CatalogBrand,
  type CatalogProduct,
} from "../features/catalog/api";

const DEFAULT_WHATSAPP = "5519995466902";
const DEFAULT_STORE_NAME = "Pet Shop Sao Francisco";
const BRAND_IMAGE_MAP: Record<string, string> = {
  "SPECIAL DOG": "/images/brands/special-dog.svg",
  ULTRALIFE: "/images/brands/ultralife.svg",
  OUTROS: "/images/brands/default.svg",
};

const BRAND_KEYWORDS = ["SPECIAL DOG", "ULTRALIFE"];

type CartState = Record<string, number>;

type CartItem = {
  product: CatalogProduct;
  qty: number;
};

function normalizeBrand(value: string): string {
  return value.trim().replace(/\s+/g, " ").toUpperCase();
}

function resolveBrandImage(brand: string, name: string): string {
  const normalizedBrand = normalizeBrand(brand);
  if (BRAND_IMAGE_MAP[normalizedBrand]) {
    return BRAND_IMAGE_MAP[normalizedBrand];
  }
  const upperName = name.toUpperCase();
  const match = BRAND_KEYWORDS.find((keyword) => upperName.includes(keyword));
  if (match && BRAND_IMAGE_MAP[match]) {
    return BRAND_IMAGE_MAP[match];
  }
  return BRAND_IMAGE_MAP.OUTROS;
}

export default function CatalogPage() {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("Todos");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [brandOptions, setBrandOptions] = useState<CatalogBrand[]>([]);
  const [cart, setCart] = useState<CartState>({});
  const [note, setNote] = useState("");

  const loadProducts = useCallback(
    async (options?: { reset?: boolean }) => {
      const reset = options?.reset ?? false;
    if (!slug) {
      return;
    }
      if (reset) {
        setLoading(true);
        setError(null);
        setPage(0);
      } else {
        setLoadingMore(true);
      }
      try {
        const data = await fetchCatalogProducts({
          slug,
          query: query.trim() || undefined,
          brand: brand === "Todos" ? undefined : brand,
          category: undefined,
          limit: 60,
          offset: reset ? 0 : page * 60,
        });
        setProducts((prev) => (reset ? data : [...prev, ...data]));
        setHasMore(data.length === 60);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Erro ao carregar.";
        setError(message);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [slug, query, brand, page]
  );

  useEffect(() => {
    const handle = setTimeout(() => {
      void loadProducts({ reset: true });
    }, 300);
    return () => clearTimeout(handle);
  }, [loadProducts]);

  useEffect(() => {
    if (!slug) {
      return;
    }
    fetchCatalogBrands(slug)
      .then((data) => setBrandOptions(data))
      .catch(() => setBrandOptions([]));
  }, [slug]);

  const storeName =
    products.find((item) => item.store_name)?.store_name ?? DEFAULT_STORE_NAME;

  const whatsappPhone =
    products.find((item) => item.whatsapp_phone)?.whatsapp_phone ||
    DEFAULT_WHATSAPP;

  const normalizedPhone = whatsappPhone.replace(/\D/g, "");

  const brands = useMemo(() => {
    const unique = new Map<string, string>();
    brandOptions.forEach((item) => {
      if (item.brand) {
        const normalized = normalizeBrand(item.brand);
        if (!unique.has(normalized)) {
          unique.set(normalized, item.brand.trim());
        }
      }
    });
    return Array.from(unique.entries())
      .map(([normalized, label]) => ({ normalized, label }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [brandOptions]);

  const filteredProducts = products;

  const cartItems = useMemo<CartItem[]>(() => {
    return products
      .filter((item) => cart[item.id])
      .map((item) => ({ product: item, qty: cart[item.id] }));
  }, [products, cart]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.qty, 0);
  }, [cartItems]);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] ?? 0;
      const nextQty = current + delta;
      if (nextQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: nextQty };
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const cartEmpty = cartItems.length === 0;

  const message = useMemo(() => {
    if (cartItems.length === 0) {
      return "";
    }

    const lines = [
      `Ola! Quero orcamento na ${storeName}:`,
      ...cartItems.map(({ product, qty }) => {
        const codePart = product.code ? `(${product.code}) ` : "";
        return `${qty}x ${codePart}${product.name}  ${product.brand}`;
      }),
    ];

    if (note.trim()) {
      lines.push(`Observacao: ${note.trim()}`);
    }

    return lines.join("\n");
  }, [cartItems, note, storeName]);

  const whatsappUrl = cartEmpty
    ? ""
    : `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-ink)]">
      <InstallBanner />
      <header className="sticky top-0 z-40 bg-[var(--brand-bg)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src="/logo1.jpeg"
              alt="Logo"
              className="h-12 w-12 rounded-2xl border border-[var(--brand-border)] bg-white object-cover shadow-sm"
            />
            <div>
              <div className="text-lg font-semibold">{storeName}</div>
              <div className="text-sm text-gray-600">Catalogo publico</div>
            </div>
          </div>
          <a
            href={`https://wa.me/${normalizedPhone}`}
            target="_blank"
            rel="noreferrer"
            className="min-h-[44px] rounded-full border border-[var(--brand-border)] bg-white px-4 py-2 text-base font-semibold text-[var(--brand-blue)] shadow-sm"
          >
            WhatsApp
          </a>
        </div>
        <div className="px-4 pb-3">
          <div className="mx-auto max-w-6xl">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nome, marca ou codigo"
              list="catalog-suggestions"
              className="h-12 w-full rounded-full border border-[var(--brand-border)] bg-white px-5 text-base shadow-sm"
            />
            <datalist id="catalog-suggestions">
              {products.slice(0, 50).map((item) => (
                <option key={item.id} value={item.name} />
              ))}
            </datalist>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pb-28 lg:flex-row lg:gap-6">
        <section className="flex-1">
          <div className="grid gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                type="button"
                onClick={() => {
                  setBrand("Todos");
                  setPage(0);
                }}
                className={`min-h-[44px] whitespace-nowrap rounded-full border px-4 text-base font-semibold ${
                  brand === "Todos"
                    ? "border-[var(--brand-blue)] bg-[var(--brand-blue)] text-white shadow-sm"
                    : "border-[var(--brand-border)] bg-white text-[var(--brand-ink)]"
                }`}
              >
                Todas
              </button>
              {brands.map((item) => (
                <button
                  key={item.normalized}
                  type="button"
                  onClick={() => {
                    setBrand(item.label);
                    setPage(0);
                  }}
                  className={`min-h-[44px] whitespace-nowrap rounded-full border px-4 text-base font-semibold ${
                    normalizeBrand(brand) === item.normalized
                      ? "border-[var(--brand-blue)] bg-[var(--brand-blue)] text-white shadow-sm"
                      : "border-[var(--brand-border)] bg-white text-[var(--brand-ink)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="rounded-2xl border border-[var(--brand-border)] bg-white p-4 shadow-sm">
              <label className="block text-base font-semibold">
                Observacao para o pedido
              </label>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                rows={3}
                placeholder="Escreva detalhes do pedido"
                className="mt-2 w-full rounded-xl border border-[var(--brand-border)] bg-white px-3 py-2 text-base"
              />
            </div>
          </div>

          {loading ? (
            <div className="mt-4 rounded-2xl border border-[var(--brand-border)] bg-white p-4 text-base shadow-sm">
              Carregando produtos
            </div>
          ) : error ? (
            <div className="mt-4 rounded-2xl border border-[var(--brand-border)] bg-white p-4 shadow-sm">
              <div className="text-base font-semibold">Erro ao carregar</div>
              <div className="mt-1 text-base text-gray-700">{error}</div>
              <button
                type="button"
                onClick={() => void loadProducts()}
                className="mt-3 min-h-[44px] rounded-full bg-[var(--brand-blue)] px-4 py-2 text-base font-semibold text-white"
              >
                Tentar novamente
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-[var(--brand-border)] bg-white p-4 text-base shadow-sm">
              <div className="font-semibold">Nenhum produto encontrado</div>
              <div className="mt-1 text-gray-700">
                Tente outra marca ou busque pelo nome.
              </div>
            </div>
          ) : (
            <>
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((item) => (
                  <div
                    key={item.id}
                    className="flex h-full flex-col rounded-3xl border border-[var(--brand-border)] bg-white shadow-sm"
                  >
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-48 w-full rounded-t-3xl object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <img
                        src={resolveBrandImage(item.brand, item.name)}
                        alt={item.brand || "Marca"}
                        className="h-48 w-full rounded-t-3xl object-cover"
                        loading="lazy"
                      />
                    )}
                    <div className="flex flex-1 flex-col gap-2 p-4">
                      <div className="text-base font-semibold">{item.name}</div>
                      <div className="text-base text-gray-700">{item.brand}</div>
                      {item.code ? (
                        <div className="text-base text-gray-700">
                          Codigo: {item.code}
                        </div>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => addToCart(item.id)}
                        className="mt-auto min-h-[44px] rounded-full bg-[var(--brand-blue)] px-4 py-2 text-base font-semibold text-white shadow-sm"
                      >
                        Adicionar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {hasMore ? (
                <button
                  type="button"
                  onClick={() => {
                    setPage((prev) => prev + 1);
                    void loadProducts({ reset: false });
                  }}
                  disabled={loadingMore}
                  className="mt-4 min-h-[44px] w-full rounded-full border border-[var(--brand-border)] bg-white px-4 py-2 text-base font-semibold text-[var(--brand-blue)] shadow-sm"
                >
                  {loadingMore ? "Carregando..." : "Carregar mais"}
                </button>
              ) : null}
            </>
          )}
        </section>

        <aside className="hidden w-full max-w-xs flex-col gap-4 rounded-3xl border border-[var(--brand-border)] bg-white p-4 shadow-sm lg:flex">
          <div className="text-lg font-semibold">Carrinho</div>
          {cartItems.length === 0 ? (
            <div className="text-base text-gray-700">
              Nenhum item no carrinho.
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {cartItems.map(({ product, qty }) => (
                <div key={product.id} className="border-t border-[#E5E7EB] pt-3">
                  <div className="text-base font-semibold">{product.name}</div>
                  <div className="text-base text-gray-700">{product.brand}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQty(product.id, -1)}
                      className="min-h-[44px] min-w-[44px] rounded-full border border-[var(--brand-border)] bg-white text-base"
                    >
                      -
                    </button>
                    <div className="text-base font-semibold">{qty}</div>
                    <button
                      type="button"
                      onClick={() => updateQty(product.id, 1)}
                      className="min-h-[44px] min-w-[44px] rounded-full border border-[var(--brand-border)] bg-white text-base"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="ml-auto min-h-[44px] rounded-full border border-[var(--brand-border)] bg-white px-3 text-base"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <a
            href={cartEmpty ? undefined : whatsappUrl}
            target={cartEmpty ? undefined : "_blank"}
            rel={cartEmpty ? undefined : "noreferrer"}
            onClick={(event) => {
              if (cartEmpty) {
                event.preventDefault();
              }
            }}
            className={`min-h-[44px] rounded-full px-4 py-2 text-center text-base font-semibold ${
              cartEmpty
                ? "border border-[var(--brand-border)] text-gray-400"
                : "bg-[var(--brand-whatsapp)] text-white"
            }`}
          >
            Enviar orcamento ({totalItems})
          </a>
        </aside>
      </main>

      <div className="fixed bottom-0 left-0 right-0 border-t border-[var(--brand-border)] bg-white p-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-1">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="min-h-[44px] rounded-full border border-[var(--brand-border)] bg-white px-4 text-base font-semibold shadow-sm"
          >
            Itens: {totalItems}
          </button>
          <a
            href={cartEmpty ? undefined : whatsappUrl}
            target={cartEmpty ? undefined : "_blank"}
            rel={cartEmpty ? undefined : "noreferrer"}
            onClick={(event) => {
              if (cartEmpty) {
                event.preventDefault();
              }
            }}
            className={`min-h-[44px] rounded-full px-4 py-2 text-center text-base font-semibold shadow-sm ${
              cartEmpty
                ? "border border-[var(--brand-border)] text-gray-400"
                : "bg-[var(--brand-whatsapp)] text-white"
            }`}
          >
            Enviar pedido ({totalItems})
          </a>
        </div>
      </div>

      {cartOpen ? (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden">
          <div className="absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white p-4 shadow-[0_-12px_40px_rgba(15,23,42,0.15)]">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold">Conferir pedido</div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="min-h-[44px] rounded-full border border-[var(--brand-border)] bg-white px-4 text-base"
              >
                Fechar
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {cartItems.length === 0 ? (
                <div className="text-base text-gray-700">
                  Nenhum item no carrinho.
                </div>
              ) : (
                cartItems.map(({ product, qty }) => (
                  <div
                    key={product.id}
                    className="rounded-2xl border border-[var(--brand-border)] bg-white p-3 shadow-sm"
                  >
                    <div className="text-base font-semibold">{product.name}</div>
                    <div className="text-base text-gray-700">{product.brand}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(product.id, -1)}
                        className="min-h-[44px] min-w-[44px] rounded-full border border-[var(--brand-border)] bg-white text-base"
                      >
                        -
                      </button>
                      <div className="text-base font-semibold">{qty}</div>
                      <button
                        type="button"
                        onClick={() => updateQty(product.id, 1)}
                        className="min-h-[44px] min-w-[44px] rounded-full border border-[var(--brand-border)] bg-white text-base"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(product.id)}
                        className="ml-auto min-h-[44px] rounded-full border border-[var(--brand-border)] bg-white px-3 text-base"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <a
              href={cartEmpty ? undefined : whatsappUrl}
              target={cartEmpty ? undefined : "_blank"}
              rel={cartEmpty ? undefined : "noreferrer"}
              onClick={(event) => {
                if (cartEmpty) {
                  event.preventDefault();
                }
              }}
              className={`mt-4 block min-h-[44px] rounded-full px-4 py-2 text-center text-base font-semibold shadow-sm ${
                cartEmpty
                  ? "border border-[var(--brand-border)] text-gray-400"
                  : "bg-[var(--brand-whatsapp)] text-white"
              }`}
            >
              Enviar pedido ({totalItems})
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
