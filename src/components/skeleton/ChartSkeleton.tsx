import SkeletonBase from "./SkeletonBase";

export default function ChartSkeleton({
  chartClassName = "h-[300px]",
  wrapperClassName = "",
}: {
  chartClassName?: string;
  wrapperClassName?: string;
}) {
  return (
    <div className={`bg-card rounded-lg shadow-sm p-6 ${wrapperClassName}`}>
      <SkeletonBase className="h-4 w-24 mb-4" />
      <SkeletonBase className={chartClassName} />
    </div>
  );
}
