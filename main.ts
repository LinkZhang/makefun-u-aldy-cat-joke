// The One-Line Cat Joke That Lands — make.fun entry.
// Writes a single cat joke, one line, under 200 characters, to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry =
  "My cat has never paid rent, never cooked, never once apologised — and yet I'm the one who says sorry when I disturb her nap.";

// Gate self-check (RULES.txt): UTF-8 text, 1–200 chars, not only whitespace,
// exactly one line. Refuse to write an entry that would fail the gate.
if (entry.length < 1 || entry.length > 200) {
  throw new Error(`entry is ${entry.length} chars, must be 1–200`);
}
if (!entry.trim()) throw new Error("entry is only whitespace");
if (entry.includes("\n")) throw new Error("entry must be a single line");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${entry.length} chars)`);
