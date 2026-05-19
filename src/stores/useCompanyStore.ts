import { create } from "zustand";
import { Company, Country } from "@/types";

type CompanyStore = {
  companies: Company[];
  countries: Country[];
  selectedCountry: string | null;
  selectedCompany: string | null;
  isLoading: boolean;
  error: string | null;
  setCompanies: (companies: Company[]) => void;
  setCountries: (countries: Country[]) => void;
  setSelectedCountry: (code: string | null) => void;
  setSelectedCompany: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useCompanyStore = create<CompanyStore>((set) => ({
  companies: [],
  countries: [],
  selectedCountry: null,
  selectedCompany: null,
  isLoading: false,
  error: null,
  setCompanies: (companies) => set({ companies }),
  setCountries: (countries) => set({ countries }),
  setSelectedCountry: (code) => set({ selectedCountry: code }),
  setSelectedCompany: (id) => set({ selectedCompany: id }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));