import stylelint from "npm:stylelint@15.10.2";
import { resolve } from "https://deno.land/std@0.195.0/path/mod.ts";
import {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v1.0.0-rc.2/command/mod.ts";
import { lint } from "./stylelint.ts";

const formatter = new EnumType<string>(Object.keys(stylelint.formatters));

if (import.meta.main) {
  const { options, args } = await new Command()
    .type("formatter", formatter)
    .name("sample")
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

  const { default: config } = await import(resolve(options.config));
  const results = await lint(args, config);
  console.log(stylelint.formatters[options.formatter]!(results));
}
