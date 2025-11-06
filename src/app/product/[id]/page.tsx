// app/products/[id]/page.tsx
import { Product } from "@/@types/types";
import TruncateString from "@/components/common/truncated-string";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import InvoiceButton from "../invoice/_components/invoice-button";
import ProductDetailsSkeleton from "./_components/product-detail-skeleton";

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: rawId } = await params;
  const id = Number(rawId);

  // Invalid ID → fallback title
  if (Number.isNaN(id) || id <= 0) {
    return {
      title: "Product Not Found | Fake Store",
      description: "The product you're looking for doesn't exist.",
    };
  }

  // Fetch product for metadata
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return {
      title: "Product Not Found | Fake Store",
      description: "The product you're looking for doesn't exist.",
    };
  }

  const text = await res.text();
  if (!text.trim()) {
    return {
      title: "Product Not Found | Fake Store",
    };
  }

  let product: Product;
  try {
    product = JSON.parse(text);
  } catch {
    return {
      title: "Product Error | Fake Store",
    };
  }

  return {
    title: `${product.title} | Fake Store`,
    description:
      product.description.length > 160
        ? product.description.slice(0, 157) + "..."
        : product.description,
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 200),
      images: [product.image],
      url: `https://yoursite.com/products/${id}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description.slice(0, 200),
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <RenderProductDetail id={id} />
    </Suspense>
  );
}

async function RenderProductDetail({ id: productId }: { id: string }) {
  const id = Number(productId);

  if (Number.isNaN(id) || id <= 0) {
    notFound();
  }

  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    notFound();
  }

  const text = await res.text();
  if (!text.trim()) {
    notFound();
  }

  let product: Product;
  try {
    product = JSON.parse(text);
  } catch {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-96 bg-gray-50 rounded-xl overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-4"
              priority
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              {product.title}
            </h1>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl font-bold text-indigo-600">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-500">
                  • {product.category}
                </span>
              </div>

              <div className="flex items-center gap-1 text-amber-500 mb-2">
                <Star
                  className="size-4 text-amber-500"
                  fill="oklch(76.9% 0.188 70.08)"
                />
                <span className="text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </div>

            <TruncateString
              className="text-gray-700 leading-relaxed"
              text={product.description}
              maxLength={250}
            />
            <div className="flex flex-col gap-y-4">
              <Button className="mt-4">Add to Cart</Button>
              <InvoiceButton product={product} />
              <InvoiceButton
                product={product}
                text="Get Professional Invoice"
                path="/product/professional-invoice"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
