# Repository Interaction Guide

This guide defines the team workflow for working safely and consistently in this repository.

## 1) Branch model
- `main`: production-ready code only.
- `staging`: integration/testing branch for team work.
- `feature/<short-name>`: one feature/user story per branch.

Use this flow:
1. Create feature branch from `staging`.
2. Open PR from feature branch into `staging`.
3. Test on staging.
4. Merge `staging` into `main` when ready.

## 2) First-time setup
```bash
git clone <repo-url>
cd cp3407-project
git remote -v
```

If you also track upstream:
```bash
git remote add upstream <upstream-url>
git fetch --all --prune
```

## 3) Daily start routine
```bash
git switch staging
git fetch origin
git pull origin staging
git status
```

Then create your feature branch:
```bash
git switch -c feature/<user-story-or-task>
```

## 4) Commit routine (small and focused)
```bash
git status
git add <files>
git commit -m "<clear message>"
git push -u origin feature/<user-story-or-task>
```

Rules:
- Commit only related files.
- Keep one responsibility per branch.
- Avoid mixing unrelated fixes in one PR.

## 5) Pull request routine
Feature to staging:
- Base: `staging`
- Compare: `feature/<name>`
- Include summary: what changed, why, and how tested.

Staging to main:
- Base: `main`
- Compare: `staging`
- Only after staging validation is complete.

## 6) Keeping feature branches up to date
```bash
git fetch origin
git switch staging
git pull origin staging
git switch feature/<name>
git rebase staging
```

If your team prefers merge commits instead of rebase:
```bash
git merge staging
```

## 7) If `git pull` says branches diverged
Choose one approach explicitly:

- Rebase:
```bash
git pull --rebase origin staging
```

- Merge:
```bash
git pull --no-rebase origin staging
```

Set a default to avoid repeat prompts:
```bash
git config --global pull.rebase true
```
or
```bash
git config --global pull.rebase false
```

## 8) Local app run pattern
Run app through Node/Express (not Live Server for API routes):
```bash
cd website-code
node server.js
```

Open:
- `http://localhost:3000` (frontend + backend routes)

## 9) Database workflow (local)
Use schema + seed scripts in `website-code`:
```bash
cd website-code
mysql -u root -p<password> -e "DROP DATABASE IF EXISTS cp3407; CREATE DATABASE cp3407;"
mysql -u root -p<password> cp3407 < Database-Schema.sql
mysql -u root -p<password> cp3407 < seeders/example_data_25_tables.sql
```

## 10) Repo hygiene rules
- Do not commit `.env` files.
- Do not commit `node_modules/`.
- Keep user stories in `user_stories/customer/` and `user_stories/restaurant/`.
- Use priority values in increments of 10 (`10, 20, 30, 40, 50`).
- Keep PRs small enough to review quickly.

## 11) Useful checks before pushing
```bash
git status
git diff --name-only
git branch -vv
```

If everything looks correct, push and open PR.
