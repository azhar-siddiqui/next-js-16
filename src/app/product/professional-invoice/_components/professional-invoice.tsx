// app/invoice/page.tsx   (or any route you like)
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

type LineItem = {
  description: string;
  hours: number;
  rate: number;
  total: number;
  isHighlighted?: boolean; // optional visual cue
};

type Props = {
  logoSrc: string; // your logo URL
  company: {
    name: string;
    address: string;
    email: string;
  };
  client: {
    name: string;
    address: string;
    email: string;
  };
  invoice: {
    number: string;
    date: string;
    dueDate: string;
  };
  items: LineItem[];
  previousDues: number;
};

export default function ProfessionalInvoice({
  logoSrc,
  company,
  client,
  invoice,
  items,
  previousDues,
}: Readonly<Props>) {
  const subtotal = items.reduce((s, i) => s + i.total, 0);
  const total = subtotal + previousDues;

  return (
    <>
      <div className="print-container bg-white font-sans text-sm leading-relaxed">
        {/* ====================== HEADER ====================== */}
        <header className="bg-linear-to-r from-indigo-800 to-indigo-600 text-white p-6 flex justify-between items-center">
          <Image
            src={logoSrc}
            alt="Company logo"
            width={140}
            height={60}
            className="object-contain"
          />
          <div className="text-right">
            <p className="font-bold uppercase tracking-wider">{company.name}</p>
            <p className="text-xs">{company.address}</p>
            <p className="text-xs">{company.email}</p>
          </div>
        </header>

        <div className="px-12 py-8 border">
          {/* ====================== BILL TO / INVOICE INFO ====================== */}
          <div className="flex justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-indigo-700 uppercase mb-2">
                Invoice To
              </h2>
              <p className="font-semibold">{client.name}</p>
              <p>{client.address}</p>
              <p>{client.email}</p>
            </div>

            <div className="text-right">
              <h1 className="text-3xl font-bold text-indigo-700 uppercase">
                Invoice
              </h1>
              <p className="mt-2">
                <strong>Invoice No.</strong> {invoice.number}
              </p>
              <p>
                <strong>Date:</strong> {invoice.date}
              </p>
              <p>
                <strong>Due Date:</strong> {invoice.dueDate}
              </p>
            </div>
          </div>

          {/* ====================== LINE ITEMS TABLE ====================== */}
          <table className="w-full mb-8 text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="pb-2 font-bold uppercase text-indigo-700">
                  Description
                </th>
                <th className="pb-2 font-bold uppercase text-indigo-700 text-center">
                  Hours
                </th>
                <th className="pb-2 font-bold uppercase text-indigo-700 text-center">
                  Rate/Hr ($)
                </th>
                <th className="pb-2 font-bold uppercase text-indigo-700 text-right">
                  Total ($)
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr
                  key={`${item.description}-${idx}`}
                  className={`border-b ${
                    item.isHighlighted ? "bg-gray-100" : ""
                  }`}
                >
                  <td className="py-2 pr-4">{item.description}</td>
                  <td className="py-2 text-center">{item.hours}</td>
                  <td className="py-2 text-center">{item.rate}</td>
                  <td className="py-2 text-right font-medium">
                    {item.total.toLocaleString()}
                  </td>
                </tr>
              ))}

              {/* ------------------- SUBTOTAL ------------------- */}
              <tr className="border-t-2 border-gray-400 font-bold">
                <td colSpan={3} className="pt-3 text-right pr-4">
                  SUBTOTAL
                </td>
                <td className="pt-3 text-right">{subtotal.toLocaleString()}</td>
              </tr>

              {/* ------------------- PREVIOUS DUES ------------------- */}
              {previousDues > 0 && (
                <tr className="bg-gray-100 font-bold">
                  <td colSpan={3} className="pt-2 text-right pr-4">
                    PREVIOUS DUES
                  </td>
                  <td className="pt-2 text-right">
                    {previousDues.toLocaleString()}
                  </td>
                </tr>
              )}

              {/* ------------------- TOTAL ------------------- */}
              <tr className="border-t-2 border-gray-600">
                <td
                  colSpan={3}
                  className="pt-4 text-right pr-4 text-lg font-bold"
                >
                  TOTAL
                </td>
                <td className="pt-4 text-right text-lg font-bold text-indigo-600">
                  {total.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>

          {/* ====================== APPROVAL SECTION ====================== */}
          <div className="mt-12 flex justify-center gap-24 text-center">
            <div>
              <div className="border-t border-gray-600 w-48 mb-1"></div>
              <p className="text-xs uppercase">Approved By</p>
            </div>
            <div>
              <div className="border-t border-gray-600 w-48 mb-1"></div>
              <p className="text-xs uppercase">Date</p>
            </div>
          </div>
        </div>

        <footer className="bg-linear-to-r from-indigo-600 to-indigo-800 text-white p-6 flex justify-between items-center h-28" />
      </div>
      {/* ====================== PRINT BUTTON (screen only) ====================== */}
      <div className="no-print text-center my-6">
        <Button onClick={() => globalThis.print()}>Print or Save as PDF</Button>
      </div>
    </>
  );
}
