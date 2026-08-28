---
title: bun과 npm이 한 Windows에 같이 있을 때
description: bun 1.2와 npm 10이 동시에 잡히는 환경에서 어떤 락파일을 기준으로 삼을지.
pubDate: 2026-07-18
category: 패키지
---

이 PC에서 버전은 이렇게 찍혔습니다.

```
node  v22.17.1
npm   10.9.2
bun   1.2.19
```

둘 다 있으면 “아무거나 설치”가 사고입니다. `npm install`은 `package-lock.json`을 만들고, `bun install`은 `bun.lock`을 만듭니다. 둘을 커밋하면 CI가 다른 트리를 받습니다.

## 무엇을 기준으로 할지

정적 사이트(Astro)만 돌릴 계획이면 ** bun**이 설치·실행이 빠릅니다. 다만 Cloudflare Pages 빌드 이미지는 기본이 npm인 경우가 많습니다. Pages 프로젝트 설정에서 패키지 매니저를 bun으로 고정하지 않으면, 로컬은 bun인데 배포는 npm이라 락이 어긋납니다.

로컬 전용 단계에서는 하나만 고르세요.

```bash
bun install
bun run dev
bun run build
```

`node_modules/.bin`은 bun이 만든 심링크와 npm이 만든 `.cmd` 래퍼가 섞일 수 있습니다. Windows에서 `astro`를 그냥 치면, PATH 앞쪽에 있는 쪽의 래퍼가 이깁니다.

```powershell
Get-Command astro | Format-List *
```

`Source`가 `...\node_modules\.bin\astro.bunx`인지 `astro.cmd`인지 보면 됩니다.

## npm을 써야 하는 순간

- 팀 문서가 `npm ci`만 허용
- 호스팅 빌드가 bun을 모름
- `optionalDependencies`의 Windows 바이너리가 bun에서 빠지는 패키지

그때는 bun 락을 지우고 npm만 남깁니다.

```powershell
Remove-Item bun.lock -ErrorAction SilentlyContinue
npm install
```

## 이 저장소

윈로컬 로컬 개발은 bun으로 맞춥니다. `package.json`의 스크립트는 `astro`만 호출하므로 bun이든 npm이든 `run`은 됩니다. 락파일은 하나여야 합니다.
