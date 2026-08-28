---
title: 콘솔에서 한글이 물음표로 바뀐다
description: Windows 콘솔 코드 페이지 949와 UTF-8 65001, PowerShell 출력 인코딩을 맞춰 한글 로그를 읽습니다.
pubDate: 2026-08-01
category: 터미널
---

한국어 Windows의 콘솔 기본 코드 페이지는 종종 **949**(EUC-KR 계열)입니다. Node와 bun, 최근 Git은 UTF-8을 씁니다. 둘이 만나면 한글이 `????` 또는 `ìœˆë¡œì»¬`처럼 깨집니다.

현재 코드 페이지:

```cmd
chcp
```

`활성 코드 페이지: 949`이면 UTF-8 출력이 깨질 가능성이 큽니다.

## 세션만 바꾸기

```cmd
chcp 65001
```

PowerShell 7:

```powershell
[Console]::InputEncoding  = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$OutputEncoding = [Console]::OutputEncoding
```

Windows Terminal의 프로필에서 **UTF-8**을 켜면 새 탭부터 유지됩니다. 옛 `conhost.exe` 창은 글꼴이 `Raster Fonts`이면 UTF-8 한글을 못 그립니다. 글꼴을 `Cascadia Mono` 또는 `D2Coding`으로 바꿉니다.

## Node

```powershell
node -e "console.log('윈로컬')"
```

깨지면:

```powershell
$env:PYTHONIOENCODING = "utf-8"
chcp 65001
node -e "console.log('윈로컬')"
```

파일로 저장할 때는 BOM 없는 UTF-8이 맞습니다. Windows 메모장의 “UTF-8(BOM)”은 일부 도구가 스크립트의 첫 토큰을 `﻿echo`로 읽게 만듭니다.

## Git 메시지

```bash
git log
```

한글 커밋 메시지가 깨지면:

```bash
git config --global i18n.commitEncoding utf-8
git config --global i18n.logOutputEncoding utf-8
git config --global core.quotepath false
```

`core.quotepath false`는 한글 파일명을 옥텟 이스케이프 대신 그대로 보여 줍니다.

이 사이트의 본문은 UTF-8 Markdown입니다. 빌드 로그에서 제목이 깨져 보여도 `dist` HTML의 `<meta charset="utf-8">`와 파일 바이트는 UTF-8입니다. 콘솔만 949인 상태를 로그 버그로 착각하지 마세요.
