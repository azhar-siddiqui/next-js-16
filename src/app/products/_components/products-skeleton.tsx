import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export default function ProductSkeleton() {
  return Array.from({ length: 8 }).map((_, i) => (
    <div
      key={`${_}-${i}`}
      className="group relative bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full border border-gray-200"
    >
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gray-50 p-4 flex items-center justify-center">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col grow">
        {/* Title */}
        <Skeleton className="h-6 w-11/12 mb-2" />
        <Skeleton className="h-6 w-4/5 mb-3" />

        {/* Price & Rating */}
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-7 w-20 rounded-md" />
          <div className="flex items-center gap-1">
            <Star className="size-4 text-amber-500" fill="currentColor" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Description (mt-auto to push to bottom) */}
        <div className="mt-auto space-y-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
        </div>
      </div>

      {/* Category Badge */}
      <Badge className="absolute top-2 left-2 text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-700">
        <Skeleton className="h-3 w-16" />
      </Badge>
    </div>
  ));
}
