// components/InvoiceButton.tsx
"use client";

import { Product } from "@/@types/types";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function InvoiceButton({
  product,
}: Readonly<{ product: Product }>) {
  return (
    <Link
      href={`/product/invoice/${product.id}`}
      // target="_blank"
      className={buttonVariants({ variant: "outline" })}
    >
      Get Invoice (New Tab)
    </Link>
  );
}
