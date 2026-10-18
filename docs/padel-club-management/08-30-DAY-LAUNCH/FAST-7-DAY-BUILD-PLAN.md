# Fast-Worker 7-Day Build and Launch Plan

## 30-day commercial target

Target: build toward **$10,000 MRR within 30 days** from Padel Club Management / Padel Club Scale.

This is a target, not a guaranteed outcome. The fastest credible path is to sell a narrow, working club-management wedge before completing every future feature.

### Initial offer

- $1 for 30 days.
- Card required.
- Upgrade at any point.
- Solo: $39/month.
- Small: $79/month.
- Growing: $149/month.
- Pro: $249/month.
- Multi-location: from $399/month.
- Setup packages: $49, $149, $299 and $499.
- Players remain free.
- No booking or sales commission during launch.
- Trial limits: one location, up to three courts, 100 players, one administrator, one campaign, one event, one tournament, one automation, 250 emails and 5,000 promotional AI credits.

### Revenue math to use for planning

Do not rely on one channel. Combine club subscriptions, setup packages, AI credit packs, CRM/marketing add-ons, commerce/referral revenue and player growth. Prioritise clubs with enough courts and urgency to buy setup help.

## Scope rule

Launch a narrow vertical slice first:

1. Club account and administrator.
2. Club profile, logo, colours, opening hours and courts.
3. Player accounts and invitations.
4. Booking/enquiry flow with conflict protection.
5. Matches, rankings and results.
6. Events and one tournament workflow.
7. Basic CRM/contact list and one campaign.
8. Trial, plan display and billing handoff.
9. Credit balance/usage display, with provider calls server-side.
10. Training/onboarding and an optional Kick/VOD setup guide.

Defer full commerce cloning, advanced automations, multi-sport expansion, design toolkit, full VOD processing and nonessential polish until the first usable club flow is tested.

## Day 1 — Define and package the Padel Management Package

**Scope correction:** the separate Padel Club Management software app is parked. Day 1 is not an app-build or code-readiness day. The immediate product is the sellable Padel Management Package built around Scale.gg, its pages, content, onboarding and delivery assets.

### Before the two-hour checkpoint

- Write the one-sentence promise for club owners and the specific problem it solves.
- Freeze the buyer, offer name, $1/30-day trial, plan prices and setup-package prices.
- Define exactly what is included in the package: Scale.gg account/workspace setup, club marketing assets, lead/booking enquiry funnel, onboarding, campaign templates and support boundaries.
- List what is explicitly excluded for now: custom software development, full booking-platform replacement, video hosting/processing and unverified integrations.
- Map the customer journey: discovery → offer page → trial/signup → payment or activation → onboarding → first campaign → upgrade.
- Create the content inventory: offer page, pricing/trial copy, FAQ, onboarding checklist, setup videos, email sequence, demo script and sales/outreach copy.
- Create a single launch-blocker list with three columns: **must exist today**, **can be manual**, **defer**.
- Gather only the Scale.gg/PageBuilder access and brand assets required for the first demo; do not alter live accounts without authenticated access and approval.

### Two-hour checkpoint

Return with the frozen offer, package contents, exclusions, funnel map, content inventory and blocker list. Then use the next block to build the first Scale.gg/landing-page asset, not the parked app.

**Exit test:** another person can read the offer, understand the $1 trial and next step, see what delivery includes, and follow the complete manual onboarding path without needing the future app.

## Day 2 — Build the Scale.gg delivery foundation

- Build the offer, trial/signup and confirmation/onboarding pages in Scale.gg/PageBuilder.
- Add the onboarding form, delivery checklist and manual fulfilment workflow.
- Create the first club demo using fictional or approved sample data.
- Add the email follow-up sequence and the day-0/day-7 trial messages.
- Document the handoff point where the future software app may later replace manual work.

**Exit test:** a test contact can move through the Scale.gg funnel, submit onboarding information and receive the correct next-step email without manual page edits.

## Day 3 — Finish the club operating loop

