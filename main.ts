// Two Lines to Your Past Self: a warning about one night at the kitchen table.
// The entry goes to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output).
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Line one warns the past self about a single specific moment.
const WARNING =
  "Don't say \"I don't love you anymore\" to Ana at the kitchen table on 9 November just to win the argument.";

// Line two says why that moment mattered and what changed because of it.
const CONSEQUENCE =
  "She believed you and left that night, and every apology since has failed to bring her back to that table.";

// The two lines join with a single newline; no trailing newline.
function assemble(): string {
  return `${WARNING}\n${CONSEQUENCE}`;
}

function checkLength(text: string): void {
  const n = text.length;
  if (n < 1 || n > 280) {
    throw new Error(`entry is ${n} chars; the gate is 1-280`);
  }
  const lines = text.split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly two lines, got ${lines.length}`);
  }
}

function main(): void {
  const entry = assemble();
  checkLength(entry);
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), entry, "utf8");
}

main();
