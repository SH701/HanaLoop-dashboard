import { useCompanyStore } from "@/stores/useCompanyStore";

export function useFilteredCompanies() {
  const { companies, selectedCountry, selectedCompany } = useCompanyStore();

  return companies.filter((c) => {
    if (selectedCompany) return c.id === selectedCompany;
    if (selectedCountry) return c.country === selectedCountry;
    return true;
  });
}
