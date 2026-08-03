# PRC — End-to-End Completion Plan

The goal: a working customer journey from first visit to returning client, built open-source-first,
running on the free Cloudflare tier with zero servers to maintain — with documented swap points for
self-hosted open-source tools when the business grows into them.

## 1. The customer journey (what "finished" means)

```
DISCOVER            ONBOARD                    ENGAGE                    RETURN
  │                    │                          │                        │
  Home/Services   →  Client Intake form   →   Admin reviews in       →  Client logs in with
  Industries         (stored in D1)           /admin dashboard           access code
  Life Transitions                            │                          │
  │                  Booking request     →   Admin creates client   →  /portal shows their
  Free checklists    (stored in D1)           + access code             engagement status,
  (7 categories,     │                        │                         deliverables, updates
  print-ready)       Email capture       →   Admin posts updates    →  Books follow-up,
                     (stored in D1)           to client portal          annual health check
```

Every step above is IMPLEMENTED and working in this repo. What remains manual (by design —
the business plan requires human review for client-facing decisions): reviewing intakes,
replying to clients, and posting portal updates via the admin dashboard.

## 2. Open-source research (2026)

| Need | Implemented now (free tier) | Open-source upgrade when ready | Why this pick |
|---|---|---|---|
| Forms + storage | Astro API routes + **Cloudflare D1** (SQLite) | **Formbricks** (surveys/forms) or n8n webhook | D1 = zero servers, SQL, free 5GB |
| Scheduling | Booking-request form → admin | **Cal.com** (AGPL, 42k★) self-hosted; Easy!Appointments for simplest shared-hosting setup | Cal.com is the category leader; embed slot already marked in `/consultation` |
| CRM | Admin dashboard over D1 (intakes/bookings/clients) | **EspoCRM** (lightest, cheap VPS) or **Twenty** (modern, Postgres) — SuiteCRM only if enterprise breadth needed | EspoCRM = lowest ops burden for a one-person business |
| Client portal | Access-code login + signed-cookie sessions + D1 updates feed | **Supabase self-hosted** (auth + Postgres + storage) when file delivery is needed | Current portal has no uploads by design (see security note) |
| Email marketing | Subscriber capture in D1 | **listmonk** (single Go binary) | Simplest self-hosted campaign tool |
| Transactional email | None (admin sees submissions in dashboard) | **Postal**/Maddy self-hosted, or a Gmail app password + SMTP | MailChannels free tier for Workers was discontinued; don't depend on it |
| Document management (internal) | n/a | **Paperless-ngx** | Named in the business plan; needs a VPS + the security layer first |
| Workflow automation | n/a | **n8n** self-hosted | Automation sequence in business plan §Automation |
| E-signature | n/a | **Documenso** | For engagement letters later |
| Knowledge base / Library | Static checklist pages | **Outline** or **Docmost** | Records Readiness Library backend |

Hosting note: all "upgrade" tools need a VPS (a $5-10/mo box runs EspoCRM + listmonk + n8n
comfortably; Cal.com and Supabase want more). Until then, the D1 implementation covers the
journey with zero monthly cost.

## 3. Architecture (as built)

- **Astro 5 static + `@astrojs/cloudflare` adapter** — public pages stay prerendered; only
  `/api/*`, `/portal`, and `/admin` render server-side in a Pages Function.
- **D1 database `prc-db`** — tables: `intakes`, `bookings`, `subscribers`, `clients`,
  `client_updates`. Schema in `site/schema.sql`.
- **Auth** — clients: access code → HMAC-signed session cookie (Web Crypto, `SESSION_SECRET`).
  Admin: bearer token (`ADMIN_TOKEN`) entered once, held in an HttpOnly cookie. Both are
  Pages project secrets, never in the repo.
- **Spam control** — honeypot field on public forms.
- **CI** — push to `main` → GitHub Action → build → `wrangler pages deploy` (unchanged).

## 4. Security boundaries (from the business plan — do not relax)

- No document uploads anywhere until the written-security-policy layer exists (MFA, encryption,
  audit logging, retention). The portal shows status and text updates only.
- Public forms tell users not to submit account numbers / ID numbers / medical details.
- Legal pages (Privacy, Terms, Records Handling, Service Boundaries) are published final,
  effective 2026-08-02, and describe the site's actual data practices. They were written
  in-house, not by an attorney — a legal review before high-stakes B2B engagements is still
  money well spent; governing law is set to Texas in the Terms (edit there if wrong).
- Contact address published on legal pages: contact@paularecordscustodian.com. ONE MANUAL
  STEP: enable email forwarding in the Porkbun dashboard (Domain → Email Forwarding →
  contact@ → the owner's inbox). The MX records already point at Porkbun forwarding; mail
  works the moment the forward exists. (No API for this — dashboard only.)

## 5. Runbook (for the owner)

- **Review new leads**: visit `/admin`, enter the admin token. Intakes, bookings, and
  subscribers are listed newest-first; mark them contacted/closed.
- **Consultation scheduling**: visitors pick real 30-minute slots (Mon–Fri 10:00–16:00
  Central, 24h lead, 14-day window — edit `site/src/lib/slots.ts` to change). Booked slots
  disappear for everyone else; mark a booking `closed` in /admin to release its slot.
  To switch to Cal.com instead: create a cal.com account, connect the calendar, then set
  Pages env var `CALCOM_LINK` to the event link (e.g. `paula/consultation`) — the page swaps
  to the official Cal.com embed automatically.
- **Onboard a client**: /admin → "Create client" → give them the generated access code.
  They log in at `/login` and see `/portal`.
- **Post an update**: /admin → "Post client update" (pick client, title, body). It appears
  in their portal immediately.
- **Sell a Library membership**: /admin → "Add library member" (name, email, expiration:
  never / 1 month / 1 year) → give them the `LIB-` code. They enter it at `/library` and get
  all member guides. Deactivate or let expire to end access.
- **Fulfill a product order**: /admin → Orders tab. New orders arrive with items, subtotal,
  and shipping address. Reply by email with the confirmed total + payment options, then walk
  the status: new → invoiced → paid → shipped. For a gift Library membership, create the
  member (1-year) and email the code. Prices are edited in `site/src/data/products.ts`.
- **Turn on self-serve Library checkout**: create a payment link (Stripe Payment Link,
  Polar, or similar merchant account) and set the Pages env var `LIBRARY_CHECKOUT_URL` to it —
  the `/library` join card switches from "arranged directly" to a Subscribe button
  automatically. Issue the member code when the payment notification arrives (or wire the
  provider's webhook to `library_members` later).
- **Change prices**: `site/src/data/pricing.ts` (services + estimator formula) and
  `site/src/data/products.ts` (products). Push to deploy.
- **Traffic stats**: Cloudflare dashboard → Web Analytics → paularecordscustodian.com
  (cookieless; no consent banner needed).
- **Backups**: a GitHub Action exports the full database every Monday to a workflow
  artifact (90-day retention; repo → Actions → "Weekly D1 backup" → run manually anytime).
  Restore: `npx wrangler d1 execute prc-db --remote --file=prc-db-backup.sql`.
- **Change admin token / session secret**: Cloudflare dashboard → Pages → prc-site →
  Settings → Environment variables.
