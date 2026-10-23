# Francis Kimani — Backend Developer Portfolio

A dark, minimal Astro portfolio for Francis Kimani, focused on backend engineering, APIs, PostgreSQL, systems integration, and AI-powered workflows.

## Local development

```bash
pnpm install
pnpm dev
```

The local site runs at `http://localhost:4321/`.

## Production validation

```bash
pnpm build
```

## GitHub Pages

This project is configured for the GitHub user site `ChaserFrank.github.io` at `https://chaserfrank.github.io/`. The deployment workflow is `.github/workflows/deploy-pages.yml`.

See [GITHUB-PAGES.md](./GITHUB-PAGES.md) for the repository setup, Pages settings, push commands, and project-repository alternative.

## Portfolio configuration

- `src/data/site.ts` contains the name, contact links, canonical site URL, and LinkedIn placeholder.
- `src/components/projects.astro` contains the project cards and optional verified project/source links.
- `astro.config.mjs` contains the GitHub Pages `site` and `base` values.
