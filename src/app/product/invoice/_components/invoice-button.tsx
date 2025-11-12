// components/InvoiceButton.tsx
"use client";

import { Product } from "@/@types/types";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

type InvoiceButtonProps = {
  path?: string;
  product: Product;
  text?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null;
};
export default function InvoiceButton({
  path = "/product/invoice",
  product,
  text = "Get Invoice (New Tab)",
  variant = "outline",
}: Readonly<InvoiceButtonProps>) {
  return (
    <Link
      href={`${path}/${product.id}`}
      // target="_blank"
      className={buttonVariants({ variant })}
    >
      {text}
    </Link>
  );
}
