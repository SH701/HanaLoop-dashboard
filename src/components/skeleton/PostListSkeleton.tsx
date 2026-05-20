import SkeletonBase from "./SkeletonBase";

export default function PostListSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <SkeletonBase className="h-4 w-24" />
        <SkeletonBase className="h-7 w-14 rounded-md" />
      </div>
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border border-border rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <SkeletonBase className="h-4 w-40" />
              <SkeletonBase className="h-3 w-16" />
            </div>
            <SkeletonBase className="h-3 w-20" />
            <SkeletonBase className="h-3 w-full" />
            <SkeletonBase className="h-3 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  );
}
