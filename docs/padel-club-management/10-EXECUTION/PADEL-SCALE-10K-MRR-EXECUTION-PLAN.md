# Padel Management — Scale.gg $10K MRR Execution Plan

Date: 2026-10-18  
Status: audit and execution baseline; no live Scale.gg account changes made

## 1. Executive recommendation

Sell a productised **Padel Club Growth Package**, not a new all-in-one platform. Use Scale.gg Pro Max for the public offer, PageBuilder site/funnel, forms, CRM, email follow-up, helpdesk, invoices, training and campaign production. Keep the existing React/Supabase app as a separately verified booking/player/tournament prototype, not as the first commercial dependency. Scale.gg publicly documents its apps, 7,500 monthly credits, team access, agency workspaces and Zapier/Make/n8n/Composio/webhook/REST connections, but it also states that “works with” does not mean universal sync or a native integration.[1][2]

Start with one reusable fictional-club demo, one onboarding questionnaire, one manual fulfilment checklist and a paid pilot. Offer **$399/month Growth** plus a separately priced setup package. This is above the verified $249/month Champion benchmark for a mature padel-management platform and below its $349/month Master tier,[3] while charging for the growth service and onboarding layer. CourtReserve publicly positions reservations, events, payments, memberships and lesson scheduling as core platform capabilities,[4] while ClubMon explicitly targets the narrower member-management use case and does not do public court booking.[5] Do not promise court-booking, membership billing, WhatsApp, AI support or white-label tenant isolation until the relevant connection, account permission and data boundary are tested.

The cleanest subscription-only route to $10K MRR is **26 Growth clubs at $399 = $10,374 MRR**. A practical 30-club mix is 20 Growth + 10 Starter at the requested hypotheses: **$9,970**, so add one $199 Starter or a paid recurring add-on. Setup fees are separate cash flow and are not counted in MRR. The first independent action is to build and test the Scale offer/funnel and demo, then sell five pilots before expanding custom software.

## 2. Asset inventory

| Asset | What exists | Reuse now | Evidence / gap |
|---|---|---|---|
| Project vision and plans | Vision, pricing, 7-day/30-day launch plan, handover, agent model, decision notes | Use as commercial source of truth; reconcile the older $39–$249 plan with the new $199/$399/$699 hypotheses | Local docs are present. Prices are decisions to validate, not market proof. |
| Existing Padel app | React/Vite/TypeScript UI with 122 tracked source files; landing, auth UI, club dashboard, courts, bookings, players, matches, rankings, events, tournaments, shop, payments and subscriptions API types/helpers | Reuse UI ideas and domain vocabulary; use as a later integration/custom app | Current dashboards contain hard-coded demo clubs. The app is not a verified multi-tenant production service. |
| Supabase foundation | One initial migration for clubs, admins, courts, players, matches, match players, bookings and payments; RLS is enabled | Use as a domain starting point after security repair | No verified migration run, auth flow, server-side booking conflict prevention, billing webhooks, deletion/export or cross-club isolation test. Public SELECT policies exist for clubs/courts. |
| Feedback Portal | MIT self-hosted reference; Next.js/Prisma/Postgres/pgvector/OIDC, feedback, roles, audit events, notifications and approval-gated Agent Native sidecar | Reuse patterns only: audit log, support/feedback, role checks, approval before writes | It is not a Padel backend or hosted multi-tenant SaaS. Keep separate until boundaries are designed. |
| Scale.gg public capability | ClickCampaigns, PageBuilder, MailBaser/forms/automations, PipeLeads CRM/LeadFinder, CalendarBug, Invoicer, DocSigner, HDHelpDesk, ProjectBaser, courses, store, affiliates, AI apps and Agent Native are publicly described.[1] | Build the commercial package in Scale first | Live access, actual plan entitlement, API scopes, agency workspace behaviour, data processing and white-label terms are unknown. |
| Infrastructure | GitHub repo `PadelFanatics/club-management`; local project; referenced Dropbox source/archive; Feedback Portal clone; VPS project context | Preserve source and keep external accounts separated | No production deployment or live Scale connection was verified in this audit. |
| Sales assets | Pricing/trial ideas, launch plan, GETJACKED note, idea note, demo direction | Turn into one offer page, audit lead magnet and demo script | No approved prospect list, case study, testimonials or outbound approval. |

