# GitHub Pages deployment guide

This portfolio is configured for the GitHub **user site** repository:

- Repository: `https://github.com/ChaserFrank/ChaserFrank.github.io`
- Published URL: `https://chaserfrank.github.io/`
- Astro `site`: `https://chaserfrank.github.io`
- Astro `base`: `/`

The workflow is already included at `.github/workflows/deploy-pages.yml` and deploys the static `dist/` output whenever `main` is updated.


## One-time setup
1. Create a repository named exactly `ChaserFrank.github.io` under the `ChaserFrank` GitHub account. If it already exists, use that repository.

2. Push this project to the repository's `main` branch:

   ```bash
   git init
   git add .
   git commit -m "Customize Francis Kimani portfolio"
   git branch -M main
   git remote add origin https://github.com/ChaserFrank/ChaserFrank.github.io.git
   git push -u origin main
   ```

3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. Open the **Actions** tab and wait for **Deploy GitHub Pages** to finish.
6. Visit `https://chaserfrank.github.io/`.

## Future updates

Commit and push changes to `main`:

```bash
git add .
git commit -m "Update portfolio"
git push
```

GitHub Actions will rebuild and publish the site automatically.

