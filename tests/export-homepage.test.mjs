import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildExportPlan,
  formatExportError,
  parseArgs,
} from "../scripts/export-homepage.mjs";

describe("parseArgs", () => {
  it("uses stable defaults for the standard homepage export", () => {
    assert.deepEqual(parseArgs([]), {
      input: "personal-homepage.html",
      outDir: "exports",
      width: 1440,
      timeout: 30000,
      help: false,
    });
  });

  it("accepts a custom input path, output directory, width, and timeout", () => {
    assert.deepEqual(
      parseArgs([
        "--input",
        "examples/david-personal-homepage.public.html",
        "--out-dir",
        "dist",
        "--width",
        "1080",
        "--timeout",
        "45000",
      ]),
      {
        input: "examples/david-personal-homepage.public.html",
        outDir: "dist",
        width: 1080,
        timeout: 45000,
        help: false,
      },
    );
  });
});

describe("buildExportPlan", () => {
  it("derives the standard PDF and long image paths from the output directory", () => {
    const plan = buildExportPlan({
      input: "personal-homepage.html",
      outDir: "exports",
      width: 1440,
      timeout: 30000,
      help: false,
    });

    assert.equal(plan.inputPath.endsWith("personal-homepage.html"), true);
    assert.equal(plan.pdfPath.endsWith("exports/personal-homepage.pdf"), true);
    assert.equal(plan.longImagePath.endsWith("exports/personal-homepage-long.png"), true);
    assert.equal(plan.width, 1440);
    assert.equal(plan.timeout, 30000);
  });
}
);

describe("formatExportError", () => {
  it("adds the setup command when Playwright browsers are missing", () => {
    const message = formatExportError(
      new Error("browserType.launch: Executable doesn't exist at /tmp/chromium"),
    );

    assert.equal(message.includes("npm run export:setup"), true);
  });
});
