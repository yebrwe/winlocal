---
title: 심링크가 막히면 bun과 pnpm이 이상하게 실패한다
description: 개발자 모드가 꺼진 Windows에서 심볼릭 링크 생성 권한이 없어 node_modules가 깨집니다.
pubDate: 2026-08-11
category: 패키지
---

bun과 pnpm은 `node_modules`에 심볼릭 링크를 많이 씁니다. Windows는 기본적으로 심링크 생성을 관리자에게만 줍니다. 그때 설치가 끝나 보여도 실행하면 모듈을 못 찾거나, 설치 중간에 `EPERM`이 납니다.

## 권한 확인

설정 → 개인 정보 및 보안 → 개발자용 → **개발자 모드**가 켜져 있는지 봅니다. 켜면 관리자가 아니어도 심링크를 만들 수 있습니다.

그룹 정책으로 막힌 PC는 개발자 모드가 회색입니다. 그때는 npm(중첩 복사)으로 설치하거나, 관리자 터미널에서 한 번 `bun install`합니다. 관리자 창에서 만든 파일의 소유자가 Administrators라, 이후 일반 창에서 삭제가 안 될 수 있습니다.

## 증상

- `bun install` 로그에 `symlink` / `EPERM`
- `node_modules/.bin/astro`가 0바이트이거나 깨진 바로가기
- 탐색기에서 `node_modules` 폴더를 지울 때 “관리자 권한 필요”

지울 때는 일반 PowerShell이 아니라 설치한 그 권한으로 지웁니다.

```powershell
Remove-Item -Recurse -Force .\node_modules
```

실패하면 잠근 프로세스를 먼저 끊습니다. 다음 글에서 `EBUSY`를 다룹니다.

## 이 프로젝트

윈로컬은 bun을 씁니다. 로컬에서 설치가 권한 에러면 개발자 모드부터 보세요. Node 버전을 의심하기 전에 링크 권한입니다.
