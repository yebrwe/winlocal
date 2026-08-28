# 윈로컬 Design System

## 0. Research Log

- Embedded refs: shortlisted theverge (editorial timeline), notion (document UI), mintlify (dev docs) → picked **minimalist-skill** + **theverge** because this is a reading publication, not a SaaS landing. Verge contributes timeline rail, mono uppercase kickers, color-as-elevation, tight display vs relaxed body. Minimalist contributes warm bone canvas, no Inter/Lucide/gradients/heavy shadows, Pretendard+mono, 1px `#EAEAEA` rules.
- Lazyweb: 2 queries (`developer technical blog article reading page`, `editorial tech magazine homepage feed`), 12 result rows, 2 screens downloaded (FT tech-asia, Colossyan blog). Grammar taken: **one featured story + remaining chronological feed**, kicker/title/date/excerpt as the card (not a 3-col thumbnail SaaS grid). FT sidebar “most read” is dropped — a one-person notebook does not fake social proof.
- Imagen drafts: skipped — no imagegen tool in this session’s tool list.
- Skipped lanes: imagen (no generator). ui-ux-db CLI not run (Astro stack lookup would default Inter/blue; conflicts with Layer A bans).

Locked direction: Windows 터미널 노트를 활자 잡지에 붙인다. Signature material is ivory newsprint plus a 3px CRT-green prompt rule on the reading column. Color story is ink charcoal on bone, one phosphor-green drop. The memorable moment is the article list stacked on a git-log rail with mono timestamps.

## 1. Atmosphere & Identity

A quiet command log printed on warm paper. It should feel like opening a lab notebook next to a `C:\` prompt — not a startup marketing site, not a dark OLED console. The signature is the **prompt rule**: a vertical phosphor-green bar on the left of every reading column, with `PS>`-style mono metadata (date, category) sitting on that rail. Surfaces are bone, ink, and one green cursor. Depth is hairline borders and a faint paper grain, never drop shadows.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/primary | --surface-primary | #F7F6F3 | #161513 | Page canvas (warm bone / warm black) |
| Surface/secondary | --surface-secondary | #EFEDE7 | #1E1C1A | Code wells, kbd, inset panels |
| Surface/elevated | --surface-elevated | #FFFEFA | #24211E | Cards sitting on canvas |
| Text/primary | --text-primary | #2F3437 | #F4F1EA | Headlines, body (never #000) |
| Text/secondary | --text-secondary | #6B6B66 | #A39E94 | Bylines, captions |
| Text/tertiary | --text-tertiary | #8A8680 | #6F6B64 | Disabled, legal small print |
| Border/default | --border-default | #EAEAEA | #3A3732 | Cards, dividers (minimalist 1px) |
| Border/subtle | --border-subtle | #F0EEE8 | #2A2724 | Soft separations |
| Accent/primary | --accent-primary | #2F6F4E | #7DDAA4 | Prompt rule, links, focus. Adapted from Verge mint — desaturated so it can sit on paper without vibrating |
| Accent/hover | --accent-hover | #245A3F | #9BE7B8 | Link hover (not Verge #3860be — that blue is brand-specific) |
| Accent/pale | --accent-pale | #EDF3EC | #24352C | Tag fill (minimalist pale green) |
| Accent/pale-text | --accent-pale-text | #346538 | #B7D9C0 | Tag text |
| Status/success | --status-success | #346538 | #7DDAA4 | Confirmations |
| Status/warning | --status-warning | #956400 | #E2B344 | Cautions |
| Status/error | --status-error | #9F2F2D | #E07A76 | Errors |
| Status/info | --status-info | #1F6C9F | #7EB6D6 | Informational |

### Rules
- Accent is the prompt rule, links, focus rings, and category tags. Never a hero wash.
- No gradients. No neon mint `#3cffd0` (Verge brand). No ultraviolet.
- Never introduce a color not in this table.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | clamp(2rem, 4vw, 2.75rem) | 800 | 1.2 | -0.02em | Home masthead, post title |
| H1 | 2rem | 700 | 1.25 | -0.015em | Page titles |
| H2 | 1.375rem | 650 | 1.35 | -0.01em | Article h2 |
| H3 | 1.125rem | 650 | 1.4 | 0 | Article h3, card titles |
| Body/lg | 1.125rem | 400 | 1.7 | 0 | Lead |
| Body | 1.0625rem | 400 | 1.7 | 0 | Reading body (CJK needs ≥17px) |
| Body/sm | 0.875rem | 400 | 1.5 | 0 | Footer, form help |
| Caption | 0.75rem | 500 | 1.4 | 0.06em | Dates, bylines |
| Overline | 0.6875rem | 600 | 1.3 | 0.12em | UPPERCASE kickers, timestamps (Verge mono register) |

### Font Stack
- Primary: `Pretendard`, `Apple SD Gothic Neo`, `Malgun Gothic`, sans-serif — Hangul body and display. Inter/Roboto/Open Sans banned.
- Mono: `JetBrains Mono`, `D2Coding`, `ui-monospace`, monospace — timestamps, kbd, code, `PS>` labels.
- No third family. Serif skipped: Hangul titles in Pretendard ExtraBold are more honest than Playfair on Korean.

### Rules
- Body never below 14px; reading column uses Body (17px).
- Mono labels are UPPERCASE with open tracking (Verge), except inline code.
- Max measure for prose: ~66ch.

## 4. Spacing & Layout

### Base Unit
All spacing derives from a base of **4px**.

