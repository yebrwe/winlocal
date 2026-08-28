---
title: where와 Get-Command는 다른 프로그램을 가리킨다
description: cmd의 where, PowerShell의 Get-Command, bash의 type이  ple 실행 파일을 고르는 규칙이 다릅니다.
pubDate: 2026-08-26
category: 터미널
---

“이 PC에 git이 있나?”를 물을 때 창마다 답이 다릅니다. 명령이 다릅니다.

```cmd
where git
```

```powershell
Get-Command git
```

```bash
type -a git
command -v git
```

`where`는 PATH의 `.exe`를 나열합니다. `Get-Command`는 alias, function, cmdlet, 실행 파일을 다 봅니다. Git Bash의 `type`은 해시와 함수까지 포함합니다.

PowerShell에서 `curl`은 실제 curl이 아니라 `Invoke-WebRequest`의 별칭인 경우가 있습니다. `curl.exe`라고 써야 바이너리입니다. `where curl`과 `Get-Command curl`이 다른 이유입니다.

## 에이전트 로그

에이전트가 `git not found`라고 했는데 `where.exe git`은 파일을 찾으면, 그 세션 PATH가 짧거나 셸이 다릅니다. 진단 명령을 에이전트가 쓴 그 셸에서 다시 치세요. 새 PowerShell 창의 성공은 증거가 아닙니다.

윈로컬 글에서 버전을 적을 때는 가능하면 실행 파일 전체 경로를 같이 적습니다. `v22.17.1`만 적고 어느 `node.exe`인지를 빼면, 나중에 재현이 안 됩니다.
