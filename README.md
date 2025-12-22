# React interview task — Issue Triage Dashboard (bugfix + performance)

You’ve been given a small existing React app that “mostly works” but contains **serious bugs** and **performance issues**.

## Setup

```bash
yarn
yarn dev
```

## What the app does

- Loads a list of issues (simulated API + latency)
- Search, filter, sort
- Select an issue to see details
- Edit title + status
- Shows derived counts by status

## Your tasks

### 1) Fix two serious bugs

**Bug A — Edits revert / wrong item updated**

- Edit an issue title, save, list does not update until interaction.
- Sometimes the wrong issue gets updated after filtering/sorting.

**Bug B — Fetch loop / request storm**

- Typing in search or toggling filters triggers repeated network requests and CPU spikes.

### 2) Fix performance issues

- Slow typing in search with 5k+ issues
- Unnecessary rerenders across list + details panel
- Derived analytics computed too often

### Bonus

- Fix stale-response race conditions (older request overwrites newer)
- Add basic virtualization (optional)

## Constraints

- Don’t rewrite the entire app. Prefer targeted fixes.
- Keep TypeScript strict.
- Keep UI roughly the same.
