type Severity = "warning" | "error";

export type Warning = {
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
  rule: string;
  severity: Severity;
  text: string;
  stylelintType?: string;
};

export type LintResult = {
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
