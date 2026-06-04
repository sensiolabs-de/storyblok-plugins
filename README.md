# SensioLabs — Storyblok Plugins

A monorepo of [Storyblok](https://www.storyblok.com/) **field plugins**, built with Vue 3,
TypeScript and the [`@storyblok/field-plugin`](https://www.npmjs.com/package/@storyblok/field-plugin)
SDK. Each plugin lives in its own package under [`packages/`](packages) and is developed,
built and deployed independently while sharing tooling, dependencies and configuration
through npm workspaces.

## Plugins

| Plugin                                                       | Package                                | Description                                                                                                                                          |
| ------------------------------------------------------------ | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Iconify](packages/iconify-plugin/README.md)                 | `sensiolabs-de-iconify-plugin`         | Pick icons from the [Iconify](https://iconify.design/) library.                                                                                      |
| [Advanced SEO](packages/seo-plugin/README.md)                | `sensiolabs-de-advanced-seo-plugin`    | Manage SEO metadata — title, description, Open Graph and Twitter/X cards, plus a _no index_ flag — with configurable required fields and validation. |
| [Country Select](packages/country-select-plugin/README.md)   | `sensiolabs-de-country-select-plugin`  | Select one or more countries (ISO 3166) with flags.                                                                                                  |
| [Language Select](packages/language-select-plugin/README.md) | `sensiolabs-de-language-select-plugin` | Select one or more languages (ISO 639).                                                                                                              |

## Tech stack

- **Vue 3** + **TypeScript**
- **Vite** for the dev server and builds
- **Vitest** for testing
- **[`@storyblok/design-system`](https://www.npmjs.com/package/@storyblok/design-system)** for native Storyblok UI components
- **ESLint** + **Prettier** for code quality
- **npm workspaces** to manage the packages

## Prerequisites

- **Node.js** — the version pinned in [`.nvmrc`](.nvmrc) (run `nvm use`)
- **npm** (ships with Node)
- A **Storyblok personal access token** (only needed for deploying)

## Getting started

Install all dependencies for every package from the repository root:

```bash
nvm use
npm install
```

### Environment

Deploying requires a Storyblok personal access token. Copy the example file and fill it in:

```bash
cp .env.local.example .env
```

```dotenv
STORYBLOK_PERSONAL_ACCESS_TOKEN=your-token-here
```

You can create a token under **My account → Personal access tokens** in Storyblok.
The `.env` file is git-ignored.

## Development

Each plugin is a standalone Vite app. Start the field-plugin sandbox for a single
plugin by running its `dev` script through its workspace:

```bash
npm run dev --workspace=sensiolabs-de-advanced-seo-plugin
```

This opens the Storyblok field-plugin sandbox where you can interact with the plugin,
edit its options and preview changes live.

Per-package scripts (run with `--workspace=<package-name>`):

| Script    | Description                                      |
| --------- | ------------------------------------------------ |
| `dev`     | Start the Vite dev server / field-plugin sandbox |
| `tsc`     | Type-check with `vue-tsc`                        |
| `build`   | Type-check and build the plugin bundle           |
| `preview` | Preview the production build                     |
| `deploy`  | Build and deploy the plugin to Storyblok         |

## Code quality

Run from the repository root — these cover every package:

```bash
npm run lint          # ESLint
npm run lint:fix      # ESLint with autofix
npm run format:check  # Prettier check
npm run format:fix    # Prettier write
```

## Building

Build a single plugin:

```bash
npm run build --workspace=sensiolabs-de-advanced-seo-plugin
```

## Deploying

Deploying builds the plugin and pushes it to Storyblok via the
[`@storyblok/field-plugin-cli`](https://www.npmjs.com/package/@storyblok/field-plugin-cli)
(using the token from `.env`).

Deploy a single plugin:

```bash
npm run deploy --workspace=sensiolabs-de-iconify-plugin
npm run deploy --workspace=sensiolabs-de-advanced-seo-plugin
npm run deploy --workspace=sensiolabs-de-country-select-plugin
npm run deploy --workspace=sensiolabs-de-language-select-plugin
```

Or deploy all of them at once with the provided `Makefile`:

```bash
make deploy-all
```

## Adding a new plugin

Scaffold a new field plugin into `packages/` using the Storyblok CLI:

```bash
npm run add-plugin
```

## Repository structure

```
.
├── packages/
│   ├── country-select-plugin/
│   ├── iconify-plugin/
│   ├── language-select-plugin/
│   └── seo-plugin/
├── .github/workflows/      # CI: prettier, ESLint, type-check and build
├── eslint.config.js        # Shared flat ESLint config
├── tsconfig.base.json      # Shared TypeScript config
├── Makefile                # deploy-all helper
└── package.json            # Workspaces + shared scripts
```

## Continuous integration

Every push and pull request runs the GitHub Actions workflow in
[`.github/workflows/ci-js.yaml`](.github/workflows/ci-js.yaml), which checks formatting
(Prettier), linting (ESLint), type-checking (`vue-tsc`) and builds for each plugin.
