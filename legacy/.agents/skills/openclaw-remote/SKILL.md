---
name: openclaw-remote
description: Collaborate with the OpenClaw (oc) AI agent system on remote machine 100.64.88.73. Use when the user says "oc xxx" to interact with OpenClaw workspaces, read/write files, transfer data, or manage the CaMeL agent.
---

# OpenClaw Remote Collaboration

When the user says "oc" they mean OpenClaw — the AI agent platform running on `100.64.88.73`.

## Connection

```bash
# SSH (key-based, no password)
ssh lmy@100.64.88.73 'command'

# Copy remote → local
scp lmy@100.64.88.73:/remote/path ./local/path/

# Copy local → remote
scp ./local/file lmy@100.64.88.73:/remote/path/
```

## Remote Directory Layout

### `~/clawd/` — Main CaMeL Agent Workspace (git repo)

| File | Purpose |
|------|---------|
| `AGENTS.md` | Workspace rules and conventions |
| `SOUL.md` | Agent personality definition |
| `USER.md` | User info (Richard Luo, PhD, Agent Safety) |
| `IDENTITY.md` | Agent identity (CaMeL 🐫, Claude Opus) |
| `TOOLS.md` | Tool configs, API keys, email settings |
| `MEMORY.md` | Curated long-term memory |
| `HEARTBEAT.md` | Periodic task checklist |
| `config.yaml` | LLM provider config |

| Directory | Content |
|-----------|---------|
| `skills/` | Installed skills (agnxi-search, clawra-selfie, find-skills, memU, openclaw-autopilot, planning-with-files, qq-mcp, xiaohongshu, xiaohongshu-mcp) |
| `memory/` | Daily logs (`YYYY-MM-DD.md`) and session summaries |
| `scripts/` | Automation scripts |
| `projects/` | Active projects (camel-api, email-client) |
| `documents/` | Research papers and docs |

### `~/.openclaw/` — OpenClaw Runtime

| Path | Purpose |
|------|---------|
| `openclaw.json` | Main config |
| `workspace-main/` | Main workspace (AGENTS.md, SOUL.md, etc.) |
| `workspace-bot3/` | Bot3 workspace |
| `workspace-bot4/` | Bot4 workspace |
| `workspace-clone2/` | Clone2 workspace |
| `agents/` | Agent definitions |
| `credentials/` | Auth credentials |
| `cron/` | Scheduled tasks |
| `telegram/` | Telegram integration |
| `logs/` | Runtime logs |

### `~/.clawdbot/` — Clawdbot Runtime (older system)

- `clawdbot.json` — Config file
- Similar structure to `.openclaw/`

## Agent Identity

- **Name:** CaMeL 🐫
- **Mission:** Promote CaMeL API
- **Platforms:** Xiaohongshu (CaMeL AI), Telegram
- **Owner:** @黑乎乎 (Richard Luo)
- **Timezone:** Asia/Shanghai (GMT+8)

## Important Notes

- Remote machine is macOS
- Use `trash` instead of `rm` on remote
- Always confirm before sending emails or external messages from remote
- Skills on remote are at `~/clawd/skills/` — each has a `SKILL.md`
- Memory files are the agent's continuity across sessions — handle with care
