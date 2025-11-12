// app/products/[id]/page.tsx
import { ProductSchema } from "@/@types/product";
import { Product } from "@/@types/types";
import TruncateString from "@/components/common/truncated-string";
import { Star } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";
import InvoiceButton from "../invoice/_components/invoice-button";
import ProductDetailsSkeleton from "./_components/product-detail-skeleton";

export const revalidate = 3600; // 1 hour

export const getProduct = cache(async (id: number): Promise<Product> => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: {
      revalidate,
    },
  });

  if (!res.ok) throw new Error("Product not found");

  const data = await res.json();

  const parsed = ProductSchema.safeParse(data);
  if (!parsed.success) throw new Error("Invalid product data");

  return parsed.data;
});

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

  let product: Product;
  try {
    product = await getProduct(id);
  } catch {
    return {
      title: "Product Not Found | Fake Store",
      description: "The product you are looking for does not exist.",
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

  let product: Product;
  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative bg-gray-50 rounded-xl overflow-hidden">
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
            <div className="flex flex-col gap-y-4 mt-4">
              <InvoiceButton
                product={product}
                text="Get Custom Invoice"
                path="/product/get-custom-invoice"
                variant="default"
              />
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
