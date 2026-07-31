# PRC — Paula Records Custodian LLC — System Architecture

**Status:** Phase 0 built (public website, placeholders). Wiring phases follow.
**Source of truth for the business:** `~/Downloads/BUSINESS_PLAN(1).md` (identical to the .docx).
**Credentials:** `~/Documents/prc credentials.txt` (Cloudflare account `f927f5a470547c6c579d03acaa18f0ed`, zone `162c04c59ac3ddfac5c31e00cabcea83`). Do not copy secrets into this repo.

## 1. What PRC is (one paragraph)
Records Readiness company. Helps people/families/businesses identify, organize, preserve, track, retrieve, and connect records so they're prepared before life asks for proof. Not a scanning/storage shop — the deliverable is a dependable records *system*. First sales lane: New Ownership Records Transition Review for newly acquired apartment complexes / mobile-home parks / new management companies.

## 2. End-to-end architecture

```
                        PUBLIC EDGE (Cloudflare)
  paularecordscustodian.com ──► Cloudflare Pages (static Astro site)  ◄── this repo /site
        │  (NS flip at Porkbun still PENDING — see §6)
        │
        ├─ /consultation ──► [wire: Cal.com or Google Calendar embed]
        ├─ /intake ────────► [wire: form POST → n8n webhook → CRM + folder + email]
        ├─ /login ─────────► [wire: client portal — future phase, likely Supabase auth]
        └─ /resources, /library ► [wire: downloadable checklists → lead-magnet email capture]

                        AUTOMATION LAYER (future, per plan)
  n8n (workflows) ── Twenty CRM ── PostgreSQL/Supabase ── listmonk (email)
        │
        └─ Property Lead Pipeline: public records → classify → match owner →
           confidence score → HUMAN VERIFY → CRM opportunity → outreach draft →
           HUMAN APPROVE → follow-up sequence
           (human gate before anything client-facing — plan requirement)

                        INTERNAL RECORDS LAYER (future)
  Paperless-ngx (doc mgmt) ── per-client folder structure (7 PRC categories)
  Ollama / controlled local AI ── Dify/Flowise selected workflows
```

## 3. Repo layout
```
~/prc/
  ARCHITECTURE.md      ← this file
  site/                ← Astro static site (deployed to Cloudflare Pages)
    src/layouts/Base.astro     shared shell: head, nav, footer
    src/pages/*.astro          17 public pages (see §4)
    src/styles/global.css      design system
```

## 4. Website — 17 public pages (all built, Phase 0)
| Route | Page | Wiring later |
|---|---|---|
| `/` | Home | — |
| `/about` | About PRC | — |
| `/how-it-works` | How It Works | — |
| `/services` | Services (Phase 1 + Phase 2 portfolio) | — |
| `/industries` | Industries / target markets | — |
| `/life-transitions` | Life Transition Services | — |
| `/resources` | Resources | checklist downloads → email capture |
| `/library` | Records Readiness Library | subscription gate |
| `/products` | Products | e-commerce / order links |
| `/consultation` | Book a Consultation | Cal.com / Google Calendar |
| `/intake` | Client Intake | form → n8n → CRM (automation seq. steps 1–7) |
| `/login` | Client Login | client portal (Supabase auth) |
| `/partnerships` | Partnerships | partner inquiry form |
| `/privacy` | Privacy Policy | attorney review before launch |
| `/terms` | Terms | attorney review before launch |
| `/records-handling` | Records Handling Notice | attorney review before launch |
| `/service-boundaries` | Service Boundaries | — (content from plan, verbatim intent) |

Every placeholder is marked in-page with a `data-wire` attribute and a visible "coming soon" state, so wiring is a grep for `data-wire`.

## 5. Deploy pipeline
- Build: `cd ~/prc/site && npm run build` → `dist/`
- Deploy: `npx wrangler pages deploy dist --project-name=prc-site` (env `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` from credentials file)
- Custom domains `paularecordscustodian.com` + `www` bound to the Pages project; activate when NS flip.

## 6. LANDMINES / open items
1. **NS delegation pending.** Porkbun still answers for the domain. Fix: Porkbun dashboard → Authoritative Nameservers → `bjorn.ns.cloudflare.com`, `gwen.ns.cloudflare.com`. Until then only the `*.pages.dev` URL resolves publicly.
2. **Credentials file has 4 tokens; none can write DNS.** The `cfat_…163aee27` account token works for zone lookup + Pages project/deploy/domains. All four tokens fail (`code 10000`) on the DNS-records API. After the NS flip, add the CNAMEs in the Cloudflare dashboard (Pages → prc-site → Custom domains will offer to auto-create them): `@` and `www` → `prc-site-2uj.pages.dev`, proxied.
   Live production URL: **https://prc-site-2uj.pages.dev** (deploy with `--branch main` — the Pages project's production branch is `main`; a bare deploy from `~` picks up branch `master` and lands in preview).
3. **Service boundaries are legal surface.** PRC must never appear to give legal/accounting/medical advice — the site's copy and the footer disclaimer follow the plan's boundary language. Any new page copy must respect it.
4. **Security prerequisites before accepting real client records** (plan §Security): MFA, encryption, audit logging, retention schedule, incident response. The intake form must NOT accept document uploads until that layer exists.

## 7. Wiring order (matches plan's automation sequence + growth roadmap)
1. NS flip → domain live
2. Consultation booking (Cal.com embed) — zero backend
3. Intake form → n8n webhook → Twenty CRM + confirmation email + lead ID/folder
4. Checklist downloads with email capture → listmonk
5. Client portal (Supabase auth) behind /login
6. Property lead automation (public-records scraper → human-verified CRM opportunities)
7. Records Readiness Library subscription
