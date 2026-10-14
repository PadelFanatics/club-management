# Credit Wallet

Reference model: https://credits.scaleplus.gg/

## Purpose

A subdomain credit wallet gives every club one balance for metered AI and media-related services across supported providers.

Potential providers:

- OpenAI
- Anthropic
- Google Gemini
- OpenRouter
- Replicate
- fal.ai

## Credit unit

Provisional internal rate:

```text
1 credit = $0.001 provider-cost equivalent
1,000 credits = $1
5,000 credits = $5
```

The UI should show credits and the dollar equivalent. Provider/model pricing is maintained in a cost table.

## Trial and plan allowances

- Trial: 5,000 promotional credits.
- Solo: 2,000 credits/month.
- Small: 5,000 credits/month.
- Growing: 15,000 credits/month.
- Pro: 30,000 credits/month.
- Multi-location: custom.

Credits expire monthly with a maximum rollover of one month of allowance.

## Managed credit packs

| Credits | Provider-cost value | Customer price |
|---:|---:|---:|
| 5,000 | $5.00 | $7.00 |
| 25,000 | $25.00 | $32.00 |
| 100,000 | $100.00 | $125.00 |
| 250,000 | $250.00 | $312.50 |

Prices include a transparent platform margin for metering, billing, infrastructure and support. Payment-processing fees and third-party charges are shown separately where applicable.

## Wallet features

- Balance.
- Credits granted.
- Credits purchased.
- Credits used.
- Provider, model and application.
- Usage detail.
- Credit history.
- Low-balance alerts.
- Auto top-up.
- Monthly spending limit.
- Pause-on-limit.
- Manual top-up.

Auto top-up is disabled by default during the trial.

## BYOK

Advanced clubs may connect their own provider API key. They must never provide a Claude Max, Codex, GitHub or provider password.

BYOK clubs pay the provider directly and pay either a $19/month metering/platform fee or a clearly disclosed usage-management fee. Managed credits are the standard margin-producing path for smaller clubs.

API keys must be encrypted, server-side only, excluded from logs, revocable and subject to spending limits.
