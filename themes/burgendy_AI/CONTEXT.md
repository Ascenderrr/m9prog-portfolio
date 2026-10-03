# burgendy_AI — CONTEXT.md

Glossary for the burgendy_AI WordPress theme (Dutch portfolio, PHP templates + vanilla JS/CSS).

## Glossary

- **project-card**: teaser tile on the front page (`front-page.php`, `article.project-card` inside `.project-grid`). Body = `div.project-card__body` with eyebrow (type), `h3` (title), `p` (description), then the card links div. Links order is fixed: `Bekijk project` (internal) → `GitHub` (external, optional) → `Bekijk Website` (external, optional, own line via `project-card__link--website`).
- **project-row**: full-width entry on the Projecten overview (`page-projects.php`, `article.project-row` inside `.project-list`). Content = `div.project-row__content` with eyebrow (type), `h2` (title), `p` (description), then `div.tag-list` (skills) + one `<p>` per external link (`Bekijk op GitHub`, `Bekijk Website`).
- **eyebrow**: small caps kicker line (`p.eyebrow`) above headings. Used for section kickers (`Portfolio 2026`, `Geselecteerd werk`) and per-project type labels.
- **hero / page-hero**: `hero` = front-page masthead (`section.hero`, headline + actions + profile photo + scroll hint); `page-hero` = interior-page masthead (`section.page-hero`, e.g. Projectoverzicht title + intro).
- **portfolio-shell**: `#portfolio-content.portfolio-shell` wrapper div on the front page that groups hero + marquee + sections for styling/JS.
- **anchor convention (`sanitize_title`)**: deep links to a project row use `home_url('/projecten/') . '#' . sanitize_title($project['title'])` (e.g. `#roomus-website`). Card `Bekijk project` anchors and row `article id` must use the same `sanitize_title($project['title'])` value or anchors break.
- **asset-version convention**: `burgendy_ai_assets()` pins versions in `functions.php` (`burgendy-ai-style` `1.5.1`, `burgendy-ai-script` `2.5.0`). Cache-busting bumps are owned by another track — do not change versions in code-health groups.
- **project-links seam**: the two helpers in `functions.php` that own all project link/tag markup — `burgendy_ai_project_card_links($project)` (card `div.project-card__links`) and `burgendy_ai_project_row_links($project)` (row `div.tag-list` + GitHub/Website `<p>` links). Templates must call these instead of inlining the markup.

## Escaping / link rules (must stay identical)

- Internal anchor: `esc_url(home_url('/projecten/'))` + `#` + `esc_attr(sanitize_title($project['title']))`. No `target`/`rel`.
- External links (`github`, `website` URLs from `burgendy_ai_projects()`): `esc_url(...)` + `target="_blank" rel="noopener"`.
- Text/attrs: `esc_html` for type/title/description/skills, `esc_attr` for `alt` and anchor fragment.
- Link order: `Bekijk project`, `GitHub` / `Bekijk op GitHub`, `Bekijk Website`. Website renders on its own line (card: `project-card__link--website` class; row: own `<p>`).

## ADR-001: projects as hardcoded PHP array vs WP custom post type

- **Status:** Accepted.
- **Decision:** keep projects as a hardcoded PHP array in `burgendy_ai_projects()` (`functions.php`); do NOT convert to a custom post type in this group.
- **Reason:** three projects with fixed Dutch copy (Roomus Website, Muse Experience, Arcade Game Controller); a CPT adds admin UI, queries, and migration cost with no visitor benefit. Helpers (`burgendy_ai_project_card_links`, `burgendy_ai_project_row_links`, `burgendy_ai_project_image`) already centralise rendering so a later CPT switch only changes the data source.
- **Reversibility:** fully reversible — replace the array return with a `WP_Query` over a CPT and keep the same helper interfaces; templates need no changes.

## Issue-tracker note

- Repo remote is `github.com/Ascenderrr/m9prog-portfolio` — use **GitHub issues** for tracking.
- There are **no local tracker files** (no `TODO.md`, `.omo/`, or backlog files in the theme). Do not create any.

## Named changes log

- **Group "Code health" (2026-10-02):** extract duplicated project link/tag markup into a single template seam. Zero visual change.
  - `functions.php`: appended `burgendy_ai_project_card_links()` (card `div.project-card__links`: `Bekijk project` internal anchor + optional `GitHub` + optional `Bekijk Website` with `project-card__link--website`) and `burgendy_ai_project_row_links()` (row `div.tag-list` skills loop + optional `Bekijk op GitHub` `<p>` + optional `Bekijk Website` `<p>`), both echo-only (no surrounding whitespace) with `esc_url`/`esc_attr`/`esc_html` preserved.
  - `front-page.php`: card body inline links div replaced with `<?php burgendy_ai_project_card_links($project); ?>`.
  - `page-projects.php`: row content inline `div.tag-list` + GitHub/Website `<p>` blocks replaced with `<?php burgendy_ai_project_row_links($project); ?>`.
  - Revert: delete the two helpers from `functions.php` and restore the inline blocks from git (`git diff` of this group shows only those three hunks).