- Finish courts, opening hours and booking/enquiry flow.
- Add server-side conflict prevention and timezone handling.
- Finish player invitations and profiles.
- Finish match recording, rankings and results.
- Finish one event and one tournament path.
- Add audit-friendly empty, loading and error states.

**Exit test:** a pilot club can configure courts, invite players, accept a booking/enquiry, record a match and see the result.

## Day 4 — Add the revenue and growth layer

- Add plan/trial display and upgrade CTA.
- Implement or stub a clearly labelled billing handoff; never fake payment success.
- Add trial limits and usage counters.
- Add the credit wallet balance, ledger and low-balance state; keep provider keys server-side.
- Add one CRM campaign and email consent state.
- Add onboarding checklist and training links.

**Exit test:** a club can understand what is included, what costs extra and what happens on day 30.

## Day 5 — Production hardening and demo

- Run lint, typecheck and build.
- Test authentication, RLS, booking conflicts, trial limits and credit deductions.
- Check privacy, deletion/export path and consent language.
- Configure logging without secrets or payment data.
- Prepare a polished demo tenant and a 10-minute demo script.
- Record the first reusable setup/training video.
- Prepare the club signup, trial and setup-package pages in PageBuilder/Scale.gg.

**Exit test:** the demo can be shown without manual database edits or unexplained mock behaviour.

## Day 6 — Pilot launch and outbound

- Configure Chilli Padel or the first approved pilot.
- Invite staff and a small player group.
- Run one real test event or tournament.
- Create the first campaign.
- Build a list of global English-speaking clubs using Lead Finder.
- Add prospects to PipeLeads/CRM.
- Send personalised club audits and book demos.
- Offer $1 trial plus an optional setup package.

**Exit test:** at least one real pilot is using the flow and qualified prospects are in the sales pipeline.

## Day 7 — Measure, fix and sell

- Watch the pilot complete the whole flow.
- Fix only launch-blocking defects.
- Publish the first case-study draft with permission.
- Run demos and activate trials.
- Send the day-7 upgrade/setup offer to active trials.
- Review activation, player invites, bookings, matches, campaign use, credit use and support requests.
- Decide the next seven-day build based on observed friction and sales objections.

**Exit test:** the product is testable with a real club, the sales funnel is live, and the next work is driven by evidence.

## Days 8–30 — Revenue sprint

### Days 8–10

- Fix pilot blockers.
- Improve onboarding and demo conversion.
- Activate the next clubs.
- Complete payment/subscription webhooks and idempotency before charging at scale.

### Days 11–14

- Run daily demos and personalised outreach.
- Sell setup packages.
- Launch the day-14 progress review and upgrade offer.
- Add the first high-value CRM/reactivation feature.

### Days 15–21

- Publish the first approved case study.
- Add one commerce/referral path.
- Run a tournament/event growth campaign.
- Validate credit-pack pricing and usage reporting.
- Do not add large new features unless they unblock sales.

### Days 22–27

- Improve conversion and retention.
- Contact every active trial.
- Send day-27 billing reminders.
- Resolve data export, deletion, privacy and support gaps.
- Confirm supplier, affiliate and payment terms before public promotion.

### Days 28–30

- Convert or cancel trials cleanly.
- Review MRR, setup revenue, activation and churn risk.
- Reconcile credit costs and margin.
- Decide the next product investment from measured demand.

## Four-hour nudge rules

Every scheduled nudge must:

1. Read this plan and the existing project documents.
2. Identify the current day/phase from the latest recorded work.
3. Give one next action that can be completed in the next work block.
4. Mention the acceptance test for that action.
5. Surface overdue blockers such as dependencies, access, bills or payment setup only when known; never invent a due date or claim a bill is paid.
6. Prefer shipping, testing, selling and fixing over planning.
7. Avoid asking a question unless a real decision blocks progress.

## Non-negotiables

- Never commit secrets, API keys, payment data, customer lists or `.env` files.
- Never claim a live integration, payment or deployment without verification.
- Do not change Scale.gg, PageBuilder, Shopify, mystore.gg, Supabase or customer accounts without authenticated access and approval.
- Video hosting, storage and processing remain outside the base subscription.
