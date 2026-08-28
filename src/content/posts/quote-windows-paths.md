---
title: 경로에 공백이 있으면 명령이 두 개로 쪼개진다
description: C:\Program Files와 C:\Users\Administrator처럼 공백 있는 경로를 bash와 PowerShell에서 따옴표로 고정하는 방법.
pubDate: 2026-07-11
category: 경로
---

Windows 기본 경로에는 공백이 들어갑니다. `C:\Program Files\Git\cmd`, `C:\Users\Administrator\AppData\Local`. Unix 예제를 그대로 붙이면 셸이 경로를 두 인자로 나눕니다.

```bash
cd /c/Program Files/Git/cmd
# bash: cd: too many arguments
```

에이전트에게 `cd foo && npm install`을 시키면, `foo`에 공백이 있는 순간 실패합니다. 작업 디렉터리를 바꾸는 인자(`workdir`)와 명령을 분리하는 편이 안전합니다.

## bash (Git Bash)

변환 규칙:

| Windows | Git Bash |
|---|---|
| `C:\workspaces\adsense` | `/c/workspaces/adsense` |
| `C:\Program Files\Git\cmd` | `"/c/Program Files/Git/cmd"` |

공백이 있으면 반드시 큰따옴표입니다.

```bash
export PATH="/c/Program Files/Git/cmd:$PATH"
ls "/c/Users/Administrator/AppData/Local"
```

`~`는 `/c/Users/Administrator`로 풀립니다. 한글 계정 이름이면 로케일에 따라 깨질 수 있습니다. 그 경우 짧은 8.3 이름에 의존하지 말고, 프로젝트를 `C:\workspaces`처럼 공백 없는 드라이브 루트 근처에 둡니다. 이 노트들의 작업 루트가 `C:\workspaces`인 이유입니다.

## PowerShell

PowerShell은 공백을 `&` 호출 연산자와 따옴표로 처리합니다.

```powershell
& "C:\Program Files\Git\cmd\git.exe" --version
Set-Location -LiteralPath "C:\workspaces\adsense"
```

`cd C:\Program Files\...`는 파싱 에러입니다. `Set-Location -LiteralPath`는 경로의 `[` `]`도 와일드카드로 해석하지 않습니다.

## npm / bun 스크립트

`package.json`의 스크립트는 cmd.exe가 먼저 받습니다.

```json
"bad": "node C:\\Program Files\\nodejs\\node.exe"
```

이 줄은 깨집니다. 공백 있는 바이너리를 스크립트에 하드코딩하지 말고, PATH의 `node`만 호출하세요.

## 체크리스트

- 프로젝트 경로는 ASCII, 공백 없음, 가능하면 `C:\workspaces\이름`
- CI와 로컬 에이전트에 넘기는 경로는 항상 인용
- `cd a && b` 대신 작업 디렉터리 옵션과 명령을 분리
