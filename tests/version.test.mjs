import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const version = readFileSync(path.join(root, "VERSION"), "utf8").trim();

describe("VERSION is the single source of truth", () => {
  it("has the vMAJOR.MINOR.PATCH shape", () => {
    assert.match(version, /^v\d+\.\d+\.\d+$/);
  });

  it("matches package.json", () => {
    const pkg = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
    assert.equal(pkg.version, version.slice(1));
  });

  it("appears in README.md", () => {
    const readme = readFileSync(path.join(root, "README.md"), "utf8");
    assert.match(readme, new RegExp(`当前版本：\`${version.replace(/\./g, "\\.")}\``));
  });

  it("appears in landing/index.html", () => {
    const landing = readFileSync(path.join(root, "landing/index.html"), "utf8");
    assert.match(landing, new RegExp(version.replace(/\./g, "\\.")));
  });
});
