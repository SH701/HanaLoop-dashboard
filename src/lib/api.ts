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
      { yearMonth: "2024-02", source: "lpg", emissions: 130 },
      { yearMonth: "2024-03", source: "diesel", emissions: 120 },
      { yearMonth: "2024-04", source: "gasoline", emissions: 125 },
      { yearMonth: "2024-05", source: "lpg", emissions: 135 },
      { yearMonth: "2024-06", source: "diesel", emissions: 110 },
      { yearMonth: "2024-07", source: "gasoline", emissions: 100 },
      { yearMonth: "2024-08", source: "lpg", emissions: 115 },
      { yearMonth: "2024-09", source: "diesel", emissions: 105 },
      { yearMonth: "2024-10", source: "gasoline", emissions: 130 },
      { yearMonth: "2024-11", source: "lpg", emissions: 140 },
      { yearMonth: "2024-12", source: "diesel", emissions: 145 },
    ],
  },
  {
    id: "c2",
    name: "Globex",
    country: "DE",
    emissions: [
      { yearMonth: "2024-01", source: "diesel", emissions: 80 },
      { yearMonth: "2024-02", source: "gasoline", emissions: 95 },
      { yearMonth: "2024-03", source: "lpg", emissions: 85 },
      { yearMonth: "2024-04", source: "diesel", emissions: 90 },
      { yearMonth: "2024-05", source: "gasoline", emissions: 100 },
      { yearMonth: "2024-06", source: "lpg", emissions: 75 },
      { yearMonth: "2024-07", source: "diesel", emissions: 85 },
      { yearMonth: "2024-08", source: "gasoline", emissions: 95 },
      { yearMonth: "2024-09", source: "lpg", emissions: 80 },
      { yearMonth: "2024-10", source: "diesel", emissions: 90 },
      { yearMonth: "2024-11", source: "gasoline", emissions: 100 },
      { yearMonth: "2024-12", source: "lpg", emissions: 110 },
    ],
  },
  {
    id: "c3",
    name: "Kotlin Inc",
    country: "KR",
    emissions: [
      { yearMonth: "2024-01", source: "lpg", emissions: 60 },
      { yearMonth: "2024-02", source: "diesel", emissions: 70 },
      { yearMonth: "2024-03", source: "gasoline", emissions: 65 },
      { yearMonth: "2024-04", source: "lpg", emissions: 75 },
      { yearMonth: "2024-05", source: "diesel", emissions: 80 },
      { yearMonth: "2024-06", source: "gasoline", emissions: 70 },
      { yearMonth: "2024-07", source: "lpg", emissions: 65 },
      { yearMonth: "2024-08", source: "diesel", emissions: 75 },
      { yearMonth: "2024-09", source: "gasoline", emissions: 70 },
      { yearMonth: "2024-10", source: "lpg", emissions: 80 },
      { yearMonth: "2024-11", source: "diesel", emissions: 85 },
      { yearMonth: "2024-12", source: "gasoline", emissions: 90 },
    ],
  },
];

const posts: Post[] = [
  {
    id: "p1",
    title: "Sustainability Report",
    resourceUid: "c1",
    dateTime: "2024-02",
    content: "Quarterly CO2 update",
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
