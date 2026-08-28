# 윈로컬

Windows에서 로컬 개발 도구가 깨지는 지점만 적는 정적 사이트. Astro SSG, React 없음.

## 왜 이 주제인가

macOS 문서가 기본인 개발 글은 Windows에서 자주 거짓입니다. 이 환경(`win32`, `C:\workspaces`, Git Bash에 `git` 없음)에서 재현한 명령만 올립니다. 제휴 나열·YMYL이 아니라서 애드센스 심사에도 비교적 안전합니다.

## 로컬

```bash
bun install
bun run dev
```

브라우저: http://localhost:4321

```bash
bun run build
```

`dist/` 가 Cloudflare Pages에 올릴 산출물입니다. 심사 전에 `dist/notes/*/index.html`을 열어 본문 문단이 소스에 있는지 확인하세요.

## 공개 주소

- 도메인: https://winlocal.kr
- 문의: crazyfou34@gmail.com
- 필명: 해피

Cloudflare Pages에 올린 뒤 Custom domain에 `winlocal.kr`과 `www.winlocal.kr`을 넣고, apex로 통일하세요. `*.pages.dev`로 애드센스 신청하지 마세요.

## 디자인

토큰과 규칙은 `DESIGN.md`. 프리미티브 하니스는 `/design` (noindex).
