---
applyTo: "**/*.ts,**/*.tsx"
excludeAgent: "code-review"
---

## TypeScript Rules for This Repository

- Enable and respect `strict: true` in `tsconfig.json`. Never use `@ts-ignore` or `@ts-expect-error` without a code comment explaining why.
- Never use `any` as a type. Use `unknown` when the type is genuinely unknown, then narrow with type guards.
- All exported functions must have explicit return type annotations.
- Prefer `interface` over `type` for object shapes that may be extended; use `type` for unions and mapped types.
- Use `readonly` on arrays and objects that should not be mutated: `readonly string[]`, `Readonly<Config>`.
- Prefer `const` over `let`. Never use `var`.
- Use optional chaining (`?.`) and nullish coalescing (`??`) instead of manual null checks.
- Imports must be organized: Node built-ins → third-party → internal (relative paths), each group separated by a blank line.
- No unused imports. Remove them before committing.
- Async functions must always `await` their Promises or explicitly return the Promise — never fire-and-forget in test code.