| Token | Value | Usage |
|-------|-------|-------|
| --space-1 | 4px | Icon-to-label |
| --space-2 | 8px | Inline groups, rail gap |
| --space-3 | 12px | Tag padding |
| --space-4 | 16px | Compact card inner |
| --space-5 | 20px | Nav inner |
| --space-6 | 24px | Card padding |
| --space-8 | 32px | Between feed items |
| --space-10 | 40px | Section inner |
| --space-12 | 48px | Page header to content |
| --space-16 | 64px | Major section |
| --space-20 | 80px | Home masthead vertical |

### Grid
- Max reading width: 42rem (prose). Max shell: 72rem.
- Breakpoints: sm 640px, md 768px, lg 1024px.
- Mobile margin: 16px. Desktop margin: 48px.
- Article column has a 3px prompt rule (`--accent-primary`) inset 0; content padded `--space-6` from the rule.
- Asymmetric: more padding below titles than above — notebook rhythm.

## 5. Components

### SiteHeader
- **Structure**: wordmark `윈로컬` left; nav links 노트 / 소개 / 문의 right. No hamburger until `<768px` (then a details/summary menu, no JS).
- **Variants**: default
- **Spacing**: `--space-5` vertical, shell max-width
- **States**: link default/hover/focus; open mobile menu
- **Accessibility**: skip link; `aria-current="page"`; focus ring 2px accent
- **Motion**: underline via `transform: scaleX` 150ms ease-out, reduced-motion off
- **Layout**: cluster, sticky with bone canvas (no blur glass)

### PromptRail (feed item)
- **Structure**: left 3px rule + mono timestamp/kicker; right title + dek
- **Variants**: default, featured (larger title, pale tag)
- **Spacing**: `--space-8` between items
- **States**: default, hover (title color → accent-hover), focus-within
- **Accessibility**: whole card is one link; title is the accessible name
- **Motion**: none on the rail; title color 150ms
- **Layout**: sidebar (rail | body)

### Tag
- **Structure**: `<span class="tag">`
- **Variants**: category
- **Spacing**: `--space-1` `--space-3`
- **States**: default only (non-interactive) or link hover
- **Accessibility**: not a button
- **Motion**: none
- **Layout**: cluster

### Button
- **Structure**: `<a>` or `<button>`
- **Variants**: primary (ink fill, bone text), ghost (hairline)
- **Spacing**: 10px 16px; radius 6px (not pill — minimalist ban on rounded-full large controls)
- **States**: default, hover (`#333` shift), active `scale(0.98)`, focus, disabled
- **Accessibility**: 44px min height on touch
- **Motion**: 150ms color + scale
- **Layout**: cluster

### Kbd
- **Structure**: `<kbd>`
- **States**: default
- **Spacing**: 2px 6px; radius 4px; 1px border
- **Accessibility**: visible text
- **Layout**: cluster

### Field (contact)
- **Structure**: label + input/textarea
- **States**: default, focus (border accent), error (status-error border + text)
- **Spacing**: `--space-3` inner
- **Accessibility**: label `for`; error `aria-describedby`
- **Layout**: stack

### PostProse
- **Structure**: article body
- **States**: n/a
- **Spacing**: vertical rhythm `--space-6` between blocks
- **Accessibility**: heading order h1→h2→h3; code blocks have text, not screenshots-only
- **Layout**: stack, max 66ch

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | 150ms | ease-out | Link color, button press |
| Standard | 200ms | ease-in-out | Mobile nav open |

### Rules
- Only `transform` and `opacity`.
- `prefers-reduced-motion: reduce` disables non-essential motion.
- No scroll-jacking, no hero blob, no staggered 80ms cascade on the whole feed (that reads as marketing). Feed is static.

## 7. Depth & Surface

Strategy: **borders-only** + paper grain.

| Type | Value | Usage |
|------|-------|-------|
| Default | 1px solid var(--border-default) | Cards, kbd, inputs |
| Prompt | 3px solid var(--accent-primary) | Reading column left rule |

Grain: `repeating-radial-gradient` at 4% opacity on `--surface-primary` only. No box-shadow. Color (the green rule) is elevation, from Verge, transplanted onto paper.

## 8. Accessibility Constraints & Accepted Debt

### Constraints
- WCAG 2.2 AA — contrast floor 4.5:1 body / 3:1 large. Accent green `#2F6F4E` on bone `#F7F6F3` is for the 3px rule and 17px+ links, not 12px text.
- Visible 2px focus ring (`--accent-primary`) on every interactive element.
- Full keyboard reachability. Mobile nav is `<details>` so it works without JS.
- `prefers-reduced-motion` respected.
- Korean: `lang="ko"`, hangul line-break `word-break: keep-all` on titles only.

### Personas
- Primary: Windows에서 도구가 안 되는 한국 개발자. Task: 노트 목록 → 글 읽고 명령 복사.
- Secondary: 애드센스 심사 크롤러. Task: view-source에 본문 문단이 있어야 함 (SSG, no CSR).

### Accepted Debt
| Item | Location | Why accepted | Owner / Exit |
|------|----------|--------------|--------------|
| Contact uses mailto:crazyfou34@gmail.com (no server form) | contact page | Enough for local and AdSense contact signal; Formspree optional later | User, if mailto clients fail |
| Public identity is pen name 해피 | about | User chose pen name; real legal name not published | User, if reviewer asks for stronger identity |
| Primitive showcase is `/design` and not linked in public nav | /design | Review harness, not a publication page | Keep noindex |
