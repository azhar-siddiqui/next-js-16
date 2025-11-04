import { Product } from "@/@types/types";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Fake Store - Products",
};

async function ProductPage() {
  const response = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 3600 }, // optional: cache for 1 hour
  });

  if (!response.ok) throw new Error("Failed to fetch data");

  const products: Product[] = await response.json();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-200"
          >
            {/* Image */}
            <div className="relative h-48 bg-gray-50 p-4 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.title}
                width={500}
                height={500}
                loading="eager"
                fetchPriority={product.id <= 4 ? "high" : "auto"}
                className="h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Card Body - Flex Grow */}
            <div className="p-4 flex flex-col grow">
              {/* Title */}
              <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 mb-2">
                {product.title}
              </h3>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-indigo-600">
                  ${product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-1 text-sm text-amber-500">
                  <span>★</span>
                  <span className="text-gray-600">
                    {product.rating.rate} ({product.rating.count})
                  </span>
                </div>
              </div>

              {/* Description - Pushed to Bottom */}
              <p className="text-sm text-gray-600 mt-auto line-clamp-2 truncate">
                {product.description}
              </p>
            </div>

            {/* Optional: Category Badge */}
            <Badge className="absolute top-2 left-2 text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-700 capitalize">
              {product.category}
            </Badge>
            {/* <div className="absolute top-2 left-2 text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-700  rounded-full">
              {product.category}
            </div> */}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
