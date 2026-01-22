// scripts/import-products.ts
import { createClient } from "@supabase/supabase-js";
import { parse } from "csv-parse/sync";
import { config as loadEnv } from "dotenv";
import { readFile, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const DEFAULT_FILE = "data/RelatoriodeProdutosSimplificado_22012026.csv";
const BATCH_SIZE = 200;

const BRANDS = [
  "Royal Canin",
  "Premier",
  "Purina",
  "Golden",
  "Whiskas",
  "Pedigree",
  "GranPlus",
  "Pro Plan",
  "Farmina",
  "Biofresh",
  "Hills",
  "N&D",
  "Magnus",
  "Origens",
  "Bayer",
  "Bravecto",
  "NexGard",
  "Simparic",
  "Frontline",
  "Advocate",
  "Zoetis",
];

type RawRow = Record<string, string | undefined>;

type ProductUpsert = {
  tenant_id: string;
  code: string;
  name: string;
  brand: string;
  cost_price: number | null;
  sale_price: number | null;
  margin: number | null;
  is_active: boolean;
};

type Args = {
  file: string;
  tenantId: string;
  allowPublishable: boolean;
};

function isValidUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

function parseArgs(argv: string[]): Args {
  // Suporta:
  // 1) Flags: --tenant <uuid> --file <path> --allow-publishable
  // 2) Flags em formato =: --tenant=<uuid> --file=<path>
  // 3) Posicional (para o caso do npm stripar flags no Windows):
  //    tsx scripts/import-products.ts <uuid> <file>
  let file = DEFAULT_FILE;
  let tenantId = "";
  let allowPublishable = false;

  const positionals: string[] = [];

  for (let i = 0; i < argv.length; i += 1) {
    const cur = argv[i];

    if (!cur) continue;

    if (cur === "--allow-publishable") {
      allowPublishable = true;
      continue;
    }

    // --tenant=<uuid>
    if (cur.startsWith("--tenant=")) {
      tenantId = cur.slice("--tenant=".length).trim();
      continue;
    }
    // --file=<path>
    if (cur.startsWith("--file=")) {
      file = cur.slice("--file=".length).trim() || file;
      continue;
    }

    // --tenant <uuid>
    if (cur === "--tenant") {
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        tenantId = next.trim();
        i += 1;
      }
      continue;
    }

    // --file <path>
    if (cur === "--file") {
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        file = next.trim() || file;
        i += 1;
      }
      continue;
    }

    // Qualquer outra coisa vira posicional
    if (!cur.startsWith("--")) {
      positionals.push(cur);
    }
  }

  // Fallback posicional (quando npm remove as flags e deixa só os valores)
  // Ex: ["930e...","./data/Relatorio.csv"]
  if (!tenantId) {
    const maybeTenant = positionals.find((x) => isValidUuid(x));
    if (maybeTenant) tenantId = maybeTenant;
  }

  if (file === DEFAULT_FILE) {
    // pega o primeiro argumento que parece caminho de csv
    const maybeFile =
      positionals.find((x) => x.toLowerCase().endsWith(".csv")) ??
      positionals.find((x) => x.includes("\\") || x.includes("/") || x.includes("."));
    if (maybeFile && !isValidUuid(maybeFile)) file = maybeFile;
  }

  return { file, tenantId, allowPublishable };
}

function parseNumberBR(value: string | undefined): number | null {
  if (!value) return null;

  const normalized = value
    .toString()
    .replace(/%/g, "")
    .replace(/\./g, "")
    .replace(/,/g, ".")
    .trim();

  if (!normalized) return null;

  const parsed = Number.parseFloat(normalized);
  return Number.isNaN(parsed) ? null : parsed;
}

function parseBoolean(value: string | undefined): boolean | null {
  if (!value) {
    return null;
  }
  const normalized = value.toString().trim().toLowerCase();
  if (["true", "1", "sim", "s", "yes", "y", "verdadeiro"].includes(normalized)) {
    return true;
  }
  if (["false", "0", "nao", "no", "n", "falso"].includes(normalized)) {
    return false;
  }
  return null;
}

function getValue(row: RawRow, keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null) {
      const trimmed = value.toString().trim();
      if (trimmed) {
        return trimmed;
      }
    }
  }
  return "";
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function detectBrand(description: string): string | null {
  const haystack = description.toLowerCase();
  for (const brand of BRANDS) {
    if (haystack.includes(brand.toLowerCase())) return brand;
  }
  return null;
}

function removeBrand(description: string, brand: string): string {
  if (!brand || brand === "Outros") return description;

  const brandPattern = brand
    .split(/\s+/)
    .map((part) => escapeRegex(part))
    .join("\\s+");

  const regex = new RegExp(`\\b${brandPattern}\\b`, "gi");
  return description.replace(regex, " ");
}

function cleanName(value: string): string {
  return value.replace(/\s+/g, " ").replace(/\-\s*/g, "-").trim();
}

function generateCode(name: string, index: number): string {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 32);

  const hash = createHash("sha1")
    .update(`${name}|${index}`)
    .digest("hex")
    .slice(0, 8);

  return `AUTO-${slug || "produto"}-${hash}`;
}

