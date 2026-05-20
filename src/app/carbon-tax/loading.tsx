import { Card } from "@/components/common";
import SkeletonBase from "@/components/skeleton/SkeletonBase";

export default function Loading() {
  return (
    <div className="p-8 space-y-6">
      <SkeletonBase className="h-8 w-56" />

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <SkeletonBase className="h-4 w-24 mb-3" />
          <SkeletonBase className="h-10 w-full" />
        </Card>
        <Card>
          <SkeletonBase className="h-4 w-24 mb-3" />
          <SkeletonBase className="h-10 w-full" />
        </Card>
        <Card>
          <SkeletonBase className="h-4 w-24 mb-3" />
          <SkeletonBase className="h-10 w-full" />
        </Card>
      </div>

      <Card>
        <SkeletonBase className="h-[300px] w-full" />
      </Card>
    </div>
  );
}