### What can be reused without waiting for Mike/Sam

1. Offer copy, pricing test, onboarding questionnaire, manual delivery checklist and fictional demo data.
2. Scale page/funnel/CRM/email/helpdesk assets once authenticated access is available.
3. Existing Padel UI as a clickable concept and requirements reference.
4. Feedback Portal patterns as a design reference, not copied schema.
5. Sales audit template, demo script, trial sequence and pipeline stages.

### What depends on Mike or Sam

- Confirmed Pro Max and Agency Sub-Account entitlement, number of workspaces and permission model.
- Whether client clubs receive their own logins/workspaces or are managed manually by the operator.
- Approved Scale apps, API/webhook scopes, custom domains, export/publishing destinations and billing ownership.
- White-label/resale language, client data-processing responsibility and support boundary.
- Payment provider, trial/charge rules and approval to contact named clubs.
- Whether Chilli Padel or another club is an approved pilot.

### Unknowns that must not be guessed

- Whether a native booking, court-availability, membership or WhatsApp integration exists in the current account.
- Whether Scale forms/CRM can enforce club-level data isolation for separate clients.
- Whether Scale supports arbitrary per-club branding and custom domains at the intended volume.
- Exact AI-credit consumption for the proposed workflows and who pays overages.
- Existing Dropbox archive contents and whether any code is newer than the GitHub repo.

## 3. Product definition and scope classification

### Release 1: the sellable package

**Promise:** “We set up the marketing, lead capture and follow-up system that helps a padel club turn interest into booked conversations, trials and repeat play—without forcing the club to replace a working booking platform.”

| Capability | Class | Release decision |
|---|---|---|
| Club offer page, registration/lead form, confirmation page | **A — Scale native** | Build immediately in PageBuilder + Forms. |
| CRM pipeline, tags, consent and lead follow-up | **A — Scale native** | Use PipeLeads/MailBaser; define one club/pipeline convention. |
| Email reminders and trial sequence | **A — Scale native** | Day 0, 2, 7, 14, 21, 27; approval before sends. |
| Club audit lead magnet and sales landing page | **A — Scale native** | Build one reusable template with brand tokens. |
| Onboarding questionnaire and delivery checklist | **A — Scale native** | Forms + ProjectBaser/manual SOP. |
| Invoices, setup fees and manual payment handoff | **A — Scale native** | Use Invoicer/DocSigner only after account access is confirmed. |
| Helpdesk/support and feedback portal link | **A — Scale native** | Start with HDHelpDesk; keep Feedback Portal separate. |
| Training/onboarding course | **A — Scale native** | Courses.gg or documented links; no custom LMS. |
| Club booking platform replacement | **C — custom / defer** | Do not sell this in Release 1. |
| Existing booking provider connection | **B — Scale + integration** | Verify a named API/webhook; otherwise use a tracked handoff link. |
| Membership subscriptions and recurring billing | **B — integration** | Validate provider, tax, refunds, webhooks and ownership before charging. |
| Coaching bookings/payments | **B — integration** | Only after a pilot identifies demand and provider access. |
| Tournament/event registration | **B — integration** | Use a Scale form plus manual/export workflow first. |
| WhatsApp communications | **B — integration** | No promise until an approved provider and consent flow exist. |
| AI customer support | **B/C** | Start with FAQ drafting and human-reviewed replies; no autonomous support writes. |
| Player CRM, rankings, matches and club data | **C — custom / existing app** | Later app work; current code is not production-ready. |
| Multi-club tenant isolation in Scale | **D — Mike/Sam decision** | Confirm workspace/data boundary before onboarding real clubs. |
| Branding, custom domains and resale | **D — Mike/Sam decision** | Confirm licence and operational ownership. |

