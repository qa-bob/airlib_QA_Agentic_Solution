# Contributing to Airlib QA Agentic Solution

Thank you for contributing! Please read this guide before submitting a PR.

---

## Branching Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready test suite — always green |
| `develop` | Integration branch — PRs merge here first |
| `feature/<name>` | New tests or features |
| `fix/<name>` | Bug fixes to existing tests |
| `chore/<name>` | Dependency updates, config changes |

## Commit Message Format

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

[optional body]
```

Types: `feat`, `fix`, `test`, `refactor`, `chore`, `docs`, `ci`

Examples:
```
test(map): add smoke tests for location search
fix(pages): correct selector for air quality legend
chore(deps): update playwright to v1.44.0
```

## Pull Request Requirements

Before opening a PR:

1. **All tests pass** — run `npx playwright test` locally and confirm no failures.
2. **TypeScript compiles** — run `npm run typecheck` with zero errors.
3. **No `test.only()`** — search your branch for `test.only` before pushing.
4. **PR description** — include what was tested, what changed, and how to verify.
5. **CI is green** — the `playwright-ci` workflow must pass before requesting review.

## Code Review Standards

Reviewers will check:

- [ ] Page Objects are used for all UI interactions (no raw selectors in test files)
- [ ] Test names follow `should <verb> when <condition> @<tag>` format
- [ ] No `waitForTimeout()` calls
- [ ] TypeScript strict compliance (no `any`, explicit return types)
- [ ] New test areas include at least one `@accessibility` test
- [ ] Imports are organized correctly

## Adding a New Test Suite

1. Determine the correct directory: `tests/smoke/`, `tests/functional/`, or `tests/regression/`
2. Check `pages/` for an existing POM — use the `page-object-generator` skill if needed
3. Write the spec file following the template in `AGENTS.md`
4. Tag all tests appropriately
5. Update `Skills.md` if you create a new skill alongside the tests

## Adding a New Page Object

1. Use the `page-object-generator` skill: `Use /page-object-generator to create a POM for [URL]`
2. Place the file in `pages/[PageName]Page.ts`
3. Export it from `pages/index.ts` if that file exists
4. Run `npm run typecheck`

## Using GitHub Copilot for Contributions

This repo is optimized for AI-assisted development. When using Copilot CLI:

```bash
# Start a session — all instructions, agents, and skills auto-load
copilot

# Invoke the QA strategy agent for test planning
Use the qa-specialist agent to plan tests for [feature]

# Invoke the Playwright expert for implementation
Use the playwright-expert agent to implement the test plan

# Use skills directly
Use /playwright-e2e to write smoke tests for [feature]
Use /page-object-generator to create a POM for [URL]
Use /accessibility-audit to check [page] for WCAG violations
```

## Questions?

Open an issue or start a discussion in the repository.
