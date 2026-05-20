import { Company, Country, Post } from "@/types";

const countries: Country[] = [
  { code: "US", name: "United States" },
  { code: "DE", name: "Germany" },
  { code: "KR", name: "South Korea" },
];

const companies: Company[] = [
  {
    id: "c1",
    name: "Acme Corp",
    country: "US",
    emissions: [
      { yearMonth: "2024-01", source: "gasoline", emissions: 140 },
      { yearMonth: "2024-01", source: "diesel",   emissions: 60  },
      { yearMonth: "2024-02", source: "gasoline", emissions: 130 },
      { yearMonth: "2024-02", source: "lpg",      emissions: 50  },
      { yearMonth: "2024-03", source: "diesel",   emissions: 120 },
      { yearMonth: "2024-03", source: "lpg",      emissions: 40  },
      { yearMonth: "2024-04", source: "gasoline", emissions: 125 },
      { yearMonth: "2024-04", source: "diesel",   emissions: 55  },
      { yearMonth: "2024-05", source: "gasoline", emissions: 135 },
      { yearMonth: "2024-05", source: "lpg",      emissions: 45  },
      { yearMonth: "2024-06", source: "diesel",   emissions: 110 },
      { yearMonth: "2024-06", source: "lpg",      emissions: 40  },
      { yearMonth: "2024-07", source: "gasoline", emissions: 100 },
      { yearMonth: "2024-07", source: "diesel",   emissions: 50  },
      { yearMonth: "2024-08", source: "gasoline", emissions: 115 },
      { yearMonth: "2024-08", source: "lpg",      emissions: 35  },
      { yearMonth: "2024-09", source: "diesel",   emissions: 105 },
      { yearMonth: "2024-09", source: "lpg",      emissions: 45  },
      { yearMonth: "2024-10", source: "gasoline", emissions: 130 },
      { yearMonth: "2024-10", source: "diesel",   emissions: 60  },
      { yearMonth: "2024-11", source: "gasoline", emissions: 140 },
      { yearMonth: "2024-11", source: "lpg",      emissions: 50  },
      { yearMonth: "2024-12", source: "diesel",   emissions: 145 },
      { yearMonth: "2024-12", source: "lpg",      emissions: 55  },
    ],
  },
  {
    id: "c2",
    name: "Globex",
    country: "DE",
    emissions: [
      { yearMonth: "2024-01", source: "diesel",   emissions: 80  },
      { yearMonth: "2024-01", source: "lpg",      emissions: 40  },
      { yearMonth: "2024-02", source: "gasoline", emissions: 95  },
      { yearMonth: "2024-02", source: "diesel",   emissions: 45  },
      { yearMonth: "2024-03", source: "gasoline", emissions: 85  },
      { yearMonth: "2024-03", source: "lpg",      emissions: 35  },
      { yearMonth: "2024-04", source: "diesel",   emissions: 90  },
      { yearMonth: "2024-04", source: "lpg",      emissions: 40  },
      { yearMonth: "2024-05", source: "gasoline", emissions: 100 },
      { yearMonth: "2024-05", source: "diesel",   emissions: 50  },
      { yearMonth: "2024-06", source: "lpg",      emissions: 75  },
      { yearMonth: "2024-06", source: "gasoline", emissions: 35  },
      { yearMonth: "2024-07", source: "diesel",   emissions: 85  },
      { yearMonth: "2024-07", source: "lpg",      emissions: 40  },
      { yearMonth: "2024-08", source: "gasoline", emissions: 95  },
      { yearMonth: "2024-08", source: "diesel",   emissions: 45  },
      { yearMonth: "2024-09", source: "lpg",      emissions: 80  },
      { yearMonth: "2024-09", source: "gasoline", emissions: 35  },
      { yearMonth: "2024-10", source: "diesel",   emissions: 90  },
      { yearMonth: "2024-10", source: "lpg",      emissions: 45  },
      { yearMonth: "2024-11", source: "gasoline", emissions: 100 },
      { yearMonth: "2024-11", source: "diesel",   emissions: 50  },
      { yearMonth: "2024-12", source: "lpg",      emissions: 110 },
      { yearMonth: "2024-12", source: "gasoline", emissions: 45  },
    ],
  },
  {
    id: "c3",
    name: "Kotlin Inc",
    country: "KR",
    emissions: [
      { yearMonth: "2024-01", source: "lpg",      emissions: 60  },
      { yearMonth: "2024-01", source: "gasoline", emissions: 30  },
      { yearMonth: "2024-02", source: "diesel",   emissions: 70  },
      { yearMonth: "2024-02", source: "lpg",      emissions: 30  },
      { yearMonth: "2024-03", source: "gasoline", emissions: 65  },
      { yearMonth: "2024-03", source: "diesel",   emissions: 35  },
      { yearMonth: "2024-04", source: "lpg",      emissions: 75  },
      { yearMonth: "2024-04", source: "gasoline", emissions: 30  },
      { yearMonth: "2024-05", source: "diesel",   emissions: 80  },
      { yearMonth: "2024-05", source: "lpg",      emissions: 35  },
      { yearMonth: "2024-06", source: "gasoline", emissions: 70  },
      { yearMonth: "2024-06", source: "diesel",   emissions: 30  },
      { yearMonth: "2024-07", source: "lpg",      emissions: 65  },
      { yearMonth: "2024-07", source: "gasoline", emissions: 35  },
      { yearMonth: "2024-08", source: "diesel",   emissions: 75  },
      { yearMonth: "2024-08", source: "lpg",      emissions: 30  },
      { yearMonth: "2024-09", source: "gasoline", emissions: 70  },
      { yearMonth: "2024-09", source: "diesel",   emissions: 30  },
      { yearMonth: "2024-10", source: "lpg",      emissions: 80  },
      { yearMonth: "2024-10", source: "gasoline", emissions: 35  },
      { yearMonth: "2024-11", source: "diesel",   emissions: 85  },
      { yearMonth: "2024-11", source: "lpg",      emissions: 35  },
      { yearMonth: "2024-12", source: "gasoline", emissions: 90  },
      { yearMonth: "2024-12", source: "diesel",   emissions: 40  },
    ],
  },
];

