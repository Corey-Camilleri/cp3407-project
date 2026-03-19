# Copilot Instructions for FeedMe (CP3407/CP5507 Project)

## Project Overview
- **FeedMe** is a food ordering and delivery platform (like FoodPanda) built for a university project.
- The main deliverable is a GitHub Pages site (`/docs`) with supporting code in `website-code/`.
- The project is managed in iterations, with requirements, design, and implementation tracked in markdown files and GitHub Issues/PRs.

## Architecture & Key Components
- **Frontend:** Static HTML/CSS/JS in `website-code/` (e.g., `index.html`, `style.css`).
- **Backend:** Node.js/Express server (`website-code/server.js`) with modular features in `website-code/features/`.
- **Database:** Schema and seed data in `website-code/Database-Schema.sql` and `website-code/seeders/`.
- **ORM Models:** Sequelize models in `website-code/models/` (one file per table/entity).
- **Docs:** All project documentation in `docs/` (requirements, design, testing, etc.).

## Developer Workflows
- **Run server:** `node website-code/server.js` (no build step; static + server JS)
- **Seed DB:** Use SQL in `website-code/seeders/` or run `generate_example_data.js` for mock data.
- **Docs:** Edit markdown in `docs/` and `user_stories/` — these are published via GitHub Pages.
- **Testing:** Manual testing is primary; see `docs/testing.md` for process. No automated test suite by default.
- **Deployment:** See `docs/deployment-github-aws.md` for GitHub Pages and AWS deployment steps.

## Project-Specific Conventions
- **Models:** Each DB table has a matching JS model in `website-code/models/` (Sequelize style).
- **Features:** Business logic is modularized in `website-code/features/` (one file per feature/user story).
- **Docs-first:** Requirements, design, and decisions are always documented in markdown before code changes.
- **Iteration artifacts:** Each iteration has a summary file (e.g., `iteration_1.md`) and is tracked in the backlog.
- **Meeting notes:** All meetings/decisions are logged in `docs/meetings/` and `decisions.md`.

## Integration & Data Flow
- **Frontend ↔ Backend:** Static HTML/JS calls backend endpoints in `server.js` (REST-style, not SPA).
- **Backend ↔ DB:** Sequelize models in `models/` interact with the SQL DB defined in `Database-Schema.sql`.
- **Seeders:** Use SQL or JS to populate the DB for local/dev testing.

## Key Files & Directories
- `website-code/server.js` — Express server entry point
- `website-code/features/` — Modular business logic (e.g., `place-order.js`, `view-receipt.js`)
- `website-code/models/` — Sequelize models (one per DB table)
- `website-code/Database-Schema.sql` — DB schema
- `website-code/seeders/` — Example/mock data
- `docs/` — All project documentation
- `user_stories/` — User stories (one file per story)

## Examples
- To add a new feature: create a JS file in `website-code/features/`, update routes in `server.js`, and document in `docs/`.
- To update DB: edit `Database-Schema.sql` and matching model in `models/`.
- To document a decision: add to `decisions.md` or `docs/meetings/`.

---
For more, see `README.md`, `docs/index.md`, and `docs/design.md`.
