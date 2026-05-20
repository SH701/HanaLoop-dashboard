import { create } from "zustand";

export type PeriodTab = "month" | "quarter" | "year";

type UIStore = {
  /** 좌측 네비게이션 드로어 (모바일에서 토글) */
  isDrawerOpen: boolean;
  periodTab: PeriodTab;
  setDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
  setPeriodTab: (tab: PeriodTab) => void;
};

export const useUIStore = create<UIStore>((set) => ({
  isDrawerOpen: true,
  periodTab: "month",
  setDrawerOpen: (isDrawerOpen) => set({ isDrawerOpen }),
  toggleDrawer: () => set((s) => ({ isDrawerOpen: !s.isDrawerOpen })),
  setPeriodTab: (periodTab) => set({ periodTab }),
}));
