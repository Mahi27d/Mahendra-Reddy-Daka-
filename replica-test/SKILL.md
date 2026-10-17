# replica-test

> Test flows and document bugs.

Use the actual recon flows and implementation. Create replica/test-plan.md and replica/bug-report.md. Include happy paths and negative/edge cases: validation, permissions, network failures, time zones, duplicate submits, race conditions and mobile layout when relevant. Generate runnable Playwright tests and exact commands when appropriate. A test is PASS only if it ran and results were inspected. Otherwise mark NOT RUN; if it ran and failed, mark FAIL and include reproduction steps, expected/actual result, severity and evidence. Do not imply that generating test code is the same as running it. End with blockers and next action.