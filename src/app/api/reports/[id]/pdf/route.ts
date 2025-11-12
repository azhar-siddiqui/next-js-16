import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Fetch the HTML from your EXACT page route
  const htmlUrl = `${baseUrl}/product/get-custom-invoice/${id}`; // This matches your working route (from logs)
  const htmlResponse = await fetch(htmlUrl, {
    headers: {
      // Mimic a real browser request to ensure full render (includes server-side data)
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });

  // Error if page not found
  if (!htmlResponse.ok) {
    return new NextResponse("Report not found", { status: 404 });
  }

  const html = await htmlResponse.text();

  // Launch Puppeteer for exact A4 PDF
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport to A4 dimensions for precise rendering
  await page.setViewport({ width: 794, height: 1123 }); // A4 in pixels at 96 DPI (adjust if needed)

  await page.setContent(html, { waitUntil: "networkidle0" });
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true, // Respects your CSS (e.g., max-w-[210mm])
    margin: {
      top: "10mm", // Tight margins to match your layout
      right: "10mm",
      bottom: "10mm",
      left: "10mm",
    },
  });

  await browser.close();

  // Download the exact report as PDF
  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=exact-patient-report-${id}-${
        new Date().toISOString().split("T")[0]
      }.pdf`, // Includes date for uniqueness
      "Content-Length": pdfBuffer.length.toString(),
    },
  });
}
