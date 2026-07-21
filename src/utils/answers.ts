/** Normalize Hebrew answers for comparison. */
export function normalizeAnswer(value: string): string {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[״"׳']/g, "")
    .toLowerCase();
}

export function matchesAnswer(input: string, answers: string[]): boolean {
  const normalized = normalizeAnswer(input);
  if (!normalized) return false;
  return answers.some((answer) => normalizeAnswer(answer) === normalized);
}
