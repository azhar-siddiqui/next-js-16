import { Product } from "@/@types/types";

import { notFound } from "next/navigation";
import InvoiceClient from "../_components/invoice-client";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: rawId } = await params;
  const id = Number(rawId);

  if (Number.isNaN(id) || id <= 0) notFound();

  const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) notFound();

  const text = await res.text();
  if (!text.trim()) notFound();

  let product: Product;
  try {
    product = JSON.parse(text);
  } catch {
    notFound();
  }

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const invoiceNumber = `INV-78945487874545`;

  return (
    <InvoiceClient
      product={product}
      invoiceNumber={invoiceNumber}
      date={date}
    />
  );
}
