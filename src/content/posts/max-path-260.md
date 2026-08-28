---
title: 경로가 260자를 넘으면 npm이 엉뚱한 에러를 낸다
description: MAX_PATH 한도에 걸리면 ENOENT가 나고, 긴 node_modules 트리가 Windows에서 특히 잘 터집니다.
pubDate: 2026-08-04
category: 경로
---

프로젝트 루트가 `C:\Users\Administrator\Documents\something-very-long\...`이면, `node_modules` 안의 상대 경로가 합쳐져 **260자**를 넘습니다. 그때 에러는 “경로가 길다”가 아니라 종종 이것입니다.

```
ENOENT: no such file or directory, open '...node_modules\...'
```

또는 압축 해제 중 `EINVAL`. 파일은 탐색기에 보이는데 Node만 못 읽습니다. 긴 경로 지원이 꺼진 Windows API를 쓰기 때문입니다.

## 한도 보기

```powershell
(Get-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name LongPathsEnabled).LongPathsEnabled
```

`1`이면 OS는 긴 경로를 허용합니다. `0`이거나 키가 없으면 한도가 살아 있습니다. 켜는 것은 관리자 권한과 재부팅이 필요할 수 있어, 회사 PC에서는 못 만집니다.

## 우회

코드를 고치기 전에 경로를 줄입니다.

- 저장소를 `C:\workspaces\adsense`처럼 얕게 둔다. 이 노트가 여기 있는 이유이기도 합니다.
- `Documents\프로젝트이름-매우길게`를 피한다
- npm 대신 bun/pnpm의 플랫한 스토어를 쓰면 중첩이 줄어든다

`\\?\C:\workspaces\...` 접두사는 일부 도구만 이해합니다. `git`과 `astro`에 붙이면 오히려 깨집니다.

## 확인

같은 레포를 짧은 경로로 복사해 `bun install`이 통과하면 MAX_PATH입니다. 의존성 버그로 고치려다 시간을 쓰지 마세요.
