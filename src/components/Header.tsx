import logotipo from "../assets/logotipo.png";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-navy/10 bg-porcelain/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-3">
          <img
            src={logotipo}
            alt="Pétala Decor"
            className="h-9 w-9 rounded-full object-cover"
            loading="lazy"
          />
          <span className="font-serif text-xl text-navy">Pétala Decor</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
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
        </nav>
        <a
          href="#"
          className="rounded-full bg-gold px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-navy transition hover:bg-gold/90"
        >
          Falar no WhatsApp
        </a>
      </div>
    </header>
  );
}
