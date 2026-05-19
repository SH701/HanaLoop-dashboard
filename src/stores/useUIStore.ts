import { create } from "zustand";

export type NavItem =
  | "dashboard"
  | "emissions"
  | "companies"
  | "reports"
  | "carbon-tax"
  | "alerts"
  | "settings";

export type PeriodTab = "month" | "quarter" | "year";

type UIStore = {
  /** 좌측 네비게이션 드로어 (모바일에서 토글) */
  isDrawerOpen: boolean;
  activeNav: NavItem;
  periodTab: PeriodTab;
  setDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
  setActiveNav: (nav: NavItem) => void;
  setPeriodTab: (tab: PeriodTab) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  isDrawerOpen: true,
  activeNav: "dashboard",
  periodTab: "month",
  setDrawerOpen: (isDrawerOpen) => set({ isDrawerOpen }),
  toggleDrawer: () => set((s) => ({ isDrawerOpen: !s.isDrawerOpen })),
  setActiveNav: (activeNav) => set({ activeNav }),
  setPeriodTab: (periodTab) => set({ periodTab }),
}));
