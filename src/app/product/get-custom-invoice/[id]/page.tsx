import { testData } from "@/lib/data";
import { generateUniqueId } from "@/lib/utils";
import Image from "next/image";
import QRCode from "qrcode";

const patientData = {
  patientId: generateUniqueId(), // Generate once here
  suffix: "Mrs",
  patientName: "AZMIN KHAN",
  referDoctor: "VISHAL HANMANTE SIR",
  collectionDate: "03/11/2025 09:16 PM", // Use this if needed for Collection Date
  reportingDate: `${new Date().toLocaleDateString(
    "en-GB"
  )} ${new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })}`,
  patientAge: "25",
  patientAgeType: "Yrs",
  patientGender: "Female",
};

export default async function GetCustomInvoice({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("id", id);
  // Generate QR code URL (points to PDF download API)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const pdfUrl = `${baseUrl}/api/reports/${id}/pdf`; // Keep this—matches API path

  // Generate QR code as base64 SVG (server-side)
  const qrCodeDataUrl = await QRCode.toDataURL(pdfUrl, {
    width: 60, // Matches your Image size
    margin: 1,
    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },
  });

  return (
    <div className="min-h-screen py-8 px-4 font-sans">
      <div className="max-w-[210mm] mx-auto h-[297mm] shadow-lg relative">
        {/* Header */}
        <Image
          src="/Header.svg"
          alt="Report Header"
          width={595} // Adjusted to fit A4 width (595pt)
          height={115}
          className="w-full h-auto" // Ensure it scales responsively
        />
        {/* Patient Information */}
        <div className="px-6 py-4 border-b-2 border-black">
          {/* Collection Date - right-aligned (use collectionDate if needed) */}
          <div className="flex justify-end mb-2">
            <div className="flex items-center w-1/2">
              <p className="w-1/3 text-sm font-medium">Collection Date</p>
              <p className="w-2/3 text-sm font-medium uppercase">
                <span className="mr-4">:</span>
                {patientData.collectionDate}{" "}
                {/* Switched to hardcoded if intended; revert to reportingDate if dynamic */}
              </p>
            </div>
          </div>

          {/* Paired fields in a simple grid */}
          <div className="grid grid-cols-2">
            {/* Left column */}
            <div className="space-y-2">
              <div className="flex items-center">
                <p className="w-1/3 text-sm font-medium">Patient ID</p>
                <p className="w-2/3 text-sm font-medium">
                  <span className="mr-4">:</span>
                  {patientData.patientId} {/* Fixed: Use consistent ID */}
                </p>
              </div>
              <div className="flex items-center">
                <p className="w-1/3 text-sm font-medium">Patient Name</p>
                <p className="w-2/3 text-sm font-medium">
                  <span className="mr-4">:</span>
                  {patientData.patientName}
                </p>
              </div>
              <div className="flex items-center">
                <p className="w-1/3 text-sm font-medium">Ref. By</p>
                <p className="w-2/3 text-sm font-medium">
                  <span className="mr-4">:</span>
                  Dr. {patientData.referDoctor}
                </p>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-2">
              <div className="flex items-center">
                <p className="w-1/3 text-sm font-medium">Report Date</p>
                <p className="w-2/3 text-sm font-medium uppercase">
                  <span className="mr-4">:</span>
                  {patientData.reportingDate}
                </p>
              </div>
              <div className="flex items-center">
                <p className="w-1/3 text-sm font-medium">Age</p>
                <p className="w-2/3 text-sm font-medium capitalize">
                  <span className="mr-4">:</span>
                  {patientData.patientAge} {patientData.patientAgeType}.
                </p>
              </div>
              <div className="flex items-center">
                <p className="w-1/3 text-sm font-medium">Gender</p>
                <p className="w-2/3 text-sm font-medium capitalize">
                  <span className="mr-4">:</span>
                  {patientData.patientGender}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Test List here */}
        <div className="mt-4 px-8">
          <p className="text-center font-bold text-sm">HAEMATOLOGY</p>
          <p className="text-center font-bold text-sm">
            COMPLETE BLOOD COUNT (CBC)
          </p>
          <table className="w-full text-sm mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 font-bold text-left w-1/2">
                  TEST DESCRIPTION
                </th>
                <th className=" font-bold text-left w-1/6">RESULT</th>
                <th className=" font-bold text-left w-1/6">REF RANGE</th>
                <th className=" font-bold text-left w-1/6">UNIT</th>
              </tr>
            </thead>
            <tbody>
              {testData.map((row) => (
                <tr key={row.id}>
                  {row.isSubHeader ? (
                    <td className="py-2 font-semibold" colSpan={4}>
                      {row.testName}
                    </td>
                  ) : (
                    <>
                      <td className="py-1 text-sm px-2">{row.testName}</td>
                      <td className="py-1 text-sm text-left">{row.result}</td>
                      <td className="py-1 text-sm text-left">{row.refRange}</td>
                      <td className="py-1 text-sm text-left">{row.unit}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* QR Code Section */}
        <div className="absolute bottom-36 right-3">
          <Image
            src={qrCodeDataUrl} // Base64 data URL for QR
            alt="QR Code for PDF Download"
            width={60}
            height={60}
            className=""
          />
        </div>
        {/* Lab Footer */}
        <Image
          src="/Footer.svg"
          alt="Report Footer"
          width={595} // Adjusted to fit A4 width (595pt)
          height={122}
          className="w-full h-auto absolute bottom-0 left-0 right-0 border-t-2 border-[#184585]" // Ensure it scales responsively
        />
      </div>
    </div>
  );
}
