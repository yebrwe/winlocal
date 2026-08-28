---
title: 파일이 사용 중이라 dist를 지우지 못한다
description: EBUSY와 “다른 프로세스가 사용 중”은 보통 남은 node.exe, 미리보기 서버, 백신입니다.
pubDate: 2026-08-18
category: 패키지
---

`bun run build`를 다시 돌리거나 `node_modules`를 지울 때:

```
EBUSY: resource busy or locked, rmdir 'dist'
```

Windows는 실행 중인 프로세스가 연 디렉터리를 지우지 못합니다. Unix는 지워지고 inode만 남습니다. 여기선 빌드가 실패합니다.

## 누가 잡고 있는지

```powershell
Get-Process node, bun -ErrorAction SilentlyContinue | Format-Table Id, Path
```

흔한 범인:

- 아까 켠 `astro dev` / `astro preview`
- 에디터의 TypeScript 서버 (`node.exe` 여러 개)
- Defender 실시간 검사 (`MsMpEng.exe`) — 설치 중일 때
- 탐색기로 `dist`를 열어 둔 미리보기

개발 서버를 끄지 않은 채 빌드하면 `dist` 잠금이 거의 재현됩니다. 터미널에서 `Ctrl+C`로 먼저 끊습니다.

안 꺼지면:

```powershell
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
```

에디터까지 죽습니다. 저장하지 않은 파일이 있으면 먼저 저장하세요.

## 에이전트

에이전트가 백그라운드로 `astro dev`를 띄우고 이어서 `rm dist`를 하면 로컬에서만 실패합니다. 빌드 전에 미리보기 프로세스를 종료하는 순서를 고정하세요. 이 저장소는 `bun run build`가 `dist`를 다시 씁니다. 창이 하나면 충돌이 없습니다. 창이 두 개면 거의 잠깁니다.
