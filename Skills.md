# Skills.md — Copilot Skills Reference

> Overview of all GitHub Copilot skills defined in this repository.
> Skills live in `.github/skills/` and are auto-discovered by Copilot CLI.

---

## What Are Skills?

Skills are folders of instructions, scripts, and resources that Copilot loads
when relevant to a task. They provide deep, specialized guidance for specific
workflows — like generating a Page Object Model or running an accessibility audit.

Skills complement `copilot-instructions.md` (which applies broadly) by providing
**targeted instructions** that Copilot only loads when the task warrants it.

**Location**: `.github/skills/<skill-name>/SKILL.md`

---

## Available Skills

### 1. `playwright-e2e`

**Location**: `.github/skills/playwright-e2e/SKILL.md`

**Description**: Step-by-step workflow for writing new end-to-end Playwright tests
from a user story or feature description. Covers selector strategy, assertion
patterns, test isolation, and tagging conventions.

**When Copilot uses it**: Automatically when asked to write a new test or test suite.

**Manual invocation**:
```
Use the /playwright-e2e skill to write smoke tests for the location search feature
```

---

### 2. `accessibility-audit`

**Location**: `.github/skills/accessibility-audit/SKILL.md`

**Description**: Runs an automated WCAG 2.1 AA accessibility audit using
`@axe-core/playwright`. Covers setup, test patterns, interpreting violations,
and writing fix-ready bug reports.

**When Copilot uses it**: Automatically when asked about accessibility testing or audits.

**Manual invocation**:
```
Use the /accessibility-audit skill to audit the map overlay controls
```

---

### 3. `page-object-generator`

**Location**: `.github/skills/page-object-generator/SKILL.md`

**Description**: Generates a typed TypeScript Page Object Model class for a given
page or component. Navigates to the URL, identifies interactive elements, and
produces a POM following this repo's conventions.

**When Copilot uses it**: Automatically when asked to create or scaffold a Page Object.

**Manual invocation**:
```
Use the /page-object-generator skill to create a POM for https://www.airlib.co/
```

---

## Managing Skills in a Copilot CLI Session

```bash
# List all available skills
/skills list

# Get details about a specific skill
/skills info playwright-e2e

# Enable or disable skills
/skills

# Reload after adding a new skill during a session
/skills reload
```

---

## Adding a New Skill

1. Create a subdirectory in `.github/skills/`:
   ```
   .github/skills/my-new-skill/
   └── SKILL.md
   ```

2. Write `SKILL.md` with required frontmatter:
   ```markdown
   ---
   name: my-new-skill
   description: What this skill does and when to use it.
   ---

   Instructions for Copilot...
   ```

3. Reload in your Copilot session: `/skills reload`

4. Update this `Skills.md` file with an entry for the new skill.

---

## Skills vs. Custom Instructions

| Feature | Custom Instructions | Skills |
|---------|-------------------|--------|
| **Scope** | Loaded for most/all requests | Loaded only when relevant |
| **Best for** | Coding standards, naming conventions, project context | Detailed workflows, multi-step processes |
| **Location** | `.github/copilot-instructions.md` | `.github/skills/<name>/SKILL.md` |
| **File format** | Plain Markdown | Markdown with YAML frontmatter |

For more, see the [GitHub Copilot Skills docs](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills).
