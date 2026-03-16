# Team Deployment Flow (GitHub -> AWS)

This project supports **multiple developers** by using a simple branch + PR + environment flow.

## Branch strategy

- `main` = production
- `staging` = pre-production testing
- feature branches = developer work (e.g. `feature/login-page`)

## Day-to-day team workflow

1. Create a feature branch from `staging`.
2. Open a PR into `staging`.
3. GitHub Actions runs build/test on the PR.
4. Merge PR when checks pass.
5. Push/merge to `staging` triggers **staging deployment**.
6. After staging verification, open PR from `staging` to `main`.
7. Merge to `main` triggers **production deployment**.

## Required GitHub settings (important for teams)

### 1) Branch protection

Set branch protection on both `staging` and `main`:
- Require a pull request before merging.
- Require status checks to pass before merging (`Deploy to AWS / build`).
- Require at least 1 approval.
- Prevent force pushes.

### 2) Environments

Create two GitHub Environments:
- `staging`
- `production`

Recommended:
- Add required reviewers for `production` so production deploys need approval.

### 3) Repository/Environment secrets

For `staging` environment:
- `STAGING_HOST`
- `STAGING_USER`
- `STAGING_SSH_KEY`
- `STAGING_PORT` (optional, default 22)

For `production` environment:
- `PROD_HOST`
- `PROD_USER`
- `PROD_SSH_KEY`
- `PROD_PORT` (optional, default 22)

## AWS setup checklist

On each EC2 server:
- Install Node.js + npm
- Install PM2 globally
- Ensure app folder exists:
  - staging: `/var/www/cp3407-staging`
  - production: `/var/www/cp3407-production`
- Ensure runtime `.env` is present in the app folder with:
  - `DB_HOST`
  - `DB_PORT`
  - `DB_NAME`
  - `DB_USER`
  - `DB_PASS`
  - `PORT`

For RDS/MySQL:
- Allow DB inbound only from EC2 security groups.
- Use separate DB/schema names for staging and production.

## What the workflow now does

- Runs build/test on PRs into `staging` or `main`.
- Deploys only on push events:
  - push to `staging` -> staging server
  - push to `main` -> production server

This keeps collaboration safe while still allowing automatic deployments.
