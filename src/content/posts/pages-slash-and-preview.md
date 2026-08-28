---
title: Cloudflare Pages에 올리면 로컬과 주소가 달라진다
description: trailingSlash와 디렉터리 출력 때문에 /about 이 404가 나고, 커스텀 도메인 전에는 pages.dev로 심사를 넣으면 안 됩니다.
pubDate: 2026-08-24
category: 정적사이트
---

로컬에서 `http://localhost:4321/about`가 열리는데, Pages에 배포하면 404인 경우가 있습니다. Astro 설정과 호스팅의 슬래시 규칙이 다르기 때문입니다.

이 저장소는 `trailingSlash: "never"`와 `build.format: "directory"`입니다. 산출물은 `dist/about/index.html`입니다. 대부분의 정적 호스트는 이 파일을 `/about`과 `/about/` 둘 다로 열어 줍니다. 일부가 `/about`만 허용하거나, 반대로 슬래시를 강제합니다.

## 배포 후 확인할 URL

- `/` — 목록
- `/about` — 소개
- `/privacy` — 방침
- `/notes/git-not-on-path` — 글

하나라도 404면 애드센스 크롤러도 그 페이지를 못 봅니다. 빈 카테고리와 같은 신호입니다.

## pages.dev

배포하면 `something.pages.dev`가 생깁니다. 이 주소로 애드센스를 신청하지 마세요. 커스텀 도메인을 붙이고, `pages.dev`는 본인 도메인으로 넘긴 뒤에만 심사합니다.

로컬 확인은 `bun run preview`로 **빌드 산출물**을 띄웁니다. `astro dev`의 주소와 배포 URL이 같다고 가정하지 마세요.

## 사이트 URL

`astro.config.mjs`의 `site`는 `https://winlocal.kr`입니다. canonical과 사이트맵이 이 값을 씁니다. `pages.dev` 주소로 애드센스를 신청하지 않습니다.