### Explicitly deferred

Full Playtomic replacement, native mobile app, universal booking marketplace, access control, POS, unlimited AI, automated WhatsApp, video hosting/processing, supplier marketplace, multi-sport support and custom billing infrastructure.

## 4. $10K MRR validation

### Requested single-tier scenarios

| Tier | Price/month | Clubs needed to reach at least $10K | MRR at that count |
|---|---:|---:|---:|
| Starter | $199 | 51 | $10,149 |
| Growth | $399 | 26 | $10,374 |
| Pro | $699 | 15 | $10,485 |

These counts exclude setup fees, affiliate income, one-off projects and projected pipeline.

### Realistic mixed scenarios

| Mix | Clubs | MRR | Use |
|---|---:|---:|---|
| 10 Pro + 8 Growth + 3 Starter | 21 | $10,779 | High-touch, fewer clubs; higher delivery/support burden. |
| 8 Pro + 10 Growth + 5 Starter | 23 | $10,577 | Balanced but still requires 23 conversions. |
| 5 Pro + 12 Growth + 10 Starter | 27 | $10,273 | More accessible entry tier; more onboarding volume. |
| 20 Growth + 10 Starter | 30 | $9,970 | One $199 recurring add-on or one additional Starter closes the gap. |

### Recommended commercial model

- **Starter — $199/month:** offer funnel, lead form, CRM pipeline, basic email sequence, monthly reporting; manual booking handoff.
- **Growth — $399/month:** Starter plus branded club funnel, onboarding/setup, campaign templates, helpdesk, reactivation sequence and monthly optimisation. Make this the default pilot offer.
- **Pro — $699/month:** Growth plus multi-location coordination, higher-touch campaign operations, reporting review and approved integrations where available.
- **Setup:** $499–$1,500 depending on data import, pages, brand assets and campaign setup. Never include setup fees in MRR.

### Delivery economics and risk

Scale’s public pricing lists Pro Max at $200/month with 7,500 monthly AI credits, and Agency Sub-Accounts at $250/month for 5, $500 for 10, $1,000 for 25 or $1,500 for 50 client workspaces.[1] If those current prices and entitlements apply, a 30-club delivery baseline is $1,700/month for Pro Max plus the 50-workspace bundle, before payment fees, support, contractors, domains and other tools. This is an estimate, not a confirmed account quote.

At $399 average revenue, 30 clubs produce $11,970 MRR; the $1,700 Scale baseline is 14.2% before all other costs. The main risk is not AI token cost; it is human onboarding, support, data separation, failed integrations and churn. Cap the included work, charge setup separately, use templates and measure time-to-live per club. Treat payment fees as pass-through/variable and document the actual provider rate before final pricing.

**Conversion reality:** 26 Growth customers is a sales target, not a product calculation. First validate that a club will pay $399 for measurable lead capture, follow-up and setup while retaining its existing booking system.

## 5. Build now, before Mike/Sam

### First reusable assets

1. One fictional demo club: public offer page, lead form, booking-enquiry CTA, CRM stages and sample follow-up.
2. One onboarding questionnaire: club details, courts, location/timezone, booking system, brand assets, offers, consent and escalation contact.
3. One delivery checklist: access received, brand applied, page approved, form tested, CRM tested, emails approved, handoff trained.
4. One sales landing page: problem, package, exclusions, $1/30-day or paid-pilot test, booking CTA and proof placeholder.
5. One club audit: response time, public booking path, lead capture, follow-up, events, reviews and retention opportunities.
6. One support/feedback link and escalation SLA.

### Tenant and privacy gate

