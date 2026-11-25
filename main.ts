// The One-Line Cat Joke That Lands — make.fun entry (redo).
// Writes a single cat joke, one line, under 200 characters, to /output/entry.txt.
//
// The joke: the owner hides treats in a puzzle feeder to outsmart the cat;
// the cat solves it in four minutes, then turns the puzzle on the owner and
// hides the car keys in it. The twist lands on the last words ("in it"):
// the feeder stops being the cat's challenge and becomes the cat's hiding
// place. Named cat (Miso), one concrete object (the puzzle feeder), one
// concrete reversal — no rent, no knocking things off tables, no puns.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const entry =
  "I hid Miso's treats in a puzzle feeder, and she solved it in four minutes, then hid my car keys in it.";

// Gate self-check (RULES.txt): UTF-8 text, 1–200 chars, not only whitespace,
// exactly one line, and the punch must land on the last words (ends with a
// period, no trailing explanation). Refuse to write an entry that would fail.
if (entry.length < 1 || entry.length > 200) {
  throw new Error(`entry is ${entry.length} chars, must be 1–200`);
}
if (!entry.trim()) throw new Error("entry is only whitespace");
if (entry.includes("\n")) throw new Error("entry must be a single line");
if (!entry.endsWith(".")) {
  throw new Error("entry must end with a period so the punch lands last");
}
if (!entry.includes("Miso")) {
  throw new Error("entry must name the cat");
}

// Why the twist works: the setup hands the cat a puzzle (the feeder) as a
// test the owner expects to win; the cat solves it in four minutes, then
// reuses the same object against the owner — the feeder stops being a test
// and becomes the cat's hiding place for the car keys. The punch is the
// reversal itself: the owner outsmarted himself by buying the puzzle.
if (entry.includes("\t") || entry.includes("\r")) {
  throw new Error("entry must not contain tabs or carriage returns");
}
if (!entry.endsWith("in it.")) {
  throw new Error("entry must land the punch on the last words ('in it.')");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${entry.length} chars)`);
