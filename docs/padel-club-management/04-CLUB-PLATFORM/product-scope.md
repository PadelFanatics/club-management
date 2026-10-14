# Club Platform Scope

## Existing foundations

The inspected app and handover archive include React/Vite/TypeScript/Supabase foundations for:

- club landing pages;
- authentication;
- player profiles;
- club/admin dashboards;
- courts and bookings;
- payments UI;
- rankings;
- match recording;
- tournaments and brackets;
- events;
- shop UI;
- loyalty features;
- affiliate guide and commission UI.

The Supabase migration defines clubs, club admins, courts, players, matches, match players, bookings and payments with Row Level Security policies.

## Launch product

The first commercial version should prioritise:

- club account;
- court setup;
- booking/enquiry page;
- player accounts;
- events and tournaments;
- rankings and match records;
- basic CRM pipeline;
- limited campaign automations;
- credit wallet;
- training area;
- optional Kick/VOD agent setup;
- optional store link.

## Known gaps

Before production launch, verify:

- clean dependency install;
- TypeScript build and lint;
- Supabase migration;
- cross-club RLS isolation;
- server-side booking conflict prevention;
- payments, webhooks, idempotency and refunds;
- subscription tables and billing;
- affiliate attribution and payout rules;
- privacy, consent, deletion and exports;
- production secrets and backups;
- integration with existing booking providers.

The current local project has no installed `node_modules`, so lint/build were not run successfully during the audit; the observed errors were missing `eslint` and `vite` executables.

## Security

Never put provider keys in frontend code or local storage. Keep secrets in server-side encrypted storage. Do not commit `.env` files, customer records or payment credentials.
