import Card from "../common/Card";
import { LucideIcon } from "lucide-react";

type KpiCardProps = {
  title: string;
  value: string;
  sub?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
};

export default function KpiCard({ title, value, sub, icon: Icon, trend }: KpiCardProps) {
  const trendColor =
    trend === "up" ? "text-danger" :
    trend === "down" ? "text-success" :
    "text-text-muted";

  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-text-muted">{title}</span>
        <div className="w-8 h-8 rounded-md bg-primary-bg flex items-center justify-center">
          <Icon size={16} className="text-primary" />
        </div>
      </div>
      <div>
        <p className="text-2xl font-semibold text-text">{value}</p>
        {sub && <p className={`text-sm mt-0.5 ${trendColor}`}>{sub}</p>}
      </div>
    </Card>
  );
}
