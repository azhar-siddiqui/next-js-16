import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function InvoiceSkeleton() {
  return (
    <div className="print-container max-w-3xl mx-auto bg-white p-10">
      {/* Header */}
      <div className="flex justify-between items-start mb-12 border-b pb-8">
        <div className="space-y-2">
          <Skeleton className="h-9 w-40" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-36" />
        </div>

        <div className="text-right space-y-2">
          <Skeleton className="h-8 w-32 ml-auto" />
          <Skeleton className="h-5 w-24 ml-auto" />
          <Skeleton className="h-5 w-28 ml-auto" />
        </div>
      </div>

      {/* Product Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div className="bg-gray-50 rounded-lg overflow-hidden h-64">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Details */}
        <div className="space-y-4">
          <Skeleton className="h-7 w-5/6" />
          <Skeleton className="h-5 w-32" />

          {/* Table */}
          <div className="space-y-3">
            {/* Table Header */}
            <div className="flex justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24 ml-auto" />
            </div>

            {/* Table Rows */}
            <div className="flex justify-between">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20 ml-auto" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-16 ml-auto" />
            </div>

            {/* Total Row */}
            <div className="border-t pt-3 flex justify-between">
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-7 w-24 ml-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t pt-8 text-center space-y-2">
        <Skeleton className="h-4 w-48 mx-auto" />
        <Skeleton className="h-4 w-56 mx-auto" />
      </div>

      {/* Print Button (screen only) */}
      <div className="no-print text-center mt-12">
        <Button disabled className="w-48">
          <Skeleton className="h-4 w-32" />
        </Button>
      </div>
    </div>
  );
}
