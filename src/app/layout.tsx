import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: "Carbon Emissions Dashboard",
  description: "Monitor and plan carbon emissions across your organization",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="lg:flex lg:h-screen bg-gray-50 text-gray-900 antialiased lg:overflow-hidden">
        <Sidebar />
        <Toaster position="bottom-center" richColors />
        <main className="flex-1 pt-14 lg:pt-0 lg:overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
