import stylelint from "npm:stylelint@15.10.2";
import { resolve } from "https://deno.land/std@0.195.0/path/mod.ts";
import { Command } from "https://deno.land/x/cliffy@v1.0.0-rc.2/command/mod.ts";

type Severity = "warning" | "error";

type Warning = {
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
  rule: string;
  severity: Severity;
  text: string;
  stylelintType?: string;
};

type LintResult = {
  source?: string;
  deprecations: {
    text: string;
    reference?: string;
  }[];
  invalidOptionWarnings: {
    text: string;
  }[];
  parseErrors: { stylelintType: string }[];
  errored?: boolean;
  warnings: Warning[];
  ignored?: boolean;
};

async function execute(config: unknown): Promise<LintResult[]> {
  const { results } = await stylelint.lint({
    config,
    files: "./**/*.css",
  });
  return results;
}

if (import.meta.main) {
  const { options, args } = await new Command()
    .name("sample")
    .arguments("<files...:string>")
    .option("-c, --config <config:string>", "path to configure", {
      required: true,
    })
    .parse(Deno.args);

  console.log(args);

  const { default: config } = await import(resolve(options.config));
  const results = await execute(config);
  for (
    const result of results.filter((r) => r.errored !== undefined && r.source)
  ) {
    console.log(result.warnings);
  }
}