Do not place real clubs in one shared Scale workspace until the following are answered and tested: workspace separation, staff roles, client login visibility, contact export boundaries, custom-domain ownership, deletion/export, audit history, billing ownership and agency licensing. The safe default is one controlled workspace per approved club or a manual service model with no client login until the boundary is proven. Scale’s own public page distinguishes side-by-side use, export/handoff and configured connections; it does not prove universal sync or isolation.[2]

## 6. Smallest useful Hermes bot team

Use one coordinator and four bounded specialists. Do not run duplicate research.

| Bot | Responsibility | Inputs | Deliverable | Token budget | Dependency / done |
|---|---|---|---|---:|---|
| Coordinator | Maintain decisions, queue work, reject scope creep | This plan, verified outputs, approvals | One decision log and next-action brief | 8k/turn | Always active; done when each work block has an owner and acceptance test. |
| Scale verifier/builder | Inspect authenticated Scale capabilities and build the reusable demo | Scale account, approved fictional brand, this scope | Capability matrix, screenshots/URLs, demo funnel and test result | 12k | Needs Mike/Sam access; done when test contact reaches CRM and approved email path. |
| Product/data reviewer | Audit current app, Supabase schema, RLS and booking risks | Repo, migration, acceptance tests | Gap report plus prioritized security/data fixes; no speculative rebuild | 10k | Can work independently; done when two-club isolation and missing controls are evidenced. |
| Revenue operator | Prepare first-club acquisition assets | ICP, approved markets, offer, opt-in rules | 30 qualified prospects, audit template, scripts and follow-up sequence | 8k | Needs approval before outreach; done when drafts are ready, not when messages are sent. |
| QA/metrics reviewer | Test demo and commercial funnel | Demo URL, test account, checklist | Defect list, activation metrics and go/no-go recommendation | 8k | Depends on Scale builder; done when all acceptance checks have evidence. |

No bot sends outreach, publishes, changes billing, changes bookings, issues credits or edits production data without explicit approval and read-back verification.

## 7. Go-to-market: first 5, then 10/20/30 clubs

### Ideal customer profile

Independent padel clubs and small operators with 2–12 courts, an owner/operator decision-maker, visible activity but weak lead follow-up, manual WhatsApp/spreadsheet administration, recurring events or coaching offers, and enough margin to pay for setup plus $199–$399/month. Avoid enterprise chains and clubs already satisfied with a full booking platform until a clear growth gap exists.

### Initial markets

Start with English-speaking, reachable markets already reflected in the project: Thailand/SE Asia pilot relationships if approved, then UK, US, Australia and English-speaking European operators. Market order is a test hypothesis; use LeadFinder and public club sites to score urgency, not a claim about market size.

### Offer and sales process

1. **Audit:** send an approved, personalised “5-minute Padel Club Growth Audit” showing one visible lead-capture or follow-up leak.
2. **Demo:** 10 minutes through the fictional club funnel, CRM pipeline, follow-up and support path.
3. **Pilot:** $1/30-day trial only if card/billing and limits are verified; otherwise use a paid setup pilot with clear manual handoff.
4. **Activation:** collect onboarding form, apply brand, test one enquiry and one approved campaign within 72 hours.
5. **Conversion:** day 7 progress review, day 14 value review, day 21 retention campaign, day 27 billing reminder. No automatic charge until billing and consent are verified.
6. **Proof:** request a case study only with written permission.

### Outreach draft (approval required)

> Subject: One growth leak I noticed at [Club]
>
> I noticed [specific public observation]. I put together a short audit showing how [Club] could capture the enquiry, route it to one pipeline and follow up without replacing its current booking system. If useful, I can walk you through the working demo in 10 minutes. No changes to your accounts—just the audit and a practical next step.

### Targets

- **First 5:** personal network/referrals and approved pilot clubs; learn onboarding time, objections and first-value event.
- **10:** convert the repeatable package, publish one approved proof asset and add a referral ask to every successful onboarding.
- **20:** narrow to the highest-converting club profile; introduce Growth as default and stop bespoke low-margin work.
- **30:** use the 50-workspace cost case only after entitlement and isolation are verified; add QA/support cadence and monitor churn, activation and hours per club.

