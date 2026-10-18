# AI Operating System for the Padel Portfolio

## Purpose

Use Hermes, Claude, GPT, Scale.gg and—if the user has access—Grokbot as coordinated tools around one measurable vision. The tools are execution layers; the project documents remain the source of truth.

## Agent roster

### ROB / Chief of Staff

Owns the vision, priorities, decision log, blockers and four-hour nudges. It does not silently change production systems.

### Build Lead

Owns the Padel Club Management codebase, database, authentication, tests and deployments. Reports changed files, tests and blockers.

### Revenue Operator

Owns the $10K MRR pipeline: club research, qualified leads, outreach drafts, demos, trials, setup packages and follow-up. Starts in report/draft mode.

### Funnel Builder

Uses Scale.gg/PageBuilder to build the public offer, club signup, $1 trial, setup packages, calendar and follow-up. Never assumes a native integration exists; verify the configured handoff.

### QA and Security Reviewer

Tests auth, club isolation, booking conflicts, billing boundaries, credits, exports, consent and secret handling.

### Content Operator

Turns build work, pilot setup and Kick/VOD sessions into approved clips, training, case studies and social assets. Human voice and final publication remain human-controlled.

### Commerce Operator

Maintains supplier/product/referral research and storefront plans. Does not purchase inventory or change live stores without approval.

## Rollout levels

### Level 1 — Observe

The agent reads files, researches, reports risks and proposes next actions.

### Level 2 — Draft

The agent writes code drafts, emails, pages, plans and database migrations for review.

### Level 3 — Supervised action

The human reviews the exact diff, message, campaign, payment or database operation and approves it.

### Level 4 — Narrow routine

Only repeatable low-risk actions may run automatically. Keep logs and a rollback path.

Never automate money movement, production database changes, player communications, ranking changes, refunds, billing, credential management or public publishing without a human approval gate.

## Standard prompt for every agent

```text
Read VISION.md and the relevant project documents first. State the measurable outcome you are working toward. Inspect the current files and do not invent APIs, data or integrations. Propose the smallest next step that closes the largest verified gap. Make only the requested change. Run the relevant checks. Report changed files, test output, blockers and the next action. Never expose secrets or claim an external action succeeded without verification.
```

## Grokbot use

The transcript describes an opinionated multi-agent system with named agents, routines, dedicated computers, integrations and gradual delegation. Apply those ideas without assuming the product’s current availability, permissions or connector behavior.

If Grokbot is available, start with one Chief of Staff and three bounded roles:

- Padel Build Lead.
- Revenue Operator.
- Content/Pilot Operator.

Give each a project-specific VISION.md and a narrow routine. Ask questions and reverse-prompt before granting actions. Review reports for several cycles before allowing drafts, then limited actions.

Keep sensitive accounts and credentials out of generic agent context. Use least-privilege connections and separate identities where supported. Human approval is required for email sends, campaign publishing, payments, account changes and production writes.

## Daily rhythm

- Morning: read vision, inspect blockers and choose the one revenue/build outcome.
- Work block 1: build or fix the highest-value product gap.
- Work block 2: test and review.
- Work block 3: demo, outreach or pilot onboarding.
- Work block 4: document the result and prepare the next action.
- Four-hour nudge: one action, one acceptance check, one blocker.

## Cross-project leverage

Every major action should create more than one asset:

- Product work creates a demo.
- Pilot setup creates training.
- Training creates content.
- Content creates leads.
- Leads create trials.
- Trials create case studies.
- Case studies improve the funnel.

Do not create content as a substitute for shipping or selling.
