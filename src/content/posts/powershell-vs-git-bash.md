---
title: PowerShell과 Git Bash는 같은 컴퓨터의 다른 운영체제다
description: 환경 변수, 경로 문법, 인용 규칙이 셸마다 달라서 복붙 명령이 실패합니다.
pubDate: 2026-08-28
category: 터미널
---

Windows에는 셸이 여러 개입니다. 프롬프트가 `PS C:\>`이면 PowerShell, `user@host MINGW64`이면 Git Bash, `C:\>`만 있으면 cmd. 같은 `ls`도 세 곳에서 다른 프로그램입니다.

| | PowerShell | Git Bash | cmd |
|---|---|---|---|
| 홈 | `$env:USERPROFILE` | `$HOME` | `%USERPROFILE%` |
| 경로 | `C:\workspaces` | `/c/workspaces` | `C:\workspaces` |
| 나열 | `Get-ChildItem` | `ls` | `dir` |
| 환경 변수 설정 | `$env:FOO = "1"` | `export FOO=1` | `set FOO=1` |

문서를 읽기 전에 프롬프트 한 줄을 보세요. macOS 명령을 PowerShell에 붙이면 `export`가 cmdlet이 아니라고 나옵니다.

## PATH를 고쳤는데 새 창에서만 된다

`setx`와 시스템 환경 변수 UI는 **이미 열린 프로세스**를 갱신하지 않습니다. VS Code 통합 터미널, 에이전트 세션, Cursor 모두 부모 프로세스의 PATH를 복제합니다. Git을 설치한 뒤에도 그 창의 `git`은 계속 없습니다. 창을 닫고, 에디터까지 한 번 종료하는 것이 맞습니다.

## 어떤 셸을 고정할지

이 노트는 예제를 **Git Bash**와 **PowerShell** 두 벌로만 적습니다. cmd 전용 문법은 `.bat`가 필요할 때만 씁니다. 에이전트 설정에서 셸을 하나 고르고, 그 문법만 생성하게 하세요. “알아서 되는 셸”은 Windows에 없습니다.
