import { useState } from "react";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ExportModalProps {
  isOpen: boolean;
  currentPageData?: any[];
  selectedData: any[];
  onClose: () => void;
  allData: any[];
  filename?: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  allData,
  currentPageData = [],
  filename = "export",
  selectedData,
}) => {
  const [exportScope, setExportScope] = useState("");
  const [exportType, setExportType] = useState("");

  const getExportData = () => {
    switch (exportScope) {
      case "current":
        return currentPageData;
      case "all":
        return allData;
      case "selected":
        return selectedData;
      default:
        return [];
    }
  };

  const exportCSV = () => {
    const csv = Papa.unparse(getExportData());
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${filename}.csv`);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    const exportData = getExportData();

    if (!exportData.length) return;

    const columns = Object.keys(exportData[0]);
    const rows = exportData.map((row) => columns.map((col) => row[col]));

    doc.setFontSize(16);
    doc.text("Buyers Data", 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [columns],
      body: rows,
      styles: {
        fontSize: 11,
        cellPadding: 4,
        halign: "left",
      },
      headStyles: {
        fillColor: [255, 108, 0],
        textColor: 255,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 30 },
    });

    doc.save(`${filename}.pdf`);
  };

  const exportPlainText = () => {
    const exportData = getExportData();
    const text = exportData
      .map((item) =>
        Object.entries(item)
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n")
      )
      .join("\n\n");

    const blob = new Blob([text], { type: "text/plain;charset=utf-8;" });
    saveAs(blob, `${filename}.txt`);
  };

  const handleExport = () => {
    if (!exportScope || !exportType) return;

    switch (exportType) {
      case "csv":
        exportCSV();
        break;
      case "pdf":
        exportPDF();
        break;
      case "txt":
        exportPlainText();
        break;
    }

    onClose();
  };

  return isOpen ? (
    <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-30 bg-black/50 backdrop-blur-sm">
      <div className="w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] rounded-[24px] flex flex-col p-8 bg-white">
        <h2 className="text-2xl font-bold">Export Data</h2>

        <h6 className="font-medium mt-5">Export</h6>
        <div className="flex flex-col gap-y-2 mt-2">
          {[
            { id: "all", label: "All data" },
            {
              id: "selected",
              label: `Selection (${selectedData.length} selected)`,
            },
          ].map(({ id, label }) => (
            <label
              key={id}
              className="flex gap-x-3 items-center text-sm cursor-pointer"
            >
              <input
                type="radio"
                name="export-scope"
                value={id}
                checked={exportScope === id}
                onChange={(e) => setExportScope(e.target.value)}
              />
              <span className="opacity-70">{label}</span>
            </label>
          ))}
        </div>

        <h6 className="font-medium mt-5">Export As</h6>
        <div className="flex flex-col gap-y-2 mt-2">
          {[
            { id: "csv", label: "CSV" },
            { id: "pdf", label: "PDF" },
            { id: "txt", label: "Plain Text" },
          ].map(({ id, label }) => (
            <label
              key={id}
              className="flex gap-x-3 items-center text-sm cursor-pointer"
            >
              <input
                type="radio"
                name="export-type"
                value={id}
                checked={exportType === id}
                onChange={(e) => setExportType(e.target.value)}
              />
              <span className="opacity-70">{label}</span>
            </label>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-end gap-x-3 text-sm">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 hover:underline"
          >
            Cancel
          </button>
          <button
            disabled={!exportScope || !exportType}
            onClick={handleExport}
            className={`px-5 py-3 rounded-lg text-white ${
              !exportScope || !exportType
                ? "bg-orange-300 cursor-not-allowed"
                : "bg-defaultOrange hover:bg-orange-600"
            }`}
          >
            Export
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
