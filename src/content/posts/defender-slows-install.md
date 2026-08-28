---
title: Defender가 node_modules를 잠그면 설치가 분 단위로 늘어난다
description: Windows Defender 실시간 검사가 bun/npm install을 느리게 만드는 지점과 프로젝트 폴더만 제외하는 방법.
pubDate: 2026-08-08
category: 패키지
---

`bun install`이 다른 머신보다 유독 느리면, 네트워크가 아니라 **실시간 검사**인 경우가 있습니다. Defender가 `node_modules` 아래 수천 개의 작은 파일에 쓰기 이벤트를 겁니다. CPU는 낮은데 디스크가 바쁩니다.

작업 관리자에서 `MsMpEng.exe`가 install 동안 같이 오르면 거의 이 문제입니다.

## 재현

같은 락파일로 두 번 설치합니다. 한 번은 기본, 한 번은 제외 후.

```powershell
Measure-Command { bun install }
```

제외 전후가 2배 이상이면 Defender 쪽을 의심합니다. WSL 쪽 프로젝트는 이 증상이 약합니다. Windows 네이티브 경로 `C:\workspaces\...`에서만 두드러집니다.

## 제외는 프로젝트 루트만

Windows 보안 → 바이러스 및 위협 방지 → 설정 관리 → 제외.

넣는 것:

- `C:\workspaces\adsense\node_modules`
- 필요하면 `C:\workspaces\adsense\dist`

넣지 않는 것:

- `C:\` 전체
- `C:\Users\Administrator` 전체
- 다운로드 폴더

회사 정책으로 제외가 막혀 있으면, 저장소를 WSL ext4 쪽에 두는 편이 낫습니다. NTFS + Defender + 수만 개 파일은 구조적으로 느립니다.

## 에디터 인덱싱

VS Code가 `node_modules`를 감시하면 install 중에 파일이 잠기거나 감시 한도에 닿습니다. `.vscode/settings.json`:

```json
{
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/dist/**": true
  }
}
```

Antimalware가 `node.exe`를 격리하면 설치가 아니라 실행이 막힙니다. 그때는 제외가 아니라 위협 기록에서 해당 경로를 허용해야 합니다. 무작정 전체 디스크 제외는 하지 마세요.
