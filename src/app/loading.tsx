import { Card } from "@/components/common";
import {
  KpiCardSkeleton,
  ChartSkeleton,
  PostListSkeleton,
} from "@/components/skeleton";

export default function Loading() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between">
        <div className="h-8 w-56 rounded bg-gray-200 animate-pulse" />
        <div className="h-9 w-72 rounded bg-gray-200 animate-pulse" />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KpiCardSkeleton />
        <KpiCardSkeleton />
        <KpiCardSkeleton />
        <KpiCardSkeleton />
      </div>

      <ChartSkeleton />

      <div className="flex gap-4 items-stretch">
        <ChartSkeleton chartClassName="h-[250px]" wrapperClassName="flex-[4]" />
        <Card className="flex-[6]">
          <PostListSkeleton />
        </Card>
      </div>
    </div>
  );
}
