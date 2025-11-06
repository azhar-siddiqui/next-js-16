import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";

export default function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image Skeleton */}
          <div className="relative h-96 bg-gray-50 rounded-xl overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>

          {/* Content Skeleton */}
          <div className="flex flex-col">
            {/* Title */}
            <Skeleton className="h-9 w-3/4 mb-6" />

            {/* Price & Category Row */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-24" />
                <Skeleton className="h-5 w-20" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="size-4 text-amber-500" fill="oklch(76.9% 0.188 70.08)" />
                <Skeleton className="h-5 w-32" />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 mb-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-y-4 mt-auto">
              <Button className="w-full" disabled>
                <Skeleton className="h-4 w-24" />
              </Button>
              <Button variant="outline" className="w-full" disabled>
                <Skeleton className="h-4 w-32" />
              </Button>
              <Button variant="secondary" className="w-full" disabled>
                <Skeleton className="h-4 w-40" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}