import { Product } from "@/@types/types";

import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProduct } from "../../[id]/page";
import InvoiceClient from "../_components/invoice-client";
import InvoiceSkeleton from "../_components/invoice-skeleton";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: productId } = await params;
  const id = Number(productId);

  let product: Product;
  try {
    product = await getProduct(id);
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
    <Suspense fallback={<InvoiceSkeleton />}>
      <RenderInvoice
        product={product}
        date={date}
        invoiceNumber={invoiceNumber}
      />
    </Suspense>
  );
}

type RenderInvoiceProps = {
  product: Product;
  date: string;
  invoiceNumber: string;
};
async function RenderInvoice({
  product,
  date,
  invoiceNumber,
}: RenderInvoiceProps) {
  return (
    <InvoiceClient
      product={product}
      date={date}
      invoiceNumber={invoiceNumber}
    />
  );
}
