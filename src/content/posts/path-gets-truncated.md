---
title: PATH가 길어지면 뒤에 설치한 도구가 사라진다
description: Windows PATH 길이 한도에 걸리면 Git을 설치해도 새 터미널에서 명령이 없는 것처럼 보입니다.
pubDate: 2026-07-14
category: 경로
---

Git을 설치하고 PATH에 `C:\Program Files\Git\cmd`를 넣었는데, 새 창에서 또 `git`이 없습니다. 설치가 안 된 게 아니라 **PATH 문자열이 잘린 것**일 수 있습니다.

사용자 PATH와 시스템 PATH를 합친 길이는 예전 한도가 약 2047자입니다. 요즘 Windows는 더 길지만, 설치 프로그램·레지스트리 편집기·오래된 `setx`는 여전히 앞에서 잘라 저장합니다. 잘라진 지점 뒤에 있던 Node, Git, bun 경로가 통째로 사라집니다.

## 길이 보기

```powershell
$machine = [Environment]::GetEnvironmentVariable("Path", "Machine")
$user = [Environment]::GetEnvironmentVariable("Path", "User")
"machine $($machine.Length)"
"user $($user.Length)"
"sum $($machine.Length + $user.Length)"
```

합이 2000에 가까우면 다음 설치가 위험합니다. `setx PATH "..."`로 전체를 다시 쓰면, 입력이 잘려 **지금 있는 PATH를 짧은 문자열로 덮어씁니다.** 복구하기 어렵습니다.

## 잘렸을 때

시스템 속성 → 환경 변수 UI에서 항목을 한 줄씩 확인합니다. `setx`로 한 덩어리 문자열을 넣지 마세요.

중복 항목을 줄이는 것이 먼저입니다. 같은 `nodejs`, `Git\cmd`, `Python3x\Scripts`가 세 번 들어 있는 경우가 많습니다.

```powershell
($env:PATH -split ';' | Where-Object { $_ } | Select-Object -Unique) -join ';'
```

이 결과를 바로 `setx`하지 말고, UI에서 중복만 지웁니다. 사용자 PATH에만 도구를 넣고 시스템 PATH는 OS가 준 값을 유지하는 편이 안전합니다.

## 에이전트

에이전트가 “PATH에 추가”를 `setx` 한 줄로 해결하려 하면 말리세요. 이 노트 환경도 도구가 여러 개라 문자열이 깁니다. 새 도구는 사용자 PATH에 경로 항목 하나만 추가하면 됩니다.
