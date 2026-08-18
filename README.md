# ABT Digital Paper — marketing site

Static marketing site for ABT Digital Paper Co., Ltd (Jiangmen, Guangdong).
Astro 7 + Sanity CMS, deployed to Cloudflare Pages via GitHub Actions.

## Live

- **Production:** https://abtpaper-website.pages.dev
- **Custom domain (pending):** abtpaper.com

## Structure

```
abtpaper-website/
├─ src/
│  ├─ pages/index.astro          Single-page homepage
│  ├─ components/                Reusable Astro components
│  ├─ layouts/BaseLayout.astro   HTML shell + theme toggle
│  ├─ lib/sanity.ts              Sanity client
│  ├─ lib/content.ts             Sanity → component-shape mapper
│  ├─ content/homeData.ts        Static fallback content
│  └─ styles/global.css          Design system tokens + all styles
├─ studio/                       Sanity Studio (content editor)
│  ├─ schemas/                   Content schemas
│  └─ sanity.config.ts
├─ public/photos/                Factory + product photos
├─ public/certs/                 Certification marks
├─ public/abt_logo.png           Brand logo
├─ scripts/seed-sanity.mjs       One-shot: seed Sanity from homeData
└─ .github/workflows/deploy.yml  Auto-deploy on push to main
```

## Local development

Prerequisites: Node 22, npm.

```bash
# Site
npm install
npm run dev            # http://localhost:4321

# Studio
cd studio
npm install
npm run dev            # http://localhost:3333
```

## Deploying

Any commit to `main` auto-deploys to Cloudflare Pages via GitHub Actions.

Manual deploy (if needed):
```bash
npm run build
npx wrangler pages deploy dist --project-name=abtpaper-website --branch=main
```

## Content editing

**When Sanity Studio is deployed:** log in at the deployed studio URL, edit,
publish. The GitHub Actions workflow can be triggered by a Sanity webhook
to rebuild automatically.

**Meanwhile (fallback mode):** edit `src/content/homeData.ts` and push. The
site reads from that until Sanity is populated.

## Environment variables

- `SANITY_READ_TOKEN` (GitHub secret) — read-only token if the Sanity dataset
  is private.
- `CLOUDFLARE_API_TOKEN` (GitHub secret) — used by wrangler-action.
- `CLOUDFLARE_ACCOUNT_ID` (GitHub secret) — Cloudflare account ID.

## Sanity project

- **Project ID:** `wox2571x`
- **Dataset:** `production` (private)
- **Dashboard:** https://www.sanity.io/manage/personal/project/wox2571x
