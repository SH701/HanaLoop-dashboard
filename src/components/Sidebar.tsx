"use client";

import {
  LayoutDashboard,
  TrendingUp,
  Building2,
  FileText,
  Calculator,
  Bell,
  Settings,
  LucideIcon,
} from "lucide-react";
import { useUIStore, NavItem } from "@/stores/useUIStore";

type NavSectionItem = {
  id: NavItem;
  label: string;
  icon: LucideIcon;
};

type NavSection = {
  label: string;
  items: NavSectionItem[];
};

const NAV_SECTIONS: NavSection[] = [
  {
    label: "분석",
    items: [
      { id: "dashboard", label: "대시보드", icon: LayoutDashboard },
      { id: "emissions", label: "배출량 분석", icon: TrendingUp },
      { id: "companies", label: "회사 관리", icon: Building2 },
      { id: "reports", label: "보고서", icon: FileText },
      { id: "carbon-tax", label: "탄소세 계산", icon: Calculator },
    ],
  },
  {
    label: "관리",
    items: [
      { id: "alerts", label: "알림", icon: Bell },
      { id: "settings", label: "설정", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  const { activeNav, setActiveNav } = useUIStore();

  return (
    <aside className="w-60 shrink-0 h-screen bg-white border-r border-gray-100 flex flex-col">
      <div className="px-5 py-5 flex items-center gap-3 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
          <span className="text-white text-xs font-bold">H</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 leading-tight">Hanaloop</p>
          <p className="text-xs text-gray-400">Carbon Intelligence</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="px-2 mb-1 text-xs font-medium text-gray-400 uppercase tracking-wider">
              {section.label}
            </p>
            <ul className="space-y-0.5">
              {section.items.map(({ id, label, icon: Icon }) => {
                const active = activeNav === id;
                return (
                  <li key={id}>
                    <button
                      onClick={() => setActiveNav(id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        active
                          ? "bg-emerald-50 text-emerald-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon
                        size={16}
                        strokeWidth={1.8}
                        className={active ? "text-emerald-600" : "text-gray-400"}
                      />
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
