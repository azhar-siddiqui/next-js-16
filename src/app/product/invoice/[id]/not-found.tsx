
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Oops! We couldn&apos;t find that product.
      </p>
      <Link href="/products" className={buttonVariants({ variant: "default" })}>
        Browse All Products
      </Link>
    </div>
  );
}
