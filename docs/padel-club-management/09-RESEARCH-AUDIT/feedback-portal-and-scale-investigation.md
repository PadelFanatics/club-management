# Feedback Portal and Scale.gg Investigation

Date: 2026-10-16

## Executive conclusion

The GitHub Feedback Portal is a credible MIT-licensed self-hosted starter for one business, its users and multiple products. It is built for feedback collection, voting, issue triage, helpdesk classification, changelog publishing and an optional approval-gated Agent Native sidecar.

It is not a finished multi-tenant SaaS platform, club-management backend or billing system. It can contribute selected patterns to Padel Club Management, especially tenant scoping, server-side OIDC authentication, staff roles, audit events, encrypted AI configuration, notification workflows and human approval before agent writes.

Scale.gg is publicly presented as an AI-powered marketing suite with focused applications. Public pages describe campaigns, pages, creative, courses, commerce, lead generation, CRM, calendars, documents, invoicing, helpdesk, projects and AI operations. The public material does not expose its private database schema or backend source, so its internal implementation cannot be verified from public pages.

## Feedback Portal repository

Repository:

`https://github.com/MonarchLabsLLC/Feedback-Portal-Self-Hosted`

Local clone:

`/opt/data/projects/feedback-portal-self-hosted`

Local commit inspected:

`436f1b8 feat: initial self-hosted feedback portal release`

License: MIT.

### Verified stack

- Next.js 16.3.5 App Router.
- React 19.2.7.
- TypeScript.
- Tailwind CSS 4.
- Prisma 7.10.0.
- PostgreSQL 17.
- pgvector and pg_trgm extensions.
- OIDC authentication with authorization code + S256 PKCE.
- Optional OpenRouter text/agent features.
- Optional OpenAI transcription and embeddings.
- Optional private Google Cloud Storage attachments.
- Optional Resend notifications.
- Optional Agent Native sidecar using Core 0.146.5 and Toolkit 0.13.5.
- Docker Compose path with a private pgvector database.
- Vercel support for the portal only, with the sidecar disabled.

### Domain model

The Prisma schema includes:

- installation tenants;
- users and database-controlled roles;
- application catalog;
- team members;
- feedback issues;
- votes, comments and watchers;
- tags and audit events;
- private internal notes;
- changelog entries;
- encrypted AI settings;
- notification preferences and notifications;
- optional vector embeddings;
- sidecar session tickets, sessions, selections, proposals and executions.

The security namespace is an installation-level `tenantId`. This is not a hosted customer-provisioning model. To make it a multi-club SaaS backend, the domain model and provisioning boundary would need deliberate redesign.

### User-facing surfaces

The source contains public/portal pages for:

- landing and login;
- feedback list and new feedback wizard;
- issue detail;
- changelog;
- authenticated user guide;
- admin dashboard;
- admin applications;
- admin issues/Kanban;
- admin team;
- admin AI settings;
- user settings.

The API surface covers authentication, issues, comments, votes, watchers, notifications, attachments, admin operations, AI helpers, changelog and the Agent Native bridge.

### Agent Native design

The sidecar is intentionally separated from the portal database. The portal remains authoritative for identity, tenant, roles, feedback and mutations. The sidecar has its own database and private loopback bridge.

The allowed business actions are deliberately narrow:

1. query-feedback;
2. get-feedback-issue;
3. list-feedback-resources;
4. prepare-feedback-operation;
5. execute-feedback-operation.

Writes require an immutable preview, durable human approval, expiry, request binding, role checks and idempotency. This pattern is valuable for Padel Club Management AI actions such as preparing a campaign, drafting a player reactivation message or proposing a booking change.

## Installation status

The repository was cloned and `npm ci` completed successfully after clearing the failed partial install.

The runtime used here is Node 26.5.1/npm 11.17.0, while the repository pins Node 24.18.x/npm 11.16.0. The engine mismatch must be fixed before production use.

Verified:

- `npm ci`: passed, with engine warning.
- Prisma client generation: passed during postinstall.
- `npm test`: passed; 18 tests passed, 0 failed.
- `npm run lint`: completed with 0 errors and 36 warnings.

Not verified:

- `npx prisma validate`: timed out in this runtime.
- `npm run build`: timed out in this runtime.
- Database migrations: not run because no disposable PostgreSQL/pgvector database was provisioned.
- OIDC login: not configured.
- Agent Native sidecar: not installed or started because pnpm is not installed and the Docker daemon is unavailable.
- Production deployment: not attempted.

The 10 install-time dependency advisories were reported by npm: 2 moderate, 7 high and 1 critical. They require a separate dependency review; do not run `npm audit fix --force` blindly because the lockfile and framework versions are pinned.

## What must be supplied to run it

### Minimum portal setup

- Node 24.18.x.
- npm 11.16.0.
- PostgreSQL 17.
- pgvector and pg_trgm extensions.
- A new empty database and separate least-privilege portal role.
- Exact `PORTAL_ORIGIN`.
- Independent `SESSION_SECRET`.
- Stable `INSTALLATION_SLUG`.
- OIDC provider supporting discovery, signed ID tokens, verified email and S256 PKCE.
- OIDC issuer, client ID, callback and owner bootstrap email.

Callback format:

`PORTAL_ORIGIN/api/auth/oidc/callback`

The first valid login for the exact verified owner email becomes superadmin once. Other identities become members. Admin/support roles are controlled in the database, not by browser input or OIDC role claims.

### Optional integrations

- OpenRouter key for AI text and agent features.
- OpenAI key for transcription/embeddings.
- Separate AI settings encryption key if provider overrides are saved in the database.
- Private GCS bucket and signing identity for attachments.
- Resend API key and verified sender for email.

