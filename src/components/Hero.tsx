export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16">
      <div className="hero-glow absolute inset-0 -z-10" />
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-[0.4em] text-muted">
            Pétala Decor
          </p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-navy md:text-5xl">
            Decoração com presença. Detalhes que transformam ambientes.
          </h1>
          <p className="mt-4 text-base text-muted md:text-lg">
            Porcelanas, resina e peças decorativas selecionadas para compor
            cenas sofisticadas e memoráveis.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#colecoes"
              className="rounded-full bg-navy px-6 py-3 text-sm font-medium text-porcelain transition hover:bg-navy/90"
            >
              Ver Coleções
            </a>
            <a
              href="#"
              className="rounded-full border border-navy/20 px-6 py-3 text-sm font-medium text-navy transition hover:border-navy/40"
            >
              Comprar no Mercado Livre
            </a>
          </div>
        </div>
        <div className="relative w-full max-w-md">
          <div className="rounded-[36px] border border-navy/10 bg-white/80 p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.35em] text-muted">
              Coleção atual
            </p>
            <h2 className="mt-3 font-serif text-2xl text-navy">
              Curadoria com textura, brilho e equilíbrio.
            </h2>
            <p className="mt-3 text-sm text-muted">
              Veja a seleção mais recente e peças prontas para envio imediato.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-gold" />
              <span className="text-xs uppercase tracking-[0.35em] text-navy">
                Novas peças toda semana
              </span>
            </div>
          </div>
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-gold/40 bg-gold/10 blur-[1px]" />
        </div>
      </div>
    </section>
  );
}
