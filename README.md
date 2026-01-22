# Pet Shop SF Catalogo

Catalogo publico em React + Vite + TypeScript + Tailwind com Supabase RPC e PWA.

## Rodar local

```bash
npm install
npm run dev
```

## Variaveis de ambiente

Crie um `.env` na raiz:

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=...
```

## Deploy no Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Configure as variaveis de ambiente acima em Production.

## Icones PWA

Os arquivos em `public/icons/` sao placeholders. Substitua por icones reais antes do deploy final.