### Full Agent Native setup

- pnpm 10.33.2.
- Separate sidecar database and database role.
- Separate sidecar secrets.
- Private loopback portal/sidecar bridge.
- Same-origin HTTPS proxy.
- Portal and sidecar rebuilt when enablement/proxy settings change.
- Agent writes and consequential actions disabled until read-only behavior and approvals are verified.

Do not expose the sidecar port and do not put provider keys in the sidecar environment.

## Scale.gg public architecture findings

The public Scale.gg material describes a suite rather than one narrow app:

### Campaigns and production

- ClickCampaigns.ai as the flagship campaign workspace.
- Alex as an AI campaign strategist.
- 20+ specialist roles.
- Campaign wizard, CoWork, quick tasks and buyer intelligence.
- Shared campaign brief, task progress, reviews, versions and artifacts.
- Export paths including Google Docs, PDF, PPTX, HTML and static/Vite website projects.

### Pages and websites

- PageBuilder for brand-aware websites, pages and funnels.
- Design systems, blocks, responsive preview, visual editing and code editing.
- HTML/CSS/JS and ZIP exports.
- Documented publishing/handoff options depend on account configuration.

### Sales, leads and operations

- PipeLeads LeadFinder.
- PipeLeads CRM.
- CalendarBug.
- DocSigner.
- Invoicer.
- HDHelpDesk.
- ProjectBaser.
- ChatBaser.
- ScaleGPTs.
- TOSDocs.

### Commerce, content and delivery

- Courses.gg.
- MyStore.gg.
- Scale.gg digital products and affiliate capabilities.
- CreatorStudio.
- Imager.
- VideoPlayer.
- BlogBaser.
- WebinarBaser.
- AffiliatePages.

### Adoption model

Scale.gg publicly promotes a side-by-side model: a business can keep its existing CRM, funnel or automation platform and add selected Scale apps. The public “works with” language explicitly distinguishes side-by-side use, export/handoff and configured connections. It does not prove universal automatic sync or a public white-label API.

## Padel Club Management fit

### Reuse or adapt

Use the Feedback Portal as a reference or bounded module for:

- user feedback and feature requests;
- staff triage and product roadmap;
- private support tickets;
- changelog and release communication;
- tenant-scoped authorization patterns;
- audit events and notifications;
- encrypted AI-provider settings;
- approval-gated agent operations;
- an authenticated user guide.

Use Scale.gg as the model for the product experience and operating layer:

- one club workspace;
- campaign and marketing dashboard;
- branded pages and funnels;
- CRM, contacts, calendar, documents and invoicing;
- courses and training;
- commerce and referrals;
- AI assistants with visible review/approval;
- exportable artifacts and integrations.

### Do not copy directly

Do not use the Feedback Portal schema as the Padel backend without changes. Padel requires first-class models for:

- clubs and locations;
- club administrators and staff;
- players;
- courts and availability;
- bookings and conflict rules;
- matches, sets, games and results;
- rankings;
- events and tournaments;
- training and courses;
- CRM contacts and consent;
- campaigns and sends;
- subscriptions, trials and webhooks;
- credit wallet, usage ledger and margins;
- affiliates, referrals and payouts;
- shops, products and club storefronts;
- storage/video ownership and consent.

The existing Padel Club Management Supabase foundation is closer to this domain than the Feedback Portal. The Feedback Portal patterns should be transplanted selectively, not treated as the replacement backend.

## Recommended build architecture

### Product surfaces

1. Padel Fanatics player web/app experience.
2. Club owner dashboard.
3. Public club website and booking/enquiry pages.
4. Growth dashboard for CRM, campaigns and funnels.
5. Admin/support and feedback portal.
6. AI/credit wallet.
7. Commerce and referral surfaces.

### Backend boundary

Keep one authoritative club-aware backend with:

- account and membership service;
- club/location service;
- booking/match/tournament service;
- billing and trial service;
- CRM/campaign service;
- credit ledger service;
- audit and support service;
- secure AI gateway;
- storage/video adapters.

Every club-owned query and mutation must be scoped to a club/location membership. The installation-level tenant pattern from Feedback Portal is useful, but club-level isolation must be explicit.

### AI boundary

Use a Padel equivalent of Agent Native only after the normal dashboard works. Start read-only. Then allow draft/preparation actions. Require human approval before sending messages, changing bookings, issuing credits, modifying rankings or triggering paid campaigns.

## Next setup decision

The next technical step is not connecting the Feedback Portal to a live database. It is choosing one of two safe paths:

### Recommended: selective pattern reuse

Keep `/opt/data/projects/club-management` as the primary application. Port selected ideas and implementation patterns from Feedback Portal into the existing Supabase/React codebase.

### Alternative: separate support portal

Run Feedback Portal as a separate internal product-feedback/support service for Padel Club Management. Connect it later through a documented API or link. This minimizes risk but creates two systems to administer.

Do not merge the repositories until authentication, tenant boundaries, billing ownership, database migrations and deployment topology have been designed.

## Sources

- Feedback Portal repository: https://github.com/MonarchLabsLLC/Feedback-Portal-Self-Hosted
- Scale.gg home: https://scale.gg/
- Scale.gg products: https://scale.gg/products/
- ClickCampaigns: https://scale.gg/clickcampaigns/
- PageBuilder: https://scale.gg/pagebuilder/
- Scale.gg works with existing stacks: https://scale.gg/works-with/
- Feedback Portal local README: `/opt/data/projects/feedback-portal-self-hosted/README.md`
- Feedback Portal local installation guide: `/opt/data/projects/feedback-portal-self-hosted/INSTALL.md`
