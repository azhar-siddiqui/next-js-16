import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto container mt-16">
      <Link
        href="/products"
        className={cn(buttonVariants({ variant: "link" }))}
      >
        View All Product
      </Link>
    </div>
  );
}