const posts: Post[] = [
  {
    id: "p1",
    title: "Sustainability Report Q1",
    resourceUid: "c1",
    dateTime: "2024-02",
    content:
      "Q1 탄소 배출량이 전분기 대비 8% 감소했습니다. 휘발유 소비 절감 캠페인이 주효했으며, 디젤 부문은 물류 최적화로 추가 감축 여지가 있습니다.",
  },
  {
    id: "p2",
    title: "연간 탄소 감축 목표 설정",
    resourceUid: "c1",
    dateTime: "2024-05",
    content:
      "2024년 연간 배출량 목표를 전년 대비 15% 감축으로 설정하였습니다. LPG 차량 전환 및 재생에너지 구매 확대를 주요 수단으로 활용할 예정입니다.",
  },
  {
    id: "p3",
    title: "탄소세 비용 분석",
    resourceUid: "c1",
    dateTime: "2024-09",
    content:
      "3분기 배출량 기준 예상 탄소세는 약 8,100만 원입니다. 현행 추세 유지 시 연간 3.2억 원 수준으로, 감축 투자 대비 비용 편익 분석을 첨부합니다.",
  },
  {
    id: "p4",
    title: "유럽 탄소 규제 대응 현황",
    resourceUid: "c2",
    dateTime: "2024-03",
    content:
      "EU CBAM(탄소국경조정제도) 시행에 따른 Globex의 대응 현황을 정리했습니다. 디젤 중심 물류를 전동화로 전환 중이며, 2025년까지 LPG 비중을 30% 이하로 낮출 계획입니다.",
  },
  {
    id: "p5",
    title: "Scope 3 배출량 측정 시범 운영",
    resourceUid: "c2",
    dateTime: "2024-07",
    content:
      "공급망 전체의 Scope 3 배출량 측정을 시범 운영했습니다. 협력사 18곳 중 12곳이 데이터를 제출했으며, 전체 배출의 약 62%가 원자재 조달 단계에서 발생함을 확인했습니다.",
  },
  {
    id: "p6",
    title: "2024 상반기 배출량 점검",
    resourceUid: "c3",
    dateTime: "2024-06",
    content:
      "Kotlin Inc 상반기 총 배출량은 425톤으로 집계되었습니다. LPG 비중이 높아 상대적으로 낮은 탄소 집약도를 유지하고 있으나, 하반기 물류 증가에 대비한 추가 감축 방안을 검토 중입니다.",
  },
  {
    id: "p7",
    title: "탄소중립 로드맵 초안",
    resourceUid: "c3",
    dateTime: "2024-11",
    content:
      "2030 탄소중립 달성을 위한 로드맵 초안을 작성했습니다. 단계별 목표: 2025년 -20%, 2027년 -45%, 2030년 Net Zero. 전기차 전환 및 재생에너지 PPA 체결이 핵심 과제입니다.",
  },
];

const _countries = [...countries];
const _companies = [...companies];
let _posts = [...posts];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600;
const maybeFail = () => Math.random() < 0.15;

export async function fetchCountries() {
  await delay(jitter());
  return _countries;
}

export async function fetchCompanies() {
  await delay(jitter());
  return _companies;
}

export async function fetchPosts() {
  await delay(jitter());
  return _posts;

}

export async function createOrUpdatePost(p: Omit<Post, "id"> & { id?: string }) {
  await delay(jitter());
  if (maybeFail()) throw new Error("Save failed");
  if (p.id) {
    _posts = _posts.map(x => x.id === p.id ? (p as Post) : x);
    return p as Post;
  }
  const created = { ...p, id: crypto.randomUUID() };
  _posts = [..._posts, created];
  return created;
}
