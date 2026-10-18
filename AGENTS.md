# Club Management

Apply shared rules from `/opt/data/AGENTS.md`.

Read `README.md`, `package.json`, and the relevant `src/` or `supabase/` files before substantial work. This is a web application; keep frontend, backend/schema, and configuration changes targeted and consistent with the existing stack.

Do not expose or commit secrets from `.env`. Avoid broad dependency/build scans (`node_modules`, build output). Run the project’s existing checks from `package.json` before reporting technical changes. Preserve the current working app and do not replace its architecture without an explicit reason.

## Terminology rule

- The sport and product name is always spelled **Padel** (P-A-D-E-L), never **Paddle**. Apply this rule to all customer, client, player, club, sales, support, marketing and internal project information. Before delivering or committing text, search the changed files for `Paddle`/`paddle` and correct any accidental use, except when quoting an external proper name that genuinely uses that spelling.
