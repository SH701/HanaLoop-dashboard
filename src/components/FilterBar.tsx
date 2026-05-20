import { useCompanyStore } from "@/stores/useCompanyStore";
import { Select } from "@/components/common";

export default function FilterBar() {
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

  return (
    <div className="flex items-center gap-3">
      <Select
        value={selectedCountry ?? ""}
        onChange={(e) => setSelectedCountry(e.target.value || null)}
      >
        <option value="">전체 국가</option>
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}
          </option>
        ))}
      </Select>

      <Select
        value={selectedCompany ?? ""}
        onChange={(e) => setSelectedCompany(e.target.value || null)}
      >
        <option value="">전체 회사</option>
        {filteredCompanies.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Select>
    </div>
  );
}
