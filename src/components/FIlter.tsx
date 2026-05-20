import { useCompanyStore } from "@/stores/useCompanyStore";

export default function Filter() {
  const {
    countries,
    companies,
    selectedCountry,
    selectedCompany,
    setSelectedCountry,
    setSelectedCompany,
  } = useCompanyStore();

  const filteredCompanies = selectedCountry
    ? companies.filter((c) => c.country === selectedCountry)
    : companies;
  const selectClass =
    "h-9 rounded-md border border-border bg-card px-3 text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary";

  return (
    <div className="flex items-center gap-3">
      <select
        value={selectedCountry ?? ""}
        onChange={(e) => setSelectedCountry(e.target.value || null)}
        className={selectClass}
      >
        <option value="">전체 국가</option>
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        value={selectedCompany ?? ""}
        onChange={(e) => setSelectedCompany(e.target.value || null)}
        className={selectClass}
      >
        <option value="">전체 회사</option>
        {filteredCompanies.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
