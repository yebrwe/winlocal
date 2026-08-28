---
title: WSL 경로와 C:\ 를 한 명령에 섞지 마라
description: /mnt/c 와 \\wsl$ 와 C:\workspaces 는 같은 폴더가 아닙니다. npm install 위치가 세 갈래로 갈라집니다.
pubDate: 2026-07-21
category: 경로
---

Windows에서 WSL을 켜면 같은 파일이 세 주소로 보입니다.

| 어디서 | 경로 |
|---|---|
| PowerShell / Git Bash | `C:\workspaces\adsense` |
| WSL | `/mnt/c/workspaces/adsense` |
| 탐색기에서 리눅스 파일 | `\\wsl$\Ubuntu\home\...` |

에디터는 `C:\workspaces`를 열고, 에이전트는 WSL 셸에서 `/home/...`에 `npm install`을 하면 **node_modules가 두 개** 생깁니다. 한쪽에서 빌드가 되고 다른 쪽에서는 의존성이 없습니다.

## 증상

- VS Code는 파일이 보이는데 터미널 빌드는 `Cannot find module`
- `bun install`을 방금 했는데 Git Bash에서 `astro`가 없음
- 권한 오류 `EACCES`가 `/mnt/c/` 아래에서만 남

NTFS를 WSL에서 직접 쓰면 파일 감시와 실행 비트가 다릅니다. Linux 도구는 WSL 파일시스템(ext4)에 두는 것이 맞고, 이 사이트처럼 Windows 네이티브 도구(bun, Astro, Cloudflare 빌드)는 `C:\workspaces`에 둡니다.

## 규칙

한 프로젝트에 셸을 하나만 고릅니다.

- 윈로컬: Windows 네이티브. 명령은 Git Bash 또는 PowerShell. 경로는 `C:\workspaces\adsense`.
- 리눅스 빌드가 필요하면 WSL 홈에 **별도 클론**. `/mnt/c`에서 `npm install`하지 않습니다.

WSL에서 Windows 디스크를 꼭 건드려야 하면 변환합니다.

```bash
wslpath -a "C:\workspaces\adsense"
# /mnt/c/workspaces/adsense
```

반대로:

```powershell
wsl wslpath -w /home/you/proj
```

에이전트에게 디렉터리를 줄 때 `/mnt/c/...`와 `C:\...`를 한 프롬프트에 섞지 마세요. 한 쪽만 주고, 그 셸에서만 실행하게 합니다.