Track: qualified conversations, demo rate, pilot activation, time-to-live, first lead, first approved campaign, trial-to-paid, monthly recurring revenue, support hours/club, gross margin, churn and unresolved data/privacy issues.

## 8. 30-day execution plan

### Days 1–2: sellable Scale package

- Confirm Scale access and agency/workspace terms with Mike/Sam.
- Build fictional demo, offer page, onboarding form, CRM stages and email drafts.
- Create delivery checklist and support boundary.
- Do not touch live client data.

**Exit:** a test contact can submit the form, appear in the intended pipeline and receive the correct approved next step.

### Days 3–7: first pilots

- Complete one approved pilot onboarding.
- Test booking handoff, consent, support link and one campaign draft.
- Run QA on mobile page, form, CRM and email.
- Prepare prospect audit list and schedule approved demos.

**Exit:** one pilot has a verified first-value outcome and all manual steps are documented.

### Days 8–14: conversion

- Run demos and pilots; fix only repeated friction.
- Charge setup fees where approved.
- Validate pricing objections and time-to-live.
- Implement the first verified integration only if it removes a paid-club blocker.

### Days 15–21: proof and repeatability

- Obtain permission for a case study.
- Turn onboarding into a reusable template/training module.
- Add one reactivation campaign and one reporting view.
- Review support hours and gross margin.

### Days 22–30: scale the package

- Convert/cancel trials cleanly.
- Reconcile MRR separately from setup revenue and affiliate income.
- Decide whether the custom app earns a next sprint based on paid demand.
- Do not expand to multi-club tenant access without the privacy/licensing gate.

## 9. Current blockers and next action

1. **Scale access/entitlement:** no live account was inspected in this audit. Confirm Pro Max, Agency Sub-Accounts, workspace count, roles, API/webhook access and custom domains.
2. **Billing:** the requested $1 trial and automatic conversion are not implemented or verified. Use a manual/clearly labelled handoff until payment, refund, tax, webhook and cancellation behaviour are tested.
3. **Existing app readiness:** `node_modules` is absent in the local repo, so lint/build are not currently runnable. The code and migration require a separate technical hardening pass.
4. **Data isolation:** current migration policies and hard-coded dashboards do not evidence the Day-7 two-club acceptance test.
5. **Pilot approval:** obtain the approved first club and permission for any account change or outbound contact.

**Exact next action:** Mike/Sam confirms the Scale account and workspace/licensing answers in one written decision. Then the Scale verifier builds the fictional demo and runs the form → CRM → approved follow-up test. In parallel, the product/data reviewer writes the two-club isolation test plan; no production migration or external account change is required for that step.

## Sources

[1] https://scale.gg/pricing — Scale.gg pricing and Pro Max features  
[2] https://scale.gg/works-with — Scale.gg works-with and integration claims  
[3] https://playtomic.com/pricing — Playtomic Manager pricing  
[4] https://courtreserve.com/padel — CourtReserve Padel platform  
[5] https://clubmon.com/padel-club-management-software — ClubMon Padel club management

## Local evidence reviewed

- `docs/padel-club-management/VISION.md`
- `docs/padel-club-management/02-PRICING/pricing-and-trial.md`
- `docs/padel-club-management/04-CLUB-PLATFORM/product-scope.md`
- `docs/padel-club-management/08-30-DAY-LAUNCH/FAST-7-DAY-BUILD-PLAN.md`
- `docs/padel-club-management/09-RESEARCH-AUDIT/feedback-portal-and-scale-investigation.md`
- `docs/padel-club-management/HANDOVER_2026-10-18_padel-grokbot-vision.md`
- `src/` and `supabase/migrations/0001_rough_hill.sql`
