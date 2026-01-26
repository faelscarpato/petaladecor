import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate
} from "react-router-dom";
import heroImage from "./assets/hero.png";
import produto1 from "./assets/produto1.png";
import nossasenhora1 from "./assets/nossasenhora1.png";
import nossasenhora2 from "./assets/nossasenhora2.png";
import nossasenhora3 from "./assets/nossasenhora3.png";
import nossasenhora4 from "./assets/nossasenhora4.png";

const Header = () => (
  <header className="sticky top-0 z-50 border-b border-[#f4f0f1] bg-white/80 backdrop-blur-md">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
      <Link to="/home" className="flex items-center gap-3 text-[#181112]">
        <span className="material-symbols-outlined text-3xl text-primary">
          local_florist
        </span>
        <span className="serif-text text-xl font-medium tracking-tight">
          Pétala Decor
        </span>
      </Link>
      <div className="hidden items-center gap-10 text-xs font-medium uppercase tracking-[0.2em] text-[#886369] md:flex">
        <Link className="transition-colors hover:text-primary" to="/collection">
          Coleção
        </Link>
        <Link className="transition-colors hover:text-primary" to="/about">
          A Marca
        </Link>
        <Link className="transition-colors hover:text-primary" to="/heritage">
          Pedreira-SP
        </Link>
        <Link className="transition-colors hover:text-primary" to="/contact">
          Contato
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <span className="material-symbols-outlined cursor-pointer text-2xl">
          search
        </span>
        <span className="material-symbols-outlined cursor-pointer text-2xl">
          shopping_bag
        </span>
      </div>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="mt-auto border-t border-[#f4f0f1] bg-white py-20">
    <div className="mx-auto max-w-7xl px-6 text-center lg:px-10">
      <div className="mb-10 text-primary">
        <span className="material-symbols-outlined text-5xl">
          local_florist
        </span>
      </div>
      <div className="mb-12 flex justify-center gap-10 text-xs font-medium uppercase tracking-[0.2em]">
        <a className="text-[#886369] transition-colors hover:text-primary" href="#">
          Instagram
        </a>
        <a className="text-[#886369] transition-colors hover:text-primary" href="#">
          Pinterest
        </a>
        <a className="text-[#886369] transition-colors hover:text-primary" href="#">
          Mercado Livre
        </a>
      </div>
      <p className="serif-text mb-4 text-3xl tracking-tight">
        Pétala & Decor
      </p>
      <p className="text-xs uppercase tracking-widest text-[#886369]">
        Rua da Porcelana, 120 • Pedreira, SP
      </p>
      <p className="mt-16 text-[10px] uppercase tracking-widest text-[#886369]/60">
        © 2024 Pétala Decor. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/home"), 3500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-brand-cream">
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAnCHv_Yle5SAmu9XftJIJNNq07KbtVpFlYmoKxF7XkOlUliv503naDvI537LmJYqzS5CT4saX_QEXIZmLGgFqKIceDJVHq4VCn9-n2cyg-mLGvaC6Kel8MaUmcuRnpFnWd2pnhaBFJ3rCeozVIErO9NGswuwaFlbEBY3hVOdhJNOOIhj-yj0hpDZbtHeAYR1we_qJHd_HeSvBEQ7rgygwzE9_sKa1zRT0-H00DM8R7jnZzu-jUDp6NPmf_0aFcpLRorUg-Fp4Zo9c')",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="reveal-item mb-8">
          <div className="flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-6xl opacity-90">
              local_florist
            </span>
          </div>
        </div>
        <div
          className="reveal-item flex flex-col items-center text-center"
          style={{ animationDelay: "0.3s" }}
        >
          <h1 className="serif-text mb-2 text-5xl font-light italic tracking-tight text-primary md:text-7xl">
            Pétala Decor
          </h1>
          <p className="letter-spacing-widest mt-4 mb-20 text-[10px] font-medium uppercase text-primary/70 md:text-xs">
            PORCELANA & DECOR
          </p>
        </div>
        <div
          className="reveal-item fixed bottom-24 flex w-48 flex-col items-center gap-4"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="relative h-[1px] w-full overflow-hidden bg-primary/10">
            <div className="absolute left-0 top-0 h-full w-2/3 animate-pulse bg-primary/40" />
          </div>
          <span className="text-[9px] font-light uppercase tracking-[0.3em] text-primary/40">
            Autêntico & Artesanal
          </span>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [carouselVisible, setCarouselVisible] = useState(false);

  useEffect(() => {
    const target = carouselRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCarouselVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <section className="relative flex h-[90vh] items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Premium Porcelain Dinnerware"
              className="h-full w-full object-cover"
              src={heroImage}
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="relative z-10 px-6 text-center">
            <h1 className="serif-text mb-8 text-5xl text-white drop-shadow-lg md:text-8xl">
              A Arte da Resina
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg font-light tracking-wide text-white/90 md:text-xl">
              Descubra a sofisticação artesanal de Pedreira em cada detalhe de
              nossa coleção exclusiva.
            </p>
            <Link
              className="inline-block bg-white/90 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#181112] transition-all duration-500 hover:bg-primary hover:text-white"
              to="/collection"
            >
              Compre Agora
            </Link>
          </div>
        </section>

        <section className="flex flex-col">
          <div
            ref={carouselRef}
            className={`relative overflow-hidden bg-[#f7f3f0] py-16 transition-all duration-700 ${
              carouselVisible ? "carousel-in" : "carousel-out"
            }`}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                    Nossa Senhora
                  </p>
                  <h2 className="serif-text mt-4 text-3xl text-[#181112] md:text-4xl">
                    Coleção especial em destaque
                  </h2>
                </div>
                <p className="hidden max-w-sm text-sm italic text-[#5a4a4c] md:block">
                  Uma sequência contemplativa com acabamento artesanal e
                  presença delicada.
                </p>
              </div>
            </div>
            <div className="mt-10">
              <div className="carousel-track">
                {[nossasenhora1, nossasenhora2, nossasenhora3, nossasenhora4].map(
                  (img, idx) => (
                    <div key={`ns-1-${idx}`} className="carousel-card">
                      <img
                        src={img}
                        alt={`Nossa Senhora ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )
                )}
                {[nossasenhora1, nossasenhora2, nossasenhora3, nossasenhora4].map(
                  (img, idx) => (
                    <div key={`ns-2-${idx}`} className="carousel-card">
                      <img
                        src={img}
                        alt={`Nossa Senhora ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          {[
            {
              title: "Nossa Senhora 20 cm",
              price: "R$ 120,00",
              img: produto1,
              badge: "Destaque da Pétala",
              align: "ml-auto"
            },
            {
              title: "Prato Decorativo Pétala",
              price: "R$ 150,00",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXx_3E-4UwKJh_SOYNcAQ7GuRW0k2bYPW3JVZ74kOtY4DysYdjz0lpkuqwrOfp57pcaGFHa4tqIgBVm16w4LO3DpSP1C4qz85-G0nGHgPvYQFp16zIkbYkKP9Y7_ue88KCaEKl6DfDG3B1w7jZy522UnK9SqlvF2AKiobkXuhM1bJ0yCM16_b11NmlyxfCgXiJwxbAjaq5s2cQ9BT09F0U54dOn9DqIxKFUI73-j2vegmY2uMLfDrQdGKdsl07AV2VlGoFpQVUR9U",
              badge: "Coleção Pétala",
              align: "mr-auto"
            },
            {
              title: "Ânfora Azul Cobalto",
              price: "R$ 680,00",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCo5cZIxRj_Z46buoeP9VycnnxFufNN-ftEmGH-EPMHDRQof0MtX4pcreBvscG1P2xnixqcGxEEvGmspnOrY6ZCpO9C-XufZPsZ3ON2NGZOZo89sY-IYRdRBmD7SbfGTEq9T-2P6BI4lAxn1IxSE3rSv3BilaAJLLy4xcFuu_JhJuDAK3-5M84mGqsib-gC9yAz31ZfgWn_SEuyAr8prbuY75aLkhyJF3jwmpjuOmM7ddDLfyWwkXBuanYpZS1GYMJOjcW2uXMUpT4",
              badge: "Edição Limitada",
              align: "ml-auto"
            }
          ].map((item, idx) => (
            <div key={idx} className="relative flex w-full flex-col items-center">
              <div className="w-full overflow-hidden bg-[#f7f3f0]">
                <img
                  alt={item.title}
                  className="scroll-scale-img h-[80vh] w-full object-cover"
                  src={item.img}
                />
              </div>
              <div className="mx-auto w-full max-w-7xl px-6 pb-32 lg:px-10 -mt-24 md:-mt-32">
                <div
                  className={`space-y-6 border border-[#f4f0f1] bg-white/95 p-8 shadow-xl backdrop-blur-sm md:p-12 ${item.align} max-w-md`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
                    {item.badge}
                  </span>
                  <h2 className="serif-text text-4xl leading-tight text-[#181112]">
                    {item.title}
                  </h2>
                  <p className="text-base italic leading-relaxed text-[#5a4a4c]">
                    "Artesania fina em cada detalhe, direto de nossa oficina em
                    Pedreira-SP."
                  </p>
                  <p className="serif-text text-xl text-primary">{item.price}</p>
                  <div className="pt-4">
                    <Link
                      className="border-b-2 border-primary pb-1 text-xs font-bold uppercase tracking-widest transition-colors hover:text-primary/70"
                      to="/product/1"
                    >
                      Conhecer Peça
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-[#f7f3f0] py-32">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span className="material-symbols-outlined mb-6 text-4xl text-primary">
              workspace_premium
            </span>
            <h2 className="serif-text mb-8 text-4xl">Tradição de Pedreira-SP</h2>
            <p className="mb-12 text-lg leading-relaxed text-[#5a4a4c]">
              Situada no coração do maior polo cerâmico do Brasil, a Pétala Decor
              une as técnicas ancestrais da porcelana de Pedreira com um olhar
              contemporâneo e sofisticado.
            </p>
            <div className="grid grid-cols-3 gap-8 border-y border-black/5 py-12">
              <div>
                <p className="serif-text text-3xl text-primary">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-[#886369]">
                  Feito à Mão
                </p>
              </div>
              <div>
                <p className="serif-text text-3xl text-primary">30+</p>
                <p className="text-[10px] uppercase tracking-widest text-[#886369]">
                  Anos de Tradição
                </p>
              </div>
              <div>
                <p className="serif-text text-3xl text-primary">Eco</p>
                <p className="text-[10px] uppercase tracking-widest text-[#886369]">
                  Sustentável
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const ProductPage = () => (
  <div>
    <Header />
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <section className="mb-24 grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div className="group relative aspect-[4/5] overflow-hidden bg-[#f7f3f0]">
          <img
            alt="Hand-Painted Sage Floral Vase"
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDibsU09TSRuzySQNvrWCBMTOh9N333WbTzscLpTFWJa-FkpsKUOdNePCwvKyrJJNgRnZZzU_TeLtJ8m15fxO_Dkgz_YoxDpz6W2jweZB6_qcjgctB-Hg4EroGw10jlMJL84FyFgPjTd70hzRb14iqWk0fcV4U4D162gy8J8OmYe2ShR5_B1gJprLteYS14hSpbS9rq2VHMQ9CAbAXz_efA4caZ7PWSusNYnW6VREY699yifgDr34q9hx3xRpHZNQCulrh2VWdU_AI"
          />
          <div className="absolute left-6 top-6">
            <span className="bg-white/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em]">
              Peça Única
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <nav className="mb-8 flex text-[10px] uppercase tracking-widest text-[#886369]">
            <Link className="hover:text-primary" to="/home">
              Início
            </Link>
            <span className="mx-2">/</span>
            <Link className="hover:text-primary" to="/collection">
              Vasos de Porcelana
            </Link>
          </nav>
          <h1 className="serif-text mb-6 text-5xl leading-tight text-[#181112] md:text-6xl">
            Hand-Painted Sage Floral Vase
          </h1>
          <p className="serif-text mb-8 text-2xl font-light text-[#181112]">
            R$ 840,00
          </p>
          <div className="mb-10">
            <p className="text-lg italic leading-relaxed text-[#5a4a4c]">
              "Cada traço conta uma história. Esta peça é moldada à mão em nossa
              oficina em Pedreira, recebendo acabamento em esmalte verde sálvia
              e detalhes florais pintados individualmente."
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <a
              className="group relative flex items-center justify-center gap-4 border border-black/5 bg-[#FFE600] px-8 py-5 text-[#2D3277] shadow-sm transition-all duration-300 hover:bg-[#FFD700] hover:shadow-md"
              href="#"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-3xl">
                  handshake
                </span>
                <span className="text-sm font-bold uppercase tracking-wider">
                  Comprar no Mercado Livre
                </span>
              </div>
              <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </a>
            <p className="text-center text-[11px] uppercase tracking-widest text-[#886369]">
              Pagamento seguro • Entrega em todo o Brasil
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-[#f4f0f1] pt-10">
            <div>
              <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#181112]">
                Dimensões
              </h4>
              <ul className="space-y-1 text-sm text-[#886369]">
                <li>Altura: 32 cm</li>
                <li>Diâmetro: 18 cm</li>
                <li>Peso: 1.4 kg</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#181112]">
                Materiais
              </h4>
              <ul className="space-y-1 text-sm text-[#886369]">
                <li>Porcelana de Pedreira</li>
                <li>Esmalte Atóxico</li>
                <li>Pintura em Ouro 12k</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

const CollectionPage = () => (
  <div>
    <Header />
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
      <div className="mb-12">
        <nav className="mb-4 flex text-[10px] uppercase tracking-widest text-[#886369]">
          <Link className="hover:text-primary" to="/home">
            Início
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#181112]">Coleções</span>
        </nav>
        <h1 className="serif-text text-5xl text-[#181112]">
          Nossas Coleções
        </h1>
      </div>
      <div className="flex flex-col gap-12 lg:flex-row">
        <aside className="w-full flex-shrink-0 lg:w-64">
          <div className="sticky top-32 space-y-10">
            <div>
              <h3 className="mb-6 text-[11px] font-bold uppercase tracking-[0.3em] text-[#181112]">
                Categorias
              </h3>
              <ul className="space-y-4 text-sm text-[#5a4a4c]">
                {["Todas as Peças", "Vasos", "Pratos Decorativos", "Ânforas"].map(
                  (cat, i) => (
                    <li key={cat}>
                      <label className="group flex cursor-pointer items-center gap-3">
                        <input
                          defaultChecked={i === 0}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          type="checkbox"
                        />
                        <span className="transition-colors group-hover:text-primary">
                          {cat}
                        </span>
                      </label>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <button className="w-full border border-primary py-3 text-[10px] font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-white">
                Limpar Filtros
              </button>
            </div>
          </div>
        </aside>
        <section className="flex-grow">
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: "Vaso Sálvia Floral",
                price: "R$ 840,00",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDibsU09TSRuzySQNvrWCBMTOh9N333WbTzscLpTFWJa-FkpsKUOdNePCwvKyrJJNgRnZZzU_TeLtJ8m15fxO_Dkgz_YoxDpz6W2jweZB6_qcjgctB-Hg4EroGw10jlMJL84FyFgPjTd70hzRb14iqWk0fcV4U4D162gy8J8OmYe2ShR5_B1gJprLteYS14hSpbS9rq2VHMQ9CAbAXz_efA4caZ7PWSusNYnW6VREY699yifgDr34q9hx3xRpHZNQCulrh2VWdU_AI"
              },
              {
                title: "Vaso Terracota Minimal",
                price: "R$ 420,00",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgzwnzQq9Co2uLaa2ej_utufi3NMPk3bCE6ZXuH-zQK0w0Q8qZhdv1ad2Z8dVpH1kGGun_pflPntrazBQioVP9g5vXS_t09Jw5_Oueo46FJiTFxDhdTm87vAza7zCEEZ2tGV8jb6aOtseBryi9mzgsktqK0GzB4s4cAx07gv32_Q-w4Ra14ShVYxj-IKf8HxN_UoTUGGzwVN2byfPrBzaynME3EsMHfpKqCkjdMBtbft_El9KqeLe-F8mVYTYAcnT-wQrAhbguUCI"
              },
              {
                title: "Ânfora Azul Cobalto",
                price: "R$ 680,00",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCo5cZIxRj_Z46buoeP9VycnnxFufNN-ftEmGH-EPMHDRQof0MtX4pcreBvscG1P2xnixqcGxEEvGmspnOrY6ZCpO9C-XufZPsZ3ON2NGZOZo89sY-IYRdRBmD7SbfGTEq9T-2P6BI4lAxn1IxSE3rSv3BilaAJLLy4xcFuu_JhJuDAK3-5M84mGqsib-gC9yAz31ZfgWn_SEuyAr8prbuY75aLkhyJF3jwmpjuOmM7ddDLfyWwkXBuanYpZS1GYMJOjcW2uXMUpT4"
              },
              {
                title: "Solitário Marfim",
                price: "R$ 290,00",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcB3FjlurBiyT393e_nqRhs-5Ekz3c49r6JJYHMEUmIv0a1oLH7TCT2pKMmbDxkQZgjunrWyZMNvYwrvDZ-sjRaOs4te4-XuYlCm9AK3STKGobTwgD0Ai2tzIPq45ETgz0RDl-YUG4Ysv9mih_w--G622Z0P0zWjp2K0GcQo0Vu8uG-O_7Jd2qc6XJ3x1NxgEH5c8p1IMFvrWRql58dQN5Dr_P58iFL98PJ5WX9Ka8ISqDFVZAtGpADN6ZKJRhgnaM0C4ErMqOErk"
              },
              {
                title: "Prato Decorativo Pétala",
                price: "R$ 150,00",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXx_3E-4UwKJh_SOYNcAQ7GuRW0k2bYPW3JVZ74kOtY4DysYdjz0lpkuqwrOfp57pcaGFHa4tqIgBVm16w4LO3DpSP1C4qz85-G0nGHgPvYQFp16zIkbYkKP9Y7_ue88KCaEKl6DfDG3B1w7jZy522UnK9SqlvF2AKiobkXuhM1bJ0yCM16_b11NmlyxfCgXiJwxbAjaq5s2cQ9BT09F0U54dOn9DqIxKFUI73-j2vegmY2uMLfDrQdGKdsl07AV2VlGoFpQVUR9U"
              }
            ].map((item, idx) => (
              <Link key={idx} to="/product/1" className="group cursor-pointer">
                <div className="relative mb-5 aspect-[3/4] overflow-hidden bg-[#f7f3f0]">
                  <img
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={item.img}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="translate-y-4 bg-white/95 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm transition-transform duration-300 group-hover:translate-y-0">
                      Ver Detalhes
                    </span>
                  </div>
                </div>
                <h3 className="serif-text mb-1 text-xl transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="text-sm text-[#886369]">{item.price}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

const AboutPage = () => (
  <div className="bg-brand-cream">
    <Header />
    <main>
      <section className="relative flex h-[85vh] items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Artesão trabalhando o barro"
            className="h-full w-full object-cover grayscale-[20%] brightness-90"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgzwnzQq9Co2uLaa2ej_utufi3NMPk3bCE6ZXuH-zQK0w0Q8qZhdv1ad2Z8dVpH1kGGun_pflPntrazBQioVP9g5vXS_t09Jw5_Oueo46FJiTFxDhdTm87vAza7zCEEZ2tGV8jb6aOtseBryi9mzgsktqK0GzB4s4cAx07gv32_Q-w4Ra14ShVYxj-IKf8HxN_UoTUGGzwVN2byfPrBzaynME3EsMHfpKqCkjdMBtbft_El9KqeLe-F8mVYTYAcnT-wQrAhbguUCI"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.5em] text-white/80">
              Desde 1984 • Pedreira-SP
            </span>
            <h1 className="serif-text mb-8 text-6xl leading-[1.1] text-white md:text-8xl">
              Onde o barro <br />
              ganha alma.
            </h1>
            <p className="max-w-lg text-lg font-light leading-relaxed text-white/90 md:text-xl">
              A história da Pétala Decor é escrita pelas mãos de quem dedica a
              vida ao detalhe e à tradição.
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone-warm shadow-2xl">
            <img
              alt="Detalhe de peça"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDibsU09TSRuzySQNvrWCBMTOh9N333WbTzscLpTFWJa-FkpsKUOdNePCwvKyrJJNgRnZZzU_TeLtJ8m15fxO_Dkgz_YoxDpz6W2jweZB6_qcjgctB-Hg4EroGw10jlMJL84FyFgPjTd70hzRb14iqWk0fcV4U4D162gy8J8OmYe2ShR5_B1gJprLteYS14hSpbS9rq2VHMQ9CAbAXz_efA4caZ7PWSusNYnW6VREY699yifgDr34q9hx3xRpHZNQCulrh2VWdU_AI"
            />
          </div>
          <div>
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
              Manifesto
            </span>
            <h2 className="serif-text mb-8 text-4xl text-[#181112] md:text-5xl">
              Nossa Essência
            </h2>
            <div className="space-y-6 text-lg italic leading-relaxed text-[#5a4a4c]">
              <p>
                A Pétala nasceu do desejo de trazer a sofisticação da porcelana
                fina para o cotidiano, sem perder a organicidade do feito à mão.
              </p>
              <p>
                Cada peça que sai do nosso forno carrega a digital do artesão e
                o compromisso com uma estética atemporal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

const HeritagePage = () => (
  <div>
    <Header />
    <main>
      <section className="relative flex h-[60vh] items-center justify-center overflow-hidden">
        <img
          alt="Pedreira View"
          className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDibsU09TSRuzySQNvrWCBMTOh9N333WbTzscLpTFWJa-FkpsKUOdNePCwvKyrJJNgRnZZzU_TeLtJ8m15fxO_Dkgz_YoxDpz6W2jweZB6_qcjgctB-Hg4EroGw10jlMJL84FyFgPjTd70hzRb14iqWk0fcV4U4D162gy8J8OmYe2ShR5_B1gJprLteYS14hSpbS9rq2VHMQ9CAbAXz_efA4caZ7PWSusNYnW6VREY699yifgDr34q9hx3xRpHZNQCulrh2VWdU_AI"
        />
        <div className="relative z-10 px-6 text-center">
          <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.5em] text-primary">
            Patrimônio & Tradição
          </span>
          <h1 className="serif-text mb-6 text-6xl text-[#181112] md:text-8xl">
            Pedreira
          </h1>
          <p className="serif-text mx-auto max-w-2xl text-lg italic text-[#5a4a4c] md:text-xl">
            A Capital da Porcelana e o berço da nossa arte artesanal.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          <div className="space-y-8">
            <h2 className="serif-text text-4xl leading-tight">História Viva</h2>
            <p className="leading-relaxed text-[#5a4a4c]">
              Fundada em 1896, Pedreira se transformou no maior polo de
              porcelana do Brasil. É neste cenário de tradição que a Pétala
              Decor nasceu, unindo o conhecimento técnico local com o design
              contemporâneo.
            </p>
            <div className="vintage-border sepia-effect w-64 rotate-[-2deg]">
              <img
                alt="Vintage Pedreira"
                className="h-32 w-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgzwnzQq9Co2uLaa2ej_utufi3NMPk3bCE6ZXuH-zQK0w0Q8qZhdv1ad2Z8dVpH1kGGun_pflPntrazBQioVP9g5vXS_t09Jw5_Oueo46FJiTFxDhdTm87vAza7zCEEZ2tGV8jb6aOtseBryi9mzgsktqK0GzB4s4cAx07gv32_Q-w4Ra14ShVYxj-IKf8HxN_UoTUGGzwVN2byfPrBzaynME3EsMHfpKqCkjdMBtbft_El9KqeLe-F8mVYTYAcnT-wQrAhbguUCI"
              />
              <p className="mt-2 text-center text-[9px] font-medium uppercase tracking-tighter text-clay">
                Praça Central, c. 1940
              </p>
            </div>
          </div>
          <img
            alt="Artesão"
            className="aspect-square w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo5cZIxRj_Z46buoeP9VycnnxFufNN-ftEmGH-EPMHDRQof0MtX4pcreBvscG1P2xnixqcGxEEvGmspnOrY6ZCpO9C-XufZPsZ3ON2NGZOZo89sY-IYRdRBmD7SbfGTEq9T-2P6BI4lAxn1IxSE3rSv3BilaAJLLy4xcFuu_JhJuDAK3-5M84mGqsib-gC9yAz31ZfgWn_SEuyAr8prbuY75aLkhyJF3jwmpjuOmM7ddDLfyWwkXBuanYpZS1GYMJOjcW2uXMUpT4"
          />
        </div>
      </section>
      <section className="overflow-hidden pb-24">
        <div className="animate-scroll">
          {[1, 2, 3, 4, 5, 1, 2].map((i, idx) => (
            <img
              key={`${i}-${idx}`}
              alt="Market"
              className="mx-2 h-80 w-64 flex-shrink-0 object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXx_3E-4UwKJh_SOYNcAQ7GuRW0k2bYPW3JVZ74kOtY4DysYdjz0lpkuqwrOfp57pcaGFHa4tqIgBVm16w4LO3DpSP1C4qz85-G0nGHgPvYQFp16zIkbYkKP9Y7_ue88KCaEKl6DfDG3B1w7jZy522UnK9SqlvF2AKiobkXuhM1bJ0yCM16_b11NmlyxfCgXiJwxbAjaq5s2cQ9BT09F0U54dOn9DqIxKFUI73-j2vegmY2uMLfDrQdGKdsl07AV2VlGoFpQVUR9U"
            />
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

const ContactPage = () => (
  <div>
    <Header />
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="mb-16 text-center lg:text-left">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary">
          Entre em Contato
        </span>
        <h1 className="serif-text mt-4 text-5xl text-[#181112] md:text-6xl">
          Fale Conosco
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-5">
          <div className="space-y-4">
            <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#181112]">
              Atendimento Digital
            </h3>
            <div className="group flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 text-primary transition-all group-hover:bg-primary group-hover:text-white">
                <span className="material-symbols-outlined text-xl">
                  chat_bubble
                </span>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-[#886369]">
                  WhatsApp
                </p>
                <p className="serif-text text-lg">+55 (19) 99999-9999</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border border-[#f4f0f1] bg-white p-8 lg:col-span-7 lg:p-12">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <input
              className="w-full border-0 border-b border-[#e5e7eb] bg-transparent py-3 text-lg focus:ring-0"
              placeholder="Seu nome"
              type="text"
            />
            <input
              className="w-full border-0 border-b border-[#e5e7eb] bg-transparent py-3 text-lg focus:ring-0"
              placeholder="Seu e-mail"
              type="email"
            />
            <textarea
              className="w-full resize-none border-0 border-b border-[#e5e7eb] bg-transparent py-3 text-lg focus:ring-0"
              placeholder="Mensagem"
              rows={4}
            />
            <button className="w-full bg-primary px-8 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-primary/90">
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

const AppRoutes = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/collection" element={<CollectionPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/heritage" element={<HeritagePage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

