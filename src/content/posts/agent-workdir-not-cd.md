---
title: 에이전트에게 cd 시키지 말고 workdir을 넘겨라
description: Windows에서 코딩 에이전트가 cd && command를 쓰면 공백 경로와 셸 종류 때문에 실패합니다.
pubDate: 2026-08-22
category: 에이전트
---

로컬 코딩 에이전트는 명령을 한 줄 문자열로 보내는 경우가 많습니다.

```bash
cd C:\workspaces\adsense && bun run build
```

Windows에서 이 줄은 여러 겹으로 깨집니다.

- `cd`의 인자가 공백에서 잘린다
- 셸이 PowerShell인데 `&&`를 옛 버전이 모른다 (5.1)
- 에이전트가 Git Bash를 연 줄 알고 `/c/workspaces`를 cmd에 넣는다

그래서 도구 쪽에는 **작업 디렉터리 파라미터**와 **명령**을 분리하는 인터페이스가 있습니다. 명령은 `bun run build`만, 디렉터리는 `C:\workspaces\adsense`만.

## PowerShell 5.1

```powershell
cd C:\workspaces\adsense; bun run build
```

`&&` 대신 `;`입니다. PowerShell 7은 `&&`를 지원합니다. 에이전트가 어느 호스트인지 모르면 `;`가 더 안전합니다.

## 실패를 로그로 남기기

에이전트가 “빌드 실패”라고만 보고하고 종료 코드를 숨기면 디버깅이 안 됩니다. 로컬에서 같은 명령을 사람이 재현할 때:

```powershell
Set-Location -LiteralPath "C:\workspaces\adsense"
bun run build
echo $LASTEXITCODE
```

bash면 `echo $?`.

이 저장소를 에이전트에게 맡길 때도 루트는 `C:\workspaces\adsense`로 고정하세요. 홈 디렉터리에서 `astro build`를 돌리면 다른 `package.json`을 집어 올 수 있습니다.
