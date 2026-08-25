# Northland Property Management

Production site for [www.northlandpropertymanagement.com](https://www.northlandpropertymanagement.com), served by the Cloudflare Pages project **northlandpmv5**.

Preview: [northlandpmv5.pages.dev](https://northlandpmv5.pages.dev)

## What’s in this repo

The live deployment (`NLPM-VERSION:v17`, `https://ca310c1d.northlandpmv5.pages.dev`) is a single static page: HTML, CSS, JS, and images inlined. That file is checked in as `public/index.html`.

| Item | Value |
| --- | --- |
| Pages project | `northlandpmv5` |
| Production domains | `www.northlandpropertymanagement.com`, `northlandpmv5.pages.dev` |
| Build command | none |
| Output directory | `public` |
| Production branch | `main` |

## Local preview

```bash
npm install
npm run dev
```

Then open the URL Wrangler prints (usually `http://127.0.0.1:8788`).

## Deploy

This repo is meant to be the Git source for the existing Pages project. In the Cloudflare dashboard, open **Workers & Pages → northlandpmv5 → Settings → Builds & deployments** and point Git at `nipez/northlandpm` / `main` with output directory `public`.

Direct upload from this machine (needs `npx wrangler login` or `CLOUDFLARE_API_TOKEN`):

```bash
npm run deploy
```
