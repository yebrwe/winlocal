---
title: bash는 있는데 git 명령이 없다
description: Windows에서 /usr/bin/bash는 살아 있고 git은 PATH에 없는 상태를 재현하고 고칩니다.
pubDate: 2026-07-03
category: 터미널
---

이 머신에서 `node -v`는 `v22.17.1`이 나오고, `bash`도 됩니다. 같은 셸에서 `git -v`를 치면 이렇게 떨어집니다.

```
/usr/bin/bash: line 1: git: command not found
```

macOS 문서의 “터미널을 열고 git을 입력하세요”는 여기서 거짓입니다. Git이 설치돼 있어도 **Git Bash의 PATH와 시스템 PATH가 다릅니다.**

## 무엇이 설치된 건지

Git for Windows를 설치하면 보통 세 개가 생깁니다.

- `C:\Program Files\Git\cmd\git.exe` — cmd/PowerShell용
- `C:\Program Files\Git\bin\bash.exe` — Git Bash
- `C:\Program Files\Git\usr\bin\` — Unix 도구들 (`ls`, `bash`)

지금 환경은 `bash`가 `/usr/bin/bash`로 잡히면서도 `git` 실행 파일은 PATH에 없습니다. 즉 **Bash 호환 셸만 있고 Git 본체는 없거나, PATH가 잘렸습니다.**

PowerShell에서 확인:

```powershell
Get-Command git -ErrorAction SilentlyContinue
$env:PATH -split ';' | Select-String -Pattern 'Git'
```

아무 줄도 안 나오면 Git이 없거나, 설치 경로가 PATH에 없습니다.

## 고치는 순서

1. [Git for Windows](https://git-scm.com/download/win)를 설치한다. 설치 화면에서 **Git from the command line and also from 3rd-party software**를 고른다. 이 옵션이 `Git\cmd`를 시스템 PATH에 넣습니다.
2. 이미 설치된 경우: 환경 변수 PATH에 `C:\Program Files\Git\cmd`를 **앞쪽**에 넣는다. `usr\bin`만 넣고 `cmd`를 빼면 bash 도구는 되고 `git`은 안 됩니다.
3. 열린 터미널은 PATH를 다시 읽지 않습니다. 창을 닫고 다시 엽니다.
4. `where.exe git`이 `C:\Program Files\Git\cmd\git.exe`를 가리키는지 확인합니다.

에이전트나 CI가 `bash -lc git`을 호출하면, 로그인 셸이 `.bashrc`만 읽고 시스템 PATH를 버릴 수 있습니다. 그 경우 `.bashrc`에 명시합니다.

```bash
export PATH="/c/Program Files/Git/cmd:$PATH"
```

공백이 있는 경로는 따옴표가 필요합니다. 따옴표 없이 넣으면 `Files/Git/cmd`가 잘립니다. 이 함정은 [경로에 공백이 있으면 명령이 두 개로 쪼개진다](/notes/quote-windows-paths)에서 이어서 적습니다.

## 확인

새 창에서:

```bash
command -v git
git --version
```

`command not found`가 남으면 설치 자체가 안 된 것입니다. scoop을 쓰는 환경이면 `scoop install git`이 `~\scoop\shims\git.exe`를 만듭니다. 회사 PC는 설치 권한이 막혀 있을 수 있으니, PortableGit의 `cmd` 폴더를 사용자 PATH에만 넣는 방법이 있습니다.
