export function trimLines(s: string) {
  return s
    .split("\n")
    .map((l) => l.trim())
    .join("\n");
}
