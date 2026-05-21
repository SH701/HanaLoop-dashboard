import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] lg:min-h-screen flex items-center justify-center p-6">
      <div className="bg-card rounded-lg shadow-sm border border-border px-8 py-10 max-w-md w-full text-center space-y-5">
        <p className="text-6xl font-bold text-primary tracking-tight">404</p>

        <div className="space-y-1">
          <h1 className="text-lg font-semibold text-text">
            페이지를 찾을 수 없습니다
          </h1>
          <p className="text-sm text-text-muted">
            요청하신 페이지가 삭제되었거나 주소가 변경되었습니다.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium bg-primary hover:bg-primary-dark text-white transition-colors"
        >
          <Home size={14} />
          대시보드로 이동
        </Link>
      </div>
    </div>
  );
}
