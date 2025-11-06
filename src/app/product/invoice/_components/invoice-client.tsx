"use client";

import { Product } from "@/@types/types";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  product: Product;
  invoiceNumber: string;
  date: string;
};

export default function InvoiceClient({
  product,
  invoiceNumber,
  date,
}: Readonly<Props>) {
  return (
    <div className="print-container max-w-3xl mx-auto bg-white p-10">
      {/* Header */}
      <div className="flex justify-between items-start mb-12 border-b pb-8">
        <div>
          <h1 className="text-3xl font-bold text-indigo-600">Fake Store</h1>
          <p className="text-sm text-gray-600 mt-2">
            123 Commerce St.
            <br />
            City, State 12345
            <br />
            support@fakestore.com
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-semibold">INVOICE</h2>
          <p className="text-sm mt-2">
            <strong>#</strong> {invoiceNumber}
            <br />
            <strong>Date:</strong> {date}
          </p>
        </div>
      </div>

      {/* Product */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-50 rounded-lg overflow-hidden h-64">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="w-full h-full object-contain p-4"
          />
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">{product.title}</h3>
          <p className="text-gray-600 mb-6">{product.category}</p>

          <table className="w-full text-lg border-separate border-spacing-y-1">
            <thead>
              <tr>
                <th className="text-left font-semibold text-gray-700 pb-3">
                  Item
                </th>
                <th className="text-right font-semibold text-gray-700 pb-3">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 text-gray-600">Price</td>
                <td className="text-right font-medium">
                  ${product.price.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="py-2 text-gray-600">Tax</td>
                <td className="text-right text-gray-500">$0.00</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="pt-4 font-bold text-xl">Total</td>
                <td className="pt-4 text-right font-bold text-xl text-indigo-600">
                  ${product.price.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t pt-8 text-center text-sm text-gray-500">
        <p>Thank you for your purchase!</p>
        <p className="mt-2">This is a computer-generated invoice.</p>
      </div>

      {/* Print Button (screen only) */}
      <div className="no-print text-center mt-12">
        <Button onClick={() => globalThis.print()}>Print or Save as PDF</Button>
      </div>
    </div>
  );
}
