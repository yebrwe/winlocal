---
title: CRLF로 저장한 셸 스크립트가 한 줄씩 실패한다
description: Windows 기본 CRLF가 bash에서 `\r`을 명령 이름에 붙이는 문제를 재현하고 core.autocrlf를 맞춥니다.
pubDate: 2026-07-25
category: 터미널
---

Windows 편집기는 줄 끝을 `CRLF`(`\r\n`)로 저장합니다. Git Bash에서 그 파일을 실행하면 마지막 토큰이 `command\r`가 됩니다. 에러 메시지는 이상합니다.

```
bash: $'\r': command not found
```

또는 `python\r: command not found`. 눈에 보이는 이름은 `python`인데, 실제 바이트에 CR이 붙어 있습니다.

## 재현

```powershell
Set-Content -Path .\hello.sh -Value "echo hello`n" -NoNewline
# PowerShell의 `n 은 LF. 기본 Set-Content는 CRLF를 씁니다.
```

더 정확한 재현:

```powershell
[IO.File]::WriteAllText("$pwd\hello.sh", "echo hello`r`n")
bash ./hello.sh
```

Git Bash에서 `od -c hello.sh` 또는 `file hello.sh`로 CR을 확인합니다.

## Git 쪽 설정

저장소에서:

```bash
git config core.autocrlf false
git config core.eol lf
```

`.gitattributes`를 루트에 둡니다.

```
* text=auto eol=lf
*.ps1 text eol=crlf
*.bat text eol=crlf
*.cmd text eol=crlf
```

셸 스크립트와 Astro/TS는 LF, Windows 전용 래퍼만 CRLF입니다. `core.autocrlf=true`는 checkout마다 CRLF로 바꿔서 bash 스크립트를 다시 깨뜨립니다.

## 에디터

VS Code / Cursor는 우측 하단에 `CRLF`가 보입니다. 저장소 기본을 LF로 두고, `.editorconfig`에 적습니다.

```
root = true
[*]
end_of_line = lf
insert_final_newline = true
```

이미 망가진 파일은 `dos2unix`가 없더라도 Git Bash에서 됩니다.

```bash
sed -i 's/\r$//' hello.sh
```

에이전트가 생성한 `.sh`가 Windows에서 바로 실패하면, 내용이 틀려서가 아니라 줄 끝인 경우가 많습니다. 먼저 `cat -A`로 `^M`을 보세요.
