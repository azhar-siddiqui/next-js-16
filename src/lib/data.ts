interface TestRow {
  id: string;
  testName: string;
  result?: string;
  refRange?: string;
  unit?: string;
  isSubHeader?: boolean;
}

export const testData: TestRow[] = [
  // Basic counts
  {
    id: "1",
    testName: "Haemoglobin",
    result: "15",
    refRange: "13-17",
    unit: "g/dL",
  },
  {
    id: "2",
    testName: "Total RBC Count",
    result: "5",
    refRange: "4.5-5.5",
    unit: "Mil-/cumm",
  },
  {
    id: "3",
    testName: "Total WBC Count",
    result: "5000",
    refRange: "4000-10000",
    unit: "/cumm",
  },
  {
    id: "4",
    testName: "Differential Leucocyte Count",
    isSubHeader: true,
  },
  {
    id: "5",
    testName: "Neutrophils",
    result: "50",
    refRange: "40-80",
    unit: "%",
  },
  {
    id: "6",
    testName: "Lymphocytes",
    result: "40",
    refRange: "20-40",
    unit: "%",
  },
  {
    id: "7",
    testName: "Monocytes",
    result: "9",
    refRange: "2-10",
    unit: "%",
  },
  {
    id: "8",
    testName: "Eosinophils",
    result: "1",
    refRange: "1-6",
    unit: "%",
  },
  {
    id: "9",
    testName: "Basophils",
    result: "0",
    refRange: "0-1",
    unit: "%",
  },
  {
    id: "10",
    testName: "Platelet Count",
    result: "300000",
    refRange: "150000-410000",
    unit: "/cumm",
  },
  {
    id: "11",
    testName: "Blood Indices",
    isSubHeader: true,
  },
  {
    id: "12",
    testName: "Hct",
    result: "40",
    refRange: "40-50",
    unit: "%",
  },
  {
    id: "13",
    testName: "MCV",
    result: "80.00",
    refRange: "81-101",
    unit: "fL",
  },
  {
    id: "14",
    testName: "MCH",
    result: "30.00",
    refRange: "27-32",
    unit: "pg",
  },
  {
    id: "15",
    testName: "MCHC",
    result: "37.50",
    refRange: "31.5-34.5",
    unit: "g/dL",
  },
  {
    id: "16",
    testName: "RDW-CV",
    result: "12",
    refRange: "11.6-14.0",
    unit: "%",
  },
];
