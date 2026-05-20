"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calculator, LucideIcon } from "lucide-react";

type NavSectionItem = {
  href: string;
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
      { href: "/", label: "대시보드", icon: LayoutDashboard },
      { href: "/carbon-tax", label: "탄소세 계산", icon: Calculator },
    ],
  },
];

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export default function Sidebar() {
  const pathname = usePathname();

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
              {section.items.map(({ href, label, icon: Icon }) => {
                const active = isActive(pathname, href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
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
                    </Link>
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
