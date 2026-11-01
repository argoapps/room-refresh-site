# AI visibility programme

Programme start: 1 November 2026. All scheduling uses Europe/London. Core website release happens now; the editorial programme starts Monday 16 November. One article per app per week continues through 4 January 2027. After that, choose topics from observed merchant questions and search gaps, while keeping the same evidence and release checks.

## Weekly run (Monday, 09:00)

1. Read this runbook, `product-facts.json`, `editorial-calendar.json`, `prompts.json` and the previous run record. Work in the two marketing website repositories only; inspect app source read-only when needed.
2. Check the custom-domain pages, robots, sitemap, canonical tags, media, 404 responses and crawler access. Inspect Search Console, Bing Webmaster and Vercel Analytics where signed in. Record data windows and sources; report unavailable data as unavailable.
3. If an article is due, inspect its draft and complete every release checklist item. Check the actual product and sources, collect the necessary demonstration evidence, and revise the draft to match. A future date alone does not authorise publishing an unverified draft. If evidence cannot be obtained, keep that article unpublished, record the reason and publish a verified replacement on the same merchant question only if it adds real value.
4. Set actual author/review/publication dates and publish at most the one due article per app. Run tests, inspect desktop/mobile views, release each site independently to its existing Vercel project, verify the live route and update the calendar. Submit changed URLs via IndexNow. Keep the preceding production deployment ID for rollback.
5. Review search impressions/clicks, indexed pages, referrals, demo clicks and install CTA clicks. Report actual Shopify app installs only if an attribution source is available. Do not infer them from website clicks.
6. Record changes, evidence, deployed URLs and unresolved blockers in a dated run record. Notify on a publication, material failure, meaningful measured change or required user action; stay quiet when nothing actionable has changed.

## Fortnightly and monthly

- Every second Monday from 16 November, prepare three researched outreach prospects per app and personalised drafts. Do not send without explicit authorisation. No purchased mentions, reviews or directory upgrades.
- On the first Monday of each month, recheck all plan names, prices, trial and extra usage rates against the live Shopify listing. Review links, setup/compatibility claims and source documents. Increment review dates only after substantive review.
- Each month produce one short captioned demonstration video per app. Use actual app images or recordings, match inputs and outputs, add captions/transcript and state whether it is a live recording or a walkthrough of still images. Never invent speed or accuracy results.
- Add customer case studies only with documented evidence and publication permission. Request specific approval if either is missing.

## Fixed AI benchmark

Baseline: 1 November 2026. Repeat at week 6 (7 December 2026) and week 10 (4 January 2027). Use the exact 14 prompts in `prompts.json` in ChatGPT Search, Gemini and Perplexity, two fresh conversations per prompt. Confirm search/web grounding is active. Avoid personalization or follow-up context. Do not call an ordinary web search an equivalent test of these product surfaces.

Save raw responses and visible source links before scoring. Store captures under the ignored `operations/captures/` directory; keep paths, timestamps and scores in `measurement-log.json`. Never commit signed-in browser state or credentials. Record platform, session number, prompt ID, recommendation flag, mention flag, citation URLs, competing products and any access/error status. Use the headline ladder `recommended > cited > mentioned > absent`, plus independent flags so a recommended and cited answer retains both facts. Inaccessible or non-grounded sessions are untested and excluded from score denominators. Show branded and unbranded results separately. This is a repeatability check, not a promise of ranking or causality.

## Search ownership and discovery

Google: add URL-prefix properties for each canonical HTTPS www origin. Deploy the supplied HTML verification files, verify ownership, submit `/sitemap.xml`, and retain the files. Bing: sign into the owner's existing account, add and verify each site (HTML/XML verification where available), and submit its sitemap. If registration requires accepting new terms or granting new account permissions, leave a concrete user handoff. IndexNow is independent of the webmaster account dashboards.

## Rollback

The initial production deployments were `dpl_D8KtFxkrBYxtMkVYpFETLFs8vZjC` (Room Refresh) and `dpl_6BJHcojgsEgHCY3gN4HGFaUR26De` (Try On Twin). Record each subsequent production deployment before releasing. Restore the preceding healthy deployment for a material live regression, then fix the source. Do not touch the separate Shopify application deployments, database configuration or app subscription settings.
