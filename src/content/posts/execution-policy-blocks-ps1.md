---
title: ExecutionPolicy 때문에 .ps1이 실행되지 않는다
description: Restricted 정책에서 PowerShell 스크립트가 막히는 이유와, 현재 프로세스에만 Bypass를 거는 방법.
pubDate: 2026-07-07
category: 터미널
---

Windows에서 `setup.ps1`을 더블클릭하거나 `.\setup.ps1`을 치면 이런 메시지가 나옵니다.

```
.\setup.ps1 : 이 시스템에서 스크립트를 실행할 수 없으므로...
```

원인은 파일이 아니라 **실행 정책**입니다. 기본값이 `Restricted`인 머신이 많습니다. 스크립트 파일은 막고, 대화형으로 붙여 넣은 한 줄은 됩니다. 그래서 “터미널에서는 되는데 파일만 안 된다”가 됩니다.

## 지금 정책 보기

```powershell
Get-ExecutionPolicy -List
```

`LocalMachine`이 `Restricted`이고 `CurrentUser`가 `Undefined`이면, 사용자 스크립트는 막힙니다. 회사 PC는 `GroupPolicy` 줄이 `AllSigned`인 경우가 있어, 로컬에서 바꿔도 다시 막힙니다.

## 하지 말 것

전역을 풀어 버리는 명령입니다.

```powershell
Set-ExecutionPolicy Unrestricted -Scope LocalMachine
```

관리자 권한이 필요하고, 다음에 받은 `.ps1`까지 그대로 돕니다. 애드센스 글이든 에이전트 스크립트든, 이 한 줄은 적지 않는 편이 낫습니다.

## 이 창에서만 풀기

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\setup.ps1
```

창을 닫으면 원래 정책으로 돌아갑니다. 한 줄만 필요하면 파일을 우회합니다.

```powershell
powershell -NoProfile -Command "Get-ChildItem"
```

또는:

```powershell
Get-Content .\setup.ps1 -Raw | Invoke-Expression
```

후자는 정책을 피하지만, 내용을 읽은 뒤에만 쓰세요. 인터넷에서 받은 스크립트를 그대로 파이프하면 정책이 있던 이유가 사라집니다.

## Git Bash와 혼동

Git Bash에서 `./setup.ps1`은 bash가 해석합니다. shebang이 없으면 텍스트로 열리거나 실패합니다. PowerShell 스크립트는 PowerShell에서 실행하세요. 에이전트에게 “스크립트 돌려”라고만 하면 셸을 잘못 고릅니다.
