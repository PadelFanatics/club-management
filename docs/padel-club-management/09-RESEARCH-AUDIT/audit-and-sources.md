# Audit and Sources

## Existing local app

Repository: `PadelFanatics/club-management`

Observed:

- React/Vite/TypeScript/Supabase stack.
- Initial commit `6cb4c64`.
- Main branch.
- Mock/sample data remains in some screens.
- Some booking/join handlers are placeholders.
- No installed `node_modules`; lint/build could not run because `eslint` and `vite` were unavailable.

## Dropbox handover archive

`PATTAYA-PADEL-APP-HANDOVER-MIKE.tar.gz` includes:

- club-management source snapshot;
- Supabase migration;
- booking, player, ranking, payment, tournament and admin modules;
- separate SQLite referral tracker;
- handover notes and production-readiness gaps.

The handover explicitly says the product is early-stage and requires technical, commercial and ownership due diligence.

## Public Padel Fanatics site

https://padelfanatics.app/

Observed positioning:

- free voice scoring app;
- profiles and match storage;
- community;
- shop;
- competitions;
- training and fitness content;
- portal, social and partner links.

This is a useful traffic, proof and audience asset. The new commercial positioning is B2B club management and growth.

## Market signals checked

- 1club comparison: low-cost/free entry and paid plans from roughly $63/month.
- Playtomic Manager: published plan signals around $119–$349/month and marketplace/service-fee economics.
- CourtReserve: public pricing signals from roughly $199/month upward.
- ClubSpark: free-trial and transaction-fee model in some markets.
- Supabase: Pro plan from approximately $25/month plus usage.
- Twilio: usage-based SMS plus number/carrier fees.
- Brevo: free/low-cost email entry with volume-based paid tiers.

These are directional benchmarks, not final Padel Club Management pricing.

## External account limitations

Authenticated Scale.gg, ClickCampaigns, PageBuilder, Alex, Shopify, mystore.gg and Scout.gg accounts were not changed during the audit. A connected authenticated browser session is required before inspecting or modifying those live systems.

## Sources

- https://padelfanatics.app/
- https://credits.scaleplus.gg/
- https://github.com/PadelFanatics/club-management
- https://playtomic.com/pricing
- https://courtreserve.com/pricing/
- https://supabase.com/pricing
- https://www.twilio.com/en-us/sms/pricing/us
- https://www.brevo.com/pricing/