function printUsageAndExit() {
  console.error(
    [
      "Uso:",
      "  npm run import:products -- --tenant <uuid> --file <caminho.csv>",
      "  (fallback posicional, caso seu npm remova as flags):",
      "  npm run import:products -- <uuid> <caminho.csv>",
      "",
      "Exemplos:",
      "  npm run import:products -- --tenant 930e7a07-a759-4490-8775-f4e8130d3b6e --file .\\data\\RelatoriodeProdutosSimplificado_22012026.csv",
      "  npm run import:products -- 930e7a07-a759-4490-8775-f4e8130d3b6e .\\data\\RelatoriodeProdutosSimplificado_22012026.csv",
      "",
      "Env obrigatório (recomendado):",
      "  SUPABASE_URL",
      "  SUPABASE_SERVICE_ROLE_KEY",
      "Opcional (somente para testes):",
      "  --allow-publishable (usa VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY)",
    ].join("\n")
  );
  process.exit(1);
}

async function main() {
  loadEnv();

  const args = parseArgs(process.argv.slice(2));

  if (!args.tenantId) {
    console.error("Erro: informe tenant_id.");
    printUsageAndExit();
  }

  if (!isValidUuid(args.tenantId)) {
    console.error("Erro: tenant_id inválido.");
    printUsageAndExit();
  }

  const resolvedFile = path.resolve(args.file);
  try {
    await stat(resolvedFile);
  } catch {
    console.error(`Erro: arquivo CSV não encontrado em: ${resolvedFile}`);
    process.exit(1);
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  const urlFromEnv = process.env.SUPABASE_URL || "";
  const allowPublishable = args.allowPublishable === true;

  let supabaseUrl = urlFromEnv;
  let supabaseKey = serviceRoleKey;
  let usingPublishable = false;

  if (!supabaseKey && allowPublishable) {
    supabaseUrl = supabaseUrl || process.env.VITE_SUPABASE_URL || "";
    supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || "";
    usingPublishable = Boolean(supabaseKey);
  }

  if (!supabaseUrl || !supabaseKey) {
    console.error(
      "Erro: SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórios. Use --allow-publishable apenas para testes."
    );
    process.exit(1);
  }

  if (usingPublishable) {
    console.warn(
      "Aviso: usando chave publishable. Para importar de verdade (RLS), use SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const content = await readFile(resolvedFile, "utf8");

  let rows: RawRow[] = [];
  try {
    rows = parse(content, {
      columns: true,
      delimiter: ";",
      relax_quotes: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
    }) as RawRow[];
  } catch (error) {
    const message = error instanceof Error ? error.message : "CSV inválido";
    console.error(`Erro ao ler CSV: ${message}`);
    process.exit(1);
  }

  const products: ProductUpsert[] = [];
  let skipped = 0;

  rows.forEach((row, index) => {
    const codeRaw = getValue(row, ["CODIGO", "code"]);
    const description = getValue(row, ["DESCRICAO PRODUTO", "name", "description"]);
    const brandFromRow = getValue(row, ["brand"]);
    const isActiveRaw = getValue(row, ["is_active"]);

    if (!codeRaw && !description) {
      skipped += 1;
      return;
    }

    const detectedBrand = brandFromRow || detectBrand(description) || "Outros";
    const nameWithoutBrand = cleanName(removeBrand(description, detectedBrand));
    const finalName = nameWithoutBrand || description;
    const finalCode = codeRaw || generateCode(finalName, index + 1);
    const parsedIsActive = parseBoolean(isActiveRaw);

    products.push({
      tenant_id: args.tenantId,
      code: finalCode,
      name: finalName,
      brand: detectedBrand,
      cost_price: parseNumberBR(getValue(row, ["P_CUSTO", "cost_price"])),
      sale_price: parseNumberBR(getValue(row, ["P_VENDA", "sale_price"])),
      margin: parseNumberBR(getValue(row, ["%MG_VD", "margin"])),
      is_active: parsedIsActive ?? true,
    });
  });

  console.log(`CSV: ${resolvedFile}`);
  console.log(`Tenant: ${args.tenantId}`);
  console.log(`Linhas lidas: ${rows.length}`);
  console.log(`Registros válidos: ${products.length}`);
  if (skipped > 0) console.log(`Ignorados (sem código e nome): ${skipped}`);

  let processed = 0;
  let errors = 0;

  for (let i = 0; i < products.length; i += BATCH_SIZE) {
    const batch = products.slice(i, i + BATCH_SIZE);

    const { data, error } = await supabase
      .from("products")
      .upsert(batch, { onConflict: "tenant_id,code" })
      .select("id");

    if (error) {
      errors += batch.length;
      console.error(`Erro no batch ${Math.floor(i / BATCH_SIZE) + 1}: ${error.message}`);
      continue;
    }

    const affected = data?.length ?? batch.length;
    processed += affected;
    console.log(`Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${affected} inseridos/atualizados.`);
  }

  console.log(`Total processado: ${processed}`);
  if (errors > 0) {
    console.log(`Falhas: ${errors}`);
    process.exit(1);
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "Erro inesperado";
  console.error(message);
  process.exit(1);
});
