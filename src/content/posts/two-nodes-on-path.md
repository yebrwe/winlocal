---
title: node가 두 개면 npx가 다른 메이저를 가져온다
description: nvm-windows, 설치본 Node 22, bun이 한 머신에 있을 때 which/where 결과가 창마다 달라집니다.
pubDate: 2026-07-28
category: 패키지
---

이 머신에서 `node -v`는 `v22.17.1`이었습니다. 다른 창에서는 `v18`이 나올 수 있습니다. 원인은 버전 관리자가 PATH 앞에 다른 `node.exe`를 넣기 때문입니다.

Windows에서 흔히 겹칩니다.

- `C:\Program Files\nodejs\node.exe` — 공식 설치
- `~\AppData\Roaming\nvm\` — nvm-windows
- `~\.fnm\`, `~\.volta\`
- bun이 PATH 앞쪽에서 `bunx`로 Node API를 흉내 냄

`npx astro`가 쓰는 Node와 `bun run astro`가 쓰는 Node가 다릅니다. `engines.node`를 22로 적어 둔 프로젝트가 18로 실행되면 문법 에러가 납니다.

## 창마다 확인

```powershell
where.exe node
node -v
npm -v
```

`where.exe`는 PATH 순서대로 **모든** `node.exe`를 찍습니다. 첫 줄이 실제로 실행되는 파일입니다. Git Bash면 `type -a node`.

VS Code 통합 터미널은 에디터를 띄울 때 PATH를 복사합니다. nvm으로 버전을 바꾼 뒤 에디터를 안 끄면, 새 탭도 옛 Node를 씁니다.

## 이 저장소

윈로컬은 Node 22와 bun 1.2를 전제로 적습니다. 빌드 명령은 `bun run build`로 고정해서, 셸이 집어 든 `npx`의 Node 메이저에 덜 흔들리게 합니다. `package.json`에 대략값이라도 적어 두면 실수가 빨리 납니다.

```json
"engines": { "node": ">=22" }
```

에이전트가 `nvm use`를 Linux 문법으로 치면 nvm-windows에서는 실패합니다. Windows용은 `nvm use 22`이고, 관리자 권한이 필요한 설치본도 있습니다.
