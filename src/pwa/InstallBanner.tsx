import { useInstallPrompt } from "./useInstallPrompt";

export default function InstallBanner() {
  const { canPrompt, install, dismiss } = useInstallPrompt();

  if (!canPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl border border-zinc-800 bg-zinc-900/95 p-4 shadow-xl backdrop-blur">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-100">
            Instale o catalogo no seu celular
          </p>
          <p className="text-xs text-zinc-400">
            Acesse mais rapido e envie pedidos com um toque.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={dismiss}
            className="rounded-full border border-zinc-700 px-4 py-2 text-xs font-semibold text-zinc-200 transition hover:border-zinc-500"
          >
            Agora nao
          </button>
          <button
            type="button"
            onClick={install}
            className="rounded-full bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-950 transition hover:bg-white"
          >
            Instalar
          </button>
        </div>
      </div>
    </div>
  );
}
