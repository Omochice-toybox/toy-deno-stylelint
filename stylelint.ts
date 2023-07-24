import stylelint from "npm:stylelint@15.10.2";
import { LintResult } from "./type.ts";

export async function lint(
  files: string[],
  config: unknown,
): Promise<LintResult[]> {
  const { results } = await stylelint.lint({
    config,
    files,
  });
  return results;
}
