# 애드센스용 신규 사이트 재현 가이드

제휴·YMYL 사이트를 버리고, **승인 확률**을 우선으로 새 사이트를 만들 때의 절차다.  
도메인·메일·계정·인증 토큰은 운영자 것으로 채운다. 이 문서에 특정인 식별 정보는 넣지 않는다.

---

## 0. 목표

구글 애드센스 **승인**이 1순위. 당장 CPC·수익은 무시한다.

---

## 1. 하지 말 것

| 하지 말 것 | 이유 |
|---|---|
| 기존 제휴/쿠팡/YMYL 사이트 재사용 | 크롤러는 옛 URL·테마를 본다 |
| 거절 사이트 위에 새 글만 덮기 | 색인된 저품질이 남는다 |
| 거절됐다고 애드센스 계정 새로 만들기 | 게시자당 1계정 |
| `*.vercel.app` / `*.pages.dev` / `*.workers.dev` 로 신청 | 플랫폼 서브도메인 거절 사례 |
| Next.js CSR (`useEffect`로 본문) | 보기 소스에 글이 없음 |
| AI 글을 하루 수십 편 덤프 | scaled content |
| 만료 줍기 중고 도메인 | 스팸·옛 애드센스 이력 |
| 색인 0개인 날 신청 | 합격 사례는 “열린 사이트 + 색인” |
| 거절 직후 무수정 재신청 | 같은 결과 |
| 본인 광고 클릭 | 계정 정지 |

---

## 2. 주제

- 운영자가 **실제로 매일 하는 일**만. 허위 경험으로 안 보이게.
- 제휴·YMYL(건강/투자/법률) 금지.
- 요리·여행은 본인 사진·경험이 없으면 AI 생활글로 보이기 쉽다.
- 필명·연락 메일·사이트명을 정하고, 소개/문의에 **실제 메일**을 넣는다.

글은 “그 일을 한 사람”처럼. 명령·에러는 본인 환경에서 재현한 것만.

---

## 3. 기술 스택

| 항목 | 선택 | 버린 것 |
|---|---|---|
| 사이트 | **Astro SSG** (React 없음) | Next.js CSR |
| 호스팅 | **Cloudflare** (Workers 또는 Pages, Git 연결) | Vercel Hobby, 슬립하는 무료 호스트 |
| 출력 | `output: "static"`, `dist/` | SPA |
| CI 빌드 | `npm install && npx astro build` | CI에 bun만 가정 |
| 도메인 | **신규** 구매 (중고 금지) | 제휴에 쓰던 도메인 |
| DNS | 등록기관 NS → **Cloudflare NS** | NS를 CF로 넘긴 뒤 등록기관에 CNAME만 넣기 |
| 연결 | Worker **Route** `도메인/*` 또는 Custom Domain **둘 중 하나** | CNAME 수동 + Custom Domain 동시 (충돌) |

`astro.config.mjs`의 `site`는 `https://본인도메인`.

---

## 4. 로컬

```bash
# Node 22
npm install
npm run dev
npm run build
```

`dist/` HTML의 보기 소스에 본문 문단이 있어야 한다.

필수:

```
src/content/posts/*.md
src/pages/index.astro
src/pages/notes/[slug].astro   # 글 URL은 프로젝트에 맞게
src/pages/about.astro
src/pages/contact.astro
src/pages/privacy.astro
src/pages/disclaimer.astro
src/layouts/Base.astro
public/robots.txt
```

디자인 시안 페이지가 있으면 `noindex`, 공개 내비에서 뺀다.

글 날짜는 한날에 몰지 말 것. 본문에 실제 에러·경로·버전, “하지 말 것”. 제휴 링크 없음.

신뢰 페이지: 소개(필명·범위), 문의(실제 메일), 개인정보(쿠키·향후 AdSense), 면책.

---

## 5. GitHub

공개 레포. `main` 푸시 = Cloudflare 자동 배포.

`.gitignore`: `node_modules`, `dist`, `.astro`, `.env`

---

## 6. Cloudflare Git 배포

UI에 프레임워크 프리셋이 없으면:

| 칸 | 값 |
|---|---|
| Build command | `npm install && npx astro build` |
| Output | `dist` |

뜨는 `*.workers.dev` / `*.pages.dev` 주소로 **애드센스 신청하지 말 것**.

---

## 7. 도메인 → Cloudflare

1. Cloudflare에 존 추가 (Free). 신규면 DNS 레코드 0개여도 됨.
2. Overview에서 **Cloudflare NS 두 줄**을 복사. (`ns1.cloudflare.com` 이라고 추측하지 말 것)
3. 등록기관(도메인 관리 → **네임서버**)에서 기본 NS를 지우고 CF NS만.
4. 등록기관에 CNAME을 넣는 방법은, NS를 이미 CF로 넘긴 뒤에는 무효.

### Worker에 붙이기 — 하나만

수동 CNAME 후 Custom Domain을 추가하면:

> Hostname already has externally managed DNS records.

**A. Route**

- DNS: CNAME `@` → `프로젝트.workers.dev` Proxied, `www` 동일
- Worker → **Route** (Custom Domain 아님) → `본인도메인/*`, `www.본인도메인/*`

**B. Custom Domain**

- 위 CNAME 삭제 → Worker가 DNS를 만듦

루트만 522이면 루트 Route `도메인/*` 가 빠진 것.

---

## 8. 검색 등록

Search Console·네이버에서 받은 **본인** 인증 문자열만 `<head>`에 넣는다. 남의 토큰을 복사하지 말 것.

사이트맵 (Astro `@astrojs/sitemap`):

- `/sitemap-index.xml` (하이픈)
- `/sitemap-0.xml`

Search Console에 **`sitemap_index.xml`(밑줄)을 넣으면 “가져올 수 없음”.**

Cloudflare **Bot Fight Mode는 끈다.**

홈·소개·방침·글 URL을 **URL 검사 → 색인 생성 요청**. 디자인 시안 URL은 넣지 말 것. 하루 한도 있으면 핵심만 먼저.

---

## 9. 애드센스 타임라인

**색인 전:** 사이트맵 성공, URL 요청, 대공사 금지, 글은 주 1~2편, **신청 금지**.

**신청 직전:** 색인된 글이 꽤 쌓임(대략 10+), 가능하면 2~3주 업타임. URL은 `https://본인도메인` 만. 기존 애드센스 계정.

**신청 후:** 대기. 본인 클릭 금지. 대규모 수정 금지.

**승인 후:** 구글이 주는 `ads.txt`, 자동 광고, 방침에 AdSense 명시.

**거절 후:** 같은 계정·같은 도메인, 2~4주 보강 후 재신청. 제휴로 돌리지 말 것.

---

## 10. 참고 (사례에서)

공식 최소 글 수는 없다. 붙은 예는 “이미 온라인 + 색인”이지, 로컬 전용 초안이 아니다.  
도메인 **구매일 자체는 조건이 아님**. 산 직후 신청 패턴이 불리하다.

---

## 11. 재현 순서

1. Astro SSG, 본인 경험 노트, 제휴/YMYL 없음
2. GitHub 공개 + Cloudflare Git (`npx astro build` → `dist`)
3. 깨끗한 도메인 구매
4. 등록기관 NS → Cloudflare NS
5. Worker Route 또는 Custom Domain **하나**
6. GSC 인증 + `sitemap-index.xml` (밑줄 아님)
7. 색인될 때까지 대기
8. 커스텀 도메인으로만 애드센스 신청
