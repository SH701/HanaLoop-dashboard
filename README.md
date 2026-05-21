# Carbon Emissions Dashboard

기업의 월별 탄소 배출량을 시각화하고, **K-ETS(배출권거래)** 기준 **예상 탄소세를 시뮬레이션**하는 대시보드입니다.

타겟 유저는 기업의 임원·관리자이며, 핵심 사용 목적은 "앞으로 내야 할 탄소세를 미리 예측하고 감축 계획을 수립하는 것" 입니다.

**배포 링크:** [[배포_링크](https://hanaloop-dashboard-inky.vercel.app/
)]

총 약 **7시간**

| 일자 | 작업 | 소요 |
|---|---|---|
| 1일차 | 프로젝트 세팅, 타입/시드 데이터 정상화, Zustand 스토어 설계, Fake API, 디자인 토큰 | 1h |
| 2일차 | 공통 컴포넌트, 대시보드(KPI/차트/필터/CRUD), 스켈레톤·에러 처리, 탄소세 시뮬레이터 | 4h |
| 3일차 | 반응형 UI, 404 페이지, 단위 테스트, README | 2h |
---

## How to run

요구사항: Node.js 18+ / npm

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속.

| 스크립트 | 설명 |
|---|---|
| `npm run dev` | 개발 서버 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 |
| `npm run lint` | ESLint |
| `npm test` | Jest 단위 테스트 |

---

## Tests

Jest + ts-jest 로 **핵심 비즈니스 로직**에 집중해 단위 테스트를 작성했습니다.

| 대상 | 검증 내용 |
|---|---|
| `calculateCarbonTax` | 무상할당 비율, 상쇄배출권 5% 캡, 연환산(×12), 0 입력 가드, 과세대상 비율 계산 |
| `getCompanySourceEmissions` | 최신 월 선별, 같은 월 중복 source 합산, 누락 source 0 채움, null 가드 |
| `usePostStore` | 낙관적 업데이트의 saveSnapshot / rollback / snapshot 초기화 |

```bash
npm test
```

---

## Tech Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — 디자인 토큰을 CSS 변수로 정의 후 Tailwind theme에 매핑
- **Zustand** — 클라이언트 상태 (회사 / 보고서)
- **Recharts** — 차트
- **Sonner** — 토스트 알림
- **lucide-react** — 아이콘
- **Jest + ts-jest** — 단위 테스트

---

## Features

### 대시보드 (`/`)
- KPI 카드 4종 (총 배출량 / 전월 대비 / 최다 배출 회사 / 예상 탄소세)
- 월별 배출량 스택 바 차트 + 감축 목표선
- 소스별(휘발유/디젤/LPG) 도넛 차트
- 국가·회사 필터 (URL 미연동, 클라이언트 상태)
- 보고서 CRUD — **낙관적 업데이트 + 실패 시 rollback + 토스트 알림**

### 탄소세 시뮬레이터 (`/carbon-tax`)
- 회사 선택 시 해당 기업의 최근 월 배출량을 자동 입력
- 연료원별 배출량 / 무상할당 비율 / 상쇄배출권 / KAU 시세를 슬라이더로 조정 → **실시간 계산**
- 결과 카드, 계산 단계별 분해 차트(총배출 → 차감 → 과세대상 → 탄소세), 산출 근거 카드

### 반응형
- 모바일(<768px) / 태블릿(768–1023px) / 데스크탑(≥1024px)
- 모바일은 사이드바를 햄버거 drawer로 토글
- Tailwind `screens`를 `md: 768px` / `lg: 1024px`로 명시 재정의

### 기타
- 컴포넌트별 로딩 스켈레톤 (KPI / 차트 / 리스트)
- 404 not-found 페이지 (디자인 토큰 재사용)

---

## Architecture Overview

### 디렉토리

```
src/
├── app/
│   ├── page.tsx              대시보드
│   ├── carbon-tax/page.tsx   탄소세 시뮬레이터
│   ├── not-found.tsx         404
│   ├── layout.tsx            Sidebar + main
│   └── globals.css           디자인 토큰 + breakpoint
├── components/
│   ├── common/               Card, Button, Input, Select, Textarea
│   ├── dashboard/            KpiCard, EmissionsChart, SourceChart, PostList, PostForm
│   ├── carbon-tax/           InputPanel, ResultCard, BreakdownChart, MethodologyCard, ...
│   ├── skeleton/             KPI/Chart/PostList 스켈레톤
│   ├── Sidebar.tsx
│   └── FilterBar.tsx
├── hooks/                    useDashboard, useSource, usePosts, usePostMutation, useCarbonTax, useFilteredCompanies
├── stores/                   useCompanyStore, usePostStore  (Zustand)
├── lib/                      api (인메모리 fake), calculateCarbonTax, getCompanySourceEmissions, format
├── constants/                colors, source, tax, methodology
└── types/                    Country, Company, GhgEmission, Post, CarbonTaxInput/Result
```

### 상태 관리

**Zustand 2개 스토어**로 도메인을 분리했습니다.

| 스토어 | 역할 |
|---|---|
| `useCompanyStore` | 회사·국가 목록, 선택 필터, 로딩/에러 |
| `usePostStore` | 보고서 목록, 낙관적 업데이트용 `_snapshot` · `rollback` |


### 데이터 흐름

