# Room Refresh website

Static HTML/CSS product website, hosted on its existing Vercel project. Node 24.x is the only build dependency. There is no application server and no package install is required.

```sh
npm test
npm run preview
```

The preview serves `dist/` on port 4173. Set `PORT` for a second site. Vercel runs `npm run build` and serves only `dist/`; content drafts, source code and operations records are not published. The old root landing page has been superseded by the generated homepage.

## Editing and publishing

- `content/site.json` owns verified product facts, pricing, canonical origin and review date.
- `scripts/build.mjs` renders the seven core routes and approved articles as complete HTML. `content.css` extends the existing `styles.css` and branding.
- `content/articles/*.json` holds eight dated drafts. Drafts are excluded regardless of their scheduled date. A publisher must complete the release checklist, attach evidence, set actual `published` and `reviewed` dates, and set `status` to `published`.
- Never relabel the existing wall-clock demo as a sofa example. Capture the missing matched inputs and result before publishing the sofa draft. Likewise collect lighting and dashboard evidence for the relevant later drafts.
- Run `npm test`. Inspect desktop and mobile layouts, check the actual production branch/deployment target, and release through this website's Vercel project. The Shopify app is a separate project and must not be deployed by this workflow.
- Set `VERCEL_ENV=preview` when building a preview. Preview HTML and robots both opt out of indexing. Normal production builds use the custom domain as their canonical origin. Vercel's preview noindex response header supplies an additional platform safeguard.
- `npm run indexnow` prints a dry run. After production checks, `npm run indexnow -- --submit` verifies the live key and canonical pages before submitting them. An accepted submission is not proof of indexing.
- `public-files/` contains public webmaster verification files and is copied into the release. Keep issued verification files permanently.

## Media and analytics

The walkthrough uses unchanged existing product and theme-editor images, not a newly recorded generation. Recreate it with `node scripts/walkthrough.mjs` if ffmpeg is installed, and update the accompanying WebVTT captions and transcript when its content changes. Keep claims consistent with the actual images.

`analytics.js` loads Vercel Web Analytics only on the canonical production host. It sends page path and CTA placement for `shopify_install_click` and `demo_click`; no uploaded photos, form contents or URL query strings are attached. The included Web Analytics option was enabled in the existing Vercel project on 1 November 2026. Custom event reporting may depend on the team's plan: do not upgrade or buy a plan automatically. Website CTA clicks are not app installs or purchases.

## Operations

See `operations/RUNBOOK.md`, the editorial calendar, fixed prompt pack, product-fact evidence and measurement log. Account verification, sitemap submission and actual platform benchmark responses must be recorded with their observed status; never convert an access failure into a zero visibility score.
