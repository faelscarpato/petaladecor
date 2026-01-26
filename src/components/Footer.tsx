export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-porcelain">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-2xl text-navy">Pétala Decor</p>
          <p className="mt-2 text-sm text-muted">
            Curadoria de objetos decorativos com presença.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-muted">
          <a href="#colecoes" className="transition hover:text-navy">
            Coleções
          </a>
          <a href="#destaques" className="transition hover:text-navy">
            Destaques
          </a>
          <a href="#sobre" className="transition hover:text-navy">
            Sobre
          </a>
          <a href="#contato" className="transition hover:text-navy">
            Contato
          </a>
        </div>
        <div className="flex gap-3 text-sm text-muted">
          <a href="#" className="transition hover:text-navy">
            Instagram
          </a>
          <a href="#" className="transition hover:text-navy">
            Pinterest
          </a>
        </div>
      </div>
      <div className="border-t border-navy/10 py-6 text-center text-xs text-muted">
        © 2026 Pétala Decor. Todos os direitos reservados.
      </div>
    </footer>
  );
}
