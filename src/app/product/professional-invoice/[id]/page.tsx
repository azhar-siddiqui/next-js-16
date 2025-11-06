import { notFound } from "next/navigation";
import ProfessionalInvoice from "../_components/professional-invoice";

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

  return (
    <ProfessionalInvoice
      logoSrc="/file.svg" // put your logo in public/
      company={{
        name: "Creative Design Agency",
        address: "1686 Pride Avenue\nRego Park Queens | NY 11734",
        email: "creativedesign@gmail.com",
      }}
      client={{
        name: "Natasha Gilmore",
        address: "2255 Walnut Hill Drive\nCincinnati, OH 45216",
        email: "natasha@eutech.com",
      }}
      invoice={{
        number: "1011",
        date: "22-Jan-2022",
        dueDate: "28-Jan-2022",
      }}
      items={[
        { description: "Prototype", hours: 20, rate: 15, total: 300 },
        {
          description: "Wireframing",
          hours: 22,
          rate: 15,
          total: 330,
          isHighlighted: true,
        },
        {
          description: "App Development: Phase 1",
          hours: 500,
          rate: 25,
          total: 12500,
        },
        {
          description: "App Development: Phase 2",
          hours: 350,
          rate: 23,
          total: 8050,
          isHighlighted: true,
        },
      ]}
      previousDues={1300}
    />
  );
}
