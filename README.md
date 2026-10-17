# Replica for ChatGPT

A ChatGPT-friendly, prompt-driven adaptation of workflow concepts in the public [Replica skill pack](https://github.com/Jakeschincariol/replica-skill). It helps plan and implement an original app sharing functional ideas and common UX patterns without copying source code, protected content, branding, proprietary assets, or private APIs.

> **Status: prototype.** Independent adaptation, not an official OpenAI product, not a drop-in Claude plugin, and not validated end-to-end on a real target app.

## Quick start

1. Open a new ChatGPT conversation.
2. Paste the full contents of `skills/replica-master/SKILL.md` into the chat (or attach the file and ask ChatGPT to follow it).
3. Provide a target app URL or screenshots and choose one core workflow.
4. Type `/replica-recon`, then proceed through other modes as needed.
5. Ask ChatGPT to output complete files with exact paths. Save them locally, run the given commands, then paste errors and test output back into ChatGPT.

The `/replica-*` names are prompt conventions, not built-in ChatGPT slash commands or persistent installed skills. Paste the master prompt in every new chat unless a supported persistent-instructions setup is used.

## Modes

| Mode | Main output |
|---|---|
| `/replica-recon` | `replica/recon.md`, `replica/features.csv` |
| `/replica-architect` | architecture, schema and API plan |
| `/replica-design` | design tokens and component specifications |
| `/replica-build` | implementation files and build log |
| `/replica-backend` | backend plan/code, migrations, `.env.example` |
| `/replica-test` | test plan, runnable tests, bug report |
| `/replica-diff` | evidence-based parity/gap report |
| `/replica-entrepreneur` | feedback research and differentiation plan |
| `/replica-brand` | distinct brand direction |
| `/replica-launch` | landing page, pricing hypotheses, store listing |
| `/replica-deploy` | deployment preflight and hosting steps |

Suggested order: recon → architect → design → build → backend → test → diff → entrepreneur → brand → launch → deploy.

## Limitations

ChatGPT does not automatically share Claude Code's local filesystem, terminal, browser session or plugin registry. Available capabilities depend on the tools enabled in a particular chat. If code execution is unavailable, provide runnable files and exact local steps, and mark tests **NOT RUN**. Mark tests PASS only when actually executed and results inspected.

This adapts the workflow for chat-based use; it does not include every utility script from the original. It must be validated against a real target app before being described as production-ready.

## Clean-room rules

- Use public information and the user's own account, operated by the user.
- Do not bypass logins, paywalls, CAPTCHAs, rate limits or access controls.
- Rebuild functionality/common UX, not source code, logos, proprietary text/media, licensed content or private APIs.
- Use official APIs and the user's own credentials; never paste secrets into chat.
- Never fabricate reviews, quotes, data, test results, or brand-check results.
- Obtain explicit approval before production deployments or live payments.

## Test status

Static prompt-pack tests: run `python -m unittest discover -s tests -v` from the repository root. These checks do not prove generated apps build, match a target or deploy.

## Attribution

Independent ChatGPT-oriented adaptation inspired by concepts and public documentation in the MIT-licensed [Replica skill pack](https://github.com/Jakeschincariol/replica-skill). Not affiliated with or endorsed by its author or OpenAI. Preserve upstream notices if redistributing any upstream code.
