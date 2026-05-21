"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calculator, Menu, X, LucideIcon } from "lucide-react";

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
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      {/* 모바일 헤더 (햄버거) */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-40 h-14 bg-white border-b border-gray-100 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-emerald-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">H</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">Hanaloop</span>
        </div>
        <button
          onClick={() => setOpen(true)}
          aria-label="메뉴 열기"
          className="p-2 rounded-md text-gray-600 hover:bg-gray-50"
        >
          <Menu size={20} />
        </button>
      </header>

      {/* 모바일 dim 배경 */}
      {open && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-40 bg-black/40"
          aria-hidden
        />
      )}

      {/* 사이드바 본체: 모바일에선 drawer, lg부터 고정 */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-screen w-60 shrink-0 bg-white border-r border-gray-100 flex flex-col transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="px-5 py-5 flex items-center gap-3 border-b border-gray-100">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">H</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 leading-tight">Hanaloop</p>
            <p className="text-xs text-gray-400">Carbon Intelligence</p>
          </div>
          <button
            onClick={close}
            aria-label="메뉴 닫기"
            className="lg:hidden p-1 rounded-md text-gray-500 hover:bg-gray-50"
          >
            <X size={18} />
          </button>
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
                        onClick={close}
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
    </>
  );
}
