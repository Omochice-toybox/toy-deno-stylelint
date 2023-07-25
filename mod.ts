import stylelint from "npm:stylelint@15.10.2";
import { resolve, toFileUrl } from "https://deno.land/std@0.195.0/path/mod.ts";
import {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v1.0.0-rc.2/command/mod.ts";
import { lint } from "./stylelint.ts";

const formatter = new EnumType<string>(Object.keys(stylelint.formatters));

function normalizePath(pathLike: string): URL {
  if (URL.canParse(pathLike)) {
    return new URL(pathLike);
  }
  return toFileUrl(resolve(pathLike));
}

if (import.meta.main) {
  const { options, args } = await new Command()
    .name("stylelint")
    .type("formatter", formatter)
    .arguments("<files...:string>")
    .option("-c, --config <config:string>", "path to configure", {
      required: true,
    })
    .option(
      "-f, --formatter <formatter:formatter>",
      "An output formatter",
      {
        default: "string",
      },
    )
    .parse(Deno.args);

  const { default: config } = await import(normalizePath(options.config).href);
  const results = await lint(args, config);
  console.log(stylelint.formatters[options.formatter]!(results));
}
