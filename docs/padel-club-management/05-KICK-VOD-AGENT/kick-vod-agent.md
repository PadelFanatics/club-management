# Kick VOD Agent

## Commercial rule

Video and storage are not included in club subscriptions.

The club owns:

- Kick account;
- GitHub repository;
- storage account;
- API keys;
- videos and VODs;
- player consent and retention policy.

## Workflow

1. Club creates a Kick account.
2. Club streams matches, tournaments and training.
3. VODs remain in the club-owned Kick account.
4. Club copies a GitHub agent template.
5. Agent runs daily using an approved access method.
6. Agent downloads VODs to club-owned storage.
7. AI creates clips, transcripts, titles, captions and recaps.
8. Outputs are placed in club-owned folders for review and publishing.

## Repository template

```text
kick-vod-agent/
├── README.md
├── .env.example
├── config.example.yaml
├── download_vods.py
├── process_videos.py
├── create_clips.py
├── upload_storage.py
├── generate_metadata.py
└── .github/workflows/daily-vod-sync.yml
```

GitHub stores code and configuration, not video files. Heavy processing should run on a club-owned VPS, local machine or self-hosted runner rather than depending on GitHub Actions storage/runtime.

## Outputs

- Full VOD archive.
- Match highlights.
- Vertical clips.
- Tournament recaps.
- Player moments.
- Social captions.
- Blog/newsletter summaries.
- Sponsor drafts.
- Thumbnail prompts.

## Cost policy

The club pays for storage, bandwidth, transcription, AI video analysis, processing workers and backups. The credit wallet meters AI usage. Kick access must use approved official methods and comply with current platform terms.

## Setup upsells

- Quick Start: $49.
- Club Video Setup: $149.
- AI Content Setup: $299.
- Done-With-You Content System: $499.
