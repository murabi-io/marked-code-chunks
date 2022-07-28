# marked-code-chunks
Marked extension to add code chunk metadata to the markdown fenced code blocks. e.g.
```
~~~bash {osx bin=/bin/bash}
ls -l ./
~~~
```
- tokenizer will extract attributes `osx=true` and `bin="/bin/bash""`
- renderer will render the code block with attributes: `data-osx="true"` and `data-bin="/bin/bash"`

## Opinions and limitations

1. Relies as much as possible on each included library's defaults
2. Only rely on GitHub Actions
3. Do not include documentation generation

## Getting started

1. `git clone git@github.com:murabi-io/marked-code-chunks.git`
2. `cd my-project`
3. `npm install`
4. `npm run setup`

Or click on `Use this template` button on GitHub!

To enable deployment, you will need to:

1. Setup `NPM_TOKEN` secret in GitHub actions ([Settings > Secrets > Actions](https://github.com/gjuchault/typescript-service-starter/settings/secrets/actions))
2. Give `GITHUB_TOKEN` write permissions for GitHub releases ([Settings > Actions > General](https://github.com/gjuchault/typescript-service-starter/settings/actions) > Workflow permissions)

## Features

### Node.js, npm version

Typescript Library Starter relies on [volta](https://volta.sh/) to ensure node version to be consistent across developers. It's also used in the GitHub workflow file.

### Typescript

Leverages [esbuild](https://github.com/evanw/esbuild) for blazing fast builds, but keeps `tsc` to generate `.d.ts` files.
Generates two builds to support both ESM and CJS.

Commands:

- `build`: runs typechecking then generates CJS, ESM and `d.ts` files in the `build/` directory
- `clean`: removes the `build/` directory
- `type:dts`: only generates `d.ts`
- `type:check`: only run typechecking
- `type:build`: only generates CJS and ESM

### Tests

typescript-library-starter uses [jest](https://jestjs.io/).

Commands:

- `test`: runs jest test runner
- `test:watch`: runs jest test runner in watch mode
- `test:coverage`: runs jest test runner and generates coverage reports

### Format & lint

This template relies on the combination of [eslint](https://github.com/eslint/eslint) — through [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) for linting and [prettier](https://github.com/prettier/prettier) for formatting.
It also uses [cspell](https://github.com/streetsidesoftware/cspell) to ensure spelling

Commands:

- `format`: runs prettier with automatic fixing
- `format:check`: runs prettier without automatic fixing (used in CI)
- `lint`: runs eslint with automatic fixing
- `lint:check`: runs eslint without automatic fixing (used in CI)
- `spell:check`: runs spellchecking

### Releasing

Under the hood, this library uses [semantic-release](https://github.com/semantic-release/semantic-release) and [commitizen](https://github.com/commitizen/cz-cli).
The goal is to avoid manual release process. Using `semantic-release` will automatically create a github release (hence tags) as well as an npm release.
Based on your commit history, `semantic-release` will automatically create a patch, feature or breaking release.

Commands:

- `cz`: interactive CLI that helps you generate a proper git commit message, using [commitizen](https://github.com/commitizen/cz-cli)
- `semantic-release`: triggers a release (used in CI)