```
fetchCompanies/fetchCountries  →  useCompanyStore
fetchPosts                     →  usePostStore
                                     │
                                     ▼
                       useFilteredCompanies  (selector)
                                     │
                ┌────────────────────┼────────────────────┐
                ▼                    ▼                    ▼
          useDashboard          useSource           usePosts
          (KPI 계산)          (차트 데이터)     (선택회사 필터)
```

- **순수 함수 분리**: `calculateCarbonTax`, `getCompanySourceEmissions`는 React에 의존하지 않는 순수 함수로 분리 → 테스트 용이성 확보
- **selector 훅**: `useFilteredCompanies`가 모든 통계 훅의 입력 — 필터 로직 중복 제거

---

## Rendering Efficiency Notes

### 왜 `page.tsx`가 CSR(`"use client"`)인가

원래 Next.js App Router는 서버 컴포넌트가 기본이지만, 다음 이유로 클라이언트 컴포넌트로 구성했습니다.

1. **인터랙티브 필터** — 국가/회사 선택이 즉시 KPI·차트·보고서에 반영되어야 함 → Zustand 구독 필요
2. **차트 라이브러리(Recharts)** — DOM 측정 기반 ResponsiveContainer라 클라이언트 전용
3. **Fake API** — DB 연결 없이 `lib/api.ts`가 모듈 단위 변수를 mutate → 서버 컴포넌트에서 호출해도 의미가 없음
4. **낙관적 업데이트** — `usePostMutation`의 `saveSnapshot/rollback`은 클라이언트 상태 머신


### 리렌더링 최적화 포인트
- `useCarbonTax`는 `useMemo`로 입력값 변동에만 재계산
- `usePosts`는 fetch를 한 번만 수행하고 `selectedCompany` 필터는 클라이언트에서 derived state로 처리 (필터 바꿀 때마다 재요청 X)

---

## Assumptions


- **`Country` 타입이 명세에 없어서** `{ code: string; name: string }` 으로 직접 정의 (ISO 3166-1 alpha-2 code 기반)
- **시드 데이터의 JSON 오타** ( source 필드 누락) 을 정상화해서 사용
- **탄소세 계산 모델** — K-ETS 운영 지침을 단순화. `과세대상 = max(0, 총배출 − 무상할당 − 상쇄)`, `탄소세 = 과세대상 × KAU 시세`. 무상할당 기본 78% (3차 계획기간 평균), 상쇄 5% 캡 적용
- **연간 탄소세** — 월간 ×12로 단순 환산 (계절성 미반영)
- **단위** — 모든 배출량 단위는 `tCO₂e`, 금액은 `KRW`

---

## Design Rationale

### 왜 "탄소세 시뮬레이터"를 추가했나

대시보드의 타겟 유저는 **기업의 임원·관리자**이며 본질적 관심은 *"우리가 얼마나 배출하는가"* 가 아니라 **"이걸로 얼마나 비용이 나가는가, 어떻게 줄일까"** 라고 생각했습니다.

단순 데이터 조회를 넘어 **의사결정 보조 도구**가 되도록, K-ETS 기반 탄소세를 입력값에 따라 실시간으로 시뮬레이션할 수 있는 페이지를 추가했습니다.

- **무상할당 비율 슬라이더** → 정책 변화 시뮬레이션
- **KAU 시세 슬라이더** (5,000~50,000) → 시장 변동성 노출
- **계산 단계별 분해 차트** → "왜 이 금액이 나왔는지" 설명 가능성 확보
- **산출 근거 카드** → 환경부 / KRX 출처 명시로 신뢰성 (AI 서치로 구현)

### 컬러 / 레이아웃

- **Primary: Emerald** (#16A34A) — 친환경 도메인 컨벤션
- **카드 기반 레이아웃** — 정보 위계가 명확하고, 모바일에서 자연스럽게 세로 스택
- **디자인 토큰 일원화** — `globals.css`의 CSS 변수를 Tailwind theme에 매핑해서 다크모드/리브랜딩 확장성 확보

---

## Tradeoffs

| 생략한 것 | 이유 |
|---|---|
| **UI/통합 테스트** | 핵심 비즈니스 로직(탄소세 계산, 최신월 추출, 낙관적 업데이트)에 unit test를 집중 |
| **i18n** | 한국어 단일 언어 |

---

## Commit History

1. `Initial commit from Create Next App`
2. `chore`: 프로젝트 초기 세팅
3. `feat`: Zustand 스토어 설계
4. `feat`: 기본 레이아웃 — 네비게이션 + 메인 영역
5. `chore`: 디자인 토큰 정의 — 컬러/타이포/간격
6. `feat`: 공통 컴포넌트 — Card, Button, Badge
7. `feat`: 대시보드 KPI 카드
8. `feat`: 월별 배출량 스택 바 차트
9. `feat`: 국가/회사 필터 + 목데이터
10. `feat`: 소스별 배출량 차트 추가
11. `feat`: 보고서 작성/수정 + 낙관적 업데이트 / rollback
12. `feat`: 로딩 스켈레톤 UI 추가 + 전역 로딩/에러 처리
13. `refactor`: 중복 상수/훅 통합 + 공통 폼 분리
14. `feat`: 보고서 생성 에러 핸들링 + 토스트 알림
15. `feat`: 탄소세 시뮬레이터 페이지
16. `refactor`: FIlter → FilterBar 컴포넌트 이름 변경
17. `feat`: 반응형 UI 적용 + breakpoint 재정의
18. `refactor`: 미사용 코드 제거 + 훅 책임 정리
19. `test`: 탄소세 계산 등 핵심 로직 단위 테스트
