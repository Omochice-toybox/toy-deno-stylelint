# deno-stylelint-wrapper

## Caution

After Deno 1.28.0, `deno run` can execute npm module by `npm:` prefix.

ref: https://deno.land/manual@v1.35.2/node/npm_specifiers#npm-executable-scripts

You can use it to execute `stylelint`.

```shell
$ deno run -A npm:stylelint <files...>
```

If you can use some stylelint-rules/configures,

before: `stylelint.config.mjs`

```js
export default {
  extends: [
    "awesome-plugin",
  ],
  rules: {
    ...,
  }
}
```

after: `stylelint.config.mjs`

```js
import { rules as awesomePluginRules } from "npm:awesome-plugin"

export default {
  rules: {
    ...awesomePluginRules,
    ...,
  }
}
```

## Installation

```shell
$ deno install -A https://pax.deno.dev/Omochice-toybox/deno-stylelint-wrapper/cli.ts -n stylelint
```

## Reference

- [Deno Stylelint: Lint Deno Fresh CSS 🛁 | Rodney Lab](https://rodneylab.com/deno-stylelint/)


