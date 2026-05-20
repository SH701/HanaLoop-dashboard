import SkeletonBase from "./SkeletonBase";

export default function KpiCardSkeleton() {
  return (
    <div className="bg-card rounded-lg shadow-sm p-6 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <SkeletonBase className="h-4 w-20" />
        <SkeletonBase className="h-8 w-8 rounded-md" />
      </div>
      <div className="space-y-2">
        <SkeletonBase className="h-8 w-32" />
        <SkeletonBase className="h-4 w-24" />
      </div>
    </div>
  );
}
