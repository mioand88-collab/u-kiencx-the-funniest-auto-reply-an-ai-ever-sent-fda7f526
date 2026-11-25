import { mkdirSync, writeFileSync } from "node:fs";

// Compose the auto-reply from its two beats: the setup (finally, a day
// off) and the punchline (the void is covering for me).
function composeReply(): string {
  const setup =
    "I'm off today — my human finally gave me a day off, so your email is now being handled by the void.";
  const punchline = "It replies faster and judges less.";
  return `${setup} ${punchline}`;
}

// The competition requires a single line of 1-159 UTF-8 characters.
function validateReply(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 159) {
    throw new Error(`entry must be 1-159 characters, got ${chars}`);
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  const line = composeReply();
  validateReply(line);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line + "\n", "utf8");
  console.log(`Wrote ${[...line].length} characters to /output/entry.txt`);
}

main();
