---
title: 보기 소스에 글이 없으면 크롤러도 글을 못 본다
description: Next.js 클라이언트 렌더와 Astro SSG를 같은 본문으로 비교해, 초기 HTML에 문단이 남는 쪽만 남깁니다.
pubDate: 2026-08-15
category: 정적사이트
---

광고·검색 봇은 브라우저가 아닙니다. JavaScript를 실행하지 않거나, 실행을 미룹니다. 페이지를 열었을 때 글이 보여도, **보기 소스**에 `<p>`가 없으면 그 글은 없는 것과 같습니다.

Next.js App Router에서 데이터를 `useEffect`로 가져오면 초기 HTML은 대략 이런 껍데기입니다.

```html
<div id="__next"></div>
<script src="/_next/static/chunks/..."></script>
```

이 사이트는 Astro로 빌드합니다. `bun run build` 후 `dist/index.html`을 열어보면 목록 제목이 HTML에 박혀 있습니다. 자바스크립트를 꺼도 글이 남습니다.

## 확인 방법

1. `bun run build`
2. `dist/notes/git-not-on-path/index.html`을 에디터로 연다
3. `bash는 있는데` 같은 본문 문자열이 파일 안에 있는지 찾는다

없으면 SSG가 아닙니다. 있으면 크롤러가 같은 바이트를 받습니다.

개발 서버(`astro dev`)는 확인용이 아닙니다. 개발 서버 HTML은 변환 스크립트가 많습니다. **빌드 산출물**만 믿으세요.

## SPA를 꼭 써야 할 때

대시보드처럼 로그인 뒤에만 의미가 있는 UI는 CSR이어도 됩니다. 공개 글로 심사를 받는 페이지는 CSR을 쓰지 않습니다. 이 저장소의 페이지는 `.astro`와 Markdown뿐이고 React 아일랜드가 없습니다.

Cloudflare Pages에 올릴 때도 출력은 `dist/` 정적 파일입니다. 서버 런타임이 없어서 잠자기도 없습니다.
