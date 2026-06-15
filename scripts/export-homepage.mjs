#!/usr/bin/env node
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const DEFAULTS = {
  input: "personal-homepage.html",
  outDir: "exports",
  width: 1440,
  timeout: 30000,
};

export function parseArgs(argv) {
  const args = { ...DEFAULTS, help: false };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--input") {
      args.input = readValue(argv, i, arg);
      i += 1;
    } else if (arg === "--out-dir") {
      args.outDir = readValue(argv, i, arg);
      i += 1;
    } else if (arg === "--width") {
      args.width = readPositiveInteger(readValue(argv, i, arg), arg);
      i += 1;
    } else if (arg === "--timeout") {
      args.timeout = readPositiveInteger(readValue(argv, i, arg), arg);
      i += 1;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

export function buildExportPlan(args, cwd = process.cwd()) {
  const inputPath = path.resolve(cwd, args.input);
  const outDir = path.resolve(cwd, args.outDir);

  return {
    inputPath,
    outDir,
    pdfPath: path.join(outDir, "personal-homepage.pdf"),
    longImagePath: path.join(outDir, "personal-homepage-long.png"),
    width: args.width,
    timeout: args.timeout,
  };
}

export async function exportHomepage(plan) {
  await assertFileExists(plan.inputPath);
  await mkdir(plan.outDir, { recursive: true });

  const { chromium } = await import("playwright");
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({
      viewport: { width: plan.width, height: 1200 },
      deviceScaleFactor: 2,
    });

    page.setDefaultTimeout(plan.timeout);
    await page.goto(pathToFileURL(plan.inputPath).href, {
      waitUntil: "networkidle",
      timeout: plan.timeout,
    });

    await page.emulateMedia({ media: "screen" });
    const pageSize = await getRenderedPageSize(page);
    await page.pdf(buildScreenPdfOptions({ path: plan.pdfPath, ...pageSize }));

    await page.screenshot({
      path: plan.longImagePath,
      fullPage: true,
      animations: "disabled",
    });
  } finally {
    await browser.close();
  }

  return {
    pdfPath: plan.pdfPath,
    longImagePath: plan.longImagePath,
  };
}

export function buildScreenPdfOptions({ path: pdfPath, width, height }) {
  return {
    path: pdfPath,
    width: `${width}px`,
    height: `${height}px`,
    printBackground: true,
    margin: {
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
    },
  };
}

export function formatExportError(error) {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("Executable doesn't exist")) {
    return `${message}

Playwright is installed, but its Chromium browser is missing.
Run this once, then retry the export:

  npm run export:setup`;
  }

  return message;
}

function readValue(argv, index, name) {
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${name} requires a value`);
  }
  return value;
}

function readPositiveInteger(value, name) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }
  return parsed;
}

async function assertFileExists(filePath) {
  const stats = await stat(filePath);
  if (!stats.isFile()) {
    throw new Error(`Input is not a file: ${filePath}`);
  }
}

async function getRenderedPageSize(page) {
  return page.evaluate(() => {
    const body = document.body;
    const root = document.documentElement;

    return {
      width: Math.ceil(Math.max(
        body.scrollWidth,
        body.offsetWidth,
        root.clientWidth,
        root.scrollWidth,
        root.offsetWidth,
      )),
      height: Math.ceil(Math.max(
        body.scrollHeight,
        body.offsetHeight,
        root.clientHeight,
        root.scrollHeight,
        root.offsetHeight,
      )),
    };
  });
}

function printHelp() {
  console.log(`Usage: node scripts/export-homepage.mjs [options]

Options:
  --input <path>     HTML file to export (default: personal-homepage.html)
  --out-dir <path>   Output directory (default: exports)
  --width <number>   Browser viewport width for long image (default: 1440)
  --timeout <ms>     Page load timeout in milliseconds (default: 30000)
  -h, --help         Show help

Outputs:
  personal-homepage.pdf
  personal-homepage-long.png`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const result = await exportHomepage(buildExportPlan(args));
  console.log(`PDF: ${result.pdfPath}`);
  console.log(`Long image: ${result.longImagePath}`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(formatExportError(error));
    process.exitCode = 1;
  });
}
