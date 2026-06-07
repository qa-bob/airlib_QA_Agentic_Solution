# Airlib — QA Agentic Solution

> AI-assisted automated QA framework for [Airlib](https://www.airlib.co/) built with Playwright + TypeScript, powered by GitHub Copilot.

---

## 🏢 Company Profile

| Field | Details |
|-------|---------|
| **Company** | Airlib |
| **Description** | High-resolution urban air quality and pollution maps |
| **Website** | [https://www.airlib.co/](https://www.airlib.co/) |
| **LinkedIn** | [View Profile](https://www.linkedin.com/company/airlib-inc/) |
| **City** | Scottsdale |
| **Founded** | 2015 |
| **Employees** | 1–10 |
| **Leaders** | Herve Borrel (CEO), Paolo Taddonio (CTO) |

---

## 🎯 Purpose

This repository contains a fully agentic QA automation framework for Airlib's web application. It leverages **GitHub Copilot CLI** to generate, maintain, and evolve test coverage autonomously — using custom agents, skills, and instruction files to keep Copilot deeply context-aware of the project.

### Test Coverage Goals

- [ ] Smoke tests
- [ ] Functional tests
- [ ] Regression suite
- [ ] Accessibility checks (WCAG 2.1 AA)
- [ ] Performance baselines

### Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation |
| TypeScript | Strongly typed test code |
| GitHub Actions | CI/CD pipeline |
| GitHub Copilot CLI | AI-assisted test generation & maintenance |
| Page Object Model | Abstraction layer for UI interactions |

---

## 🚀 Development Environment Setup

### Prerequisites

- Node.js ≥ 18.x
- npm ≥ 9.x
- [GitHub Copilot CLI](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli) (for agentic workflows)

### Install & Run

```bash
# 1. Clone the repo
git clone https://github.com/qa-bob/airlib_QA_Agentic_Solution.git
cd airlib_QA_Agentic_Solution

# 2. Install Node dependencies
npm install

# 3. Install Playwright browsers
npx playwright install

# 4. Run all tests
npx playwright test

# 5. Run tests with interactive UI
npx playwright test --ui

# 6. Run a specific suite
npx playwright test tests/smoke/
```

### GitHub Copilot CLI Setup

```bash
# Install Copilot CLI (requires GitHub Copilot subscription)
npm install -g @github/copilot-cli

# Authenticate
copilot /login

# Start a session in this repo (Copilot will auto-load all instructions & skills)
cd airlib_QA_Agentic_Solution
copilot
```

---

## 📁 Project Structure

```
airlib_QA_Agentic_Solution/
├── AGENTS.md                     # Primary Copilot agent instructions (root-level)
├── Skills.md                     # Overview of all Copilot skills in this repo
├── README.md                     # This file
│
├── .github/
│   ├── copilot-instructions.md   # Repo-wide Copilot rules (auto-loaded)
│   ├── agents/                   # Custom Copilot agent profiles
│   │   ├── qa-specialist.agent.md
│   │   └── playwright-expert.agent.md
│   ├── skills/                   # Copilot skills (invoked contextually or by name)
│   │   ├── playwright-e2e/SKILL.md
│   │   ├── accessibility-audit/SKILL.md
│   │   └── page-object-generator/SKILL.md
│   ├── instructions/             # Path-specific Copilot instructions
│   │   ├── playwright-tests.instructions.md
│   │   └── typescript.instructions.md
│   ├── docs/
│   │   └── CONTRIBUTING.md       # Detailed contribution guidelines
│   └── workflows/
│       └── playwright-ci.yml     # CI hook — runs tests on push/PR
│
├── tests/
│   ├── smoke/
│   ├── functional/
│   └── regression/
├── pages/                        # Page Object Models
├── fixtures/                     # Test data & fixtures
├── utils/                        # Helper utilities
├── playwright.config.ts
└── package.json
```

---

## 🤖 GitHub Copilot Integration

This repo is fully initialized for GitHub Copilot. The following layers of AI context are active:

### Agents (`/agent` or `@agent-name`)
Custom agent profiles in `.github/agents/` give Copilot specialized personas:
- **`qa-specialist`** — holistic QA strategy, test planning, coverage analysis
- **`playwright-expert`** — Playwright-specific test writing, debugging, and optimization

See [`AGENTS.md`](./AGENTS.md) for how agents are structured and when to use each.

### Skills (`/skills` or `/skill-name` in prompt)
Skills in `.github/skills/` provide deep, task-specific instructions:
- **`playwright-e2e`** — end-to-end test generation workflow
- **`accessibility-audit`** — WCAG audit process using Playwright's axe integration
- **`page-object-generator`** — creates typed Page Object Model classes from a URL

See [`Skills.md`](./Skills.md) for a full reference of all skills.

### Instructions (auto-loaded)
Path-specific instruction files in `.github/instructions/` are applied automatically:
- `playwright-tests.instructions.md` → applied to all `tests/**/*.ts` files
- `typescript.instructions.md` → applied to all `**/*.ts` files

Repository-wide instructions live in `.github/copilot-instructions.md`.

### Hooks (GitHub Actions)
Automated workflows in `.github/workflows/` act as quality gates:
- **`playwright-ci.yml`** — triggers on push and pull requests to run the full test suite

### Rules
All contribution and code quality rules for this repository are codified in three places:
1. `.github/copilot-instructions.md` — rules Copilot must follow when generating code
2. `.github/docs/CONTRIBUTING.md` — rules human contributors must follow
3. `.github/instructions/*.instructions.md` — path-specific code style rules

---

## 📋 Contributor Rules

All contributors (human and AI) must follow these rules:

1. **Tests first** — write or update tests before modifying page objects or utilities.
2. **Page Object Model** — all UI interactions must go through Page Object classes in `pages/`. Never use raw selectors in test files.
3. **TypeScript strict mode** — no `any` types. All functions must have explicit return types.
4. **Descriptive test names** — use `test('should <action> when <condition>')` naming.
5. **No hard-coded waits** — use Playwright's built-in auto-waiting and `expect` assertions.
6. **Accessibility** — all new test areas must include at least one `@accessibility` tagged test.
7. **PR requirements** — every PR must pass the `playwright-ci` workflow before merge.
8. **Commit messages** — use Conventional Commits format: `feat:`, `fix:`, `test:`, `chore:`.

See [`.github/docs/CONTRIBUTING.md`](.github/docs/CONTRIBUTING.md) for the full contributor guide.

---

## 🛠 Available npm Scripts

```bash
npm test                    # Run all Playwright tests
npm run test:smoke          # Run smoke suite only
npm run test:regression     # Run regression suite only
npm run test:accessibility  # Run accessibility audit tests
npm run test:report         # Open the last HTML report
npm run lint                # Lint TypeScript files
npm run typecheck           # Run TypeScript type checking
```

---

*Part of the Phoenix Startup QA Agentic Solutions project.*
