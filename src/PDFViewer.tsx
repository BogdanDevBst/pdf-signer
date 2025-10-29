import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Configure PDF.js worker - using a more reliable CDN source
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface PDFViewerProps {
  file: File;
  onBack: () => void;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ file, onBack }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");

  useEffect(() => {
    // Create a URL for the file
    const url = URL.createObjectURL(file);
    setFileUrl(url);

    // Cleanup URL when component unmounts
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  useEffect(() => {
    // Calculate page width based on screen size with proper mobile handling
    const updateWidth = () => {
      const container = document.getElementById("pdf-container");
      if (container) {
        // Use 95% of container width for better mobile display
        const width = Math.min(container.offsetWidth * 0.95, 800);
        setPageWidth(width);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error("Error loading PDF:", error);
    setError("Failed to load PDF. Please try uploading again.");
    setLoading(false);
  };

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <button
              onClick={onBack}
              className="shrink-0 px-5 py-2.5 bg-linear-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </span>
            </button>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-green-600 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {file.name}
              </h2>
              <p className="text-sm text-green-600 font-medium mt-1">
                ✓ Successfully signed
              </p>
            </div>
          </div>
          <button
            onClick={downloadPDF}
            className="shrink-0 px-6 py-2.5 bg-linear-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </span>
          </button>
        </div>
      </div>

      {/* PDF Display */}
      <div
        id="pdf-container"
        className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6 border border-gray-100"
      >
        {loading && !error && (
          <div className="py-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-indigo-600 to-blue-600 rounded-2xl mb-6 shadow-lg animate-pulse">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mx-auto mb-4"></div>
            <p className="text-lg font-semibold text-gray-700">
              Loading your signed PDF...
            </p>
            <p className="text-sm text-gray-500 mt-2">
              This should only take a moment
            </p>
          </div>
        )}

        {error && (
          <div className="py-16 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-6">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold text-red-600 mb-2">{error}</p>
            <button
              onClick={onBack}
              className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Go Back
            </button>
          </div>
        )}

        {!error && fileUrl && (
          <div className="flex flex-col items-center">
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading=""
              className="flex justify-center"
            >
              <Page
                pageNumber={pageNumber}
                width={pageWidth || undefined}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="shadow-2xl rounded-lg overflow-hidden"
              />
            </Document>
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      {numPages > 0 && !error && (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="px-6 py-3 bg-linear-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 active:scale-95 disabled:transform-none"
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </span>
            </button>

            <div className="flex items-center gap-3">
              <div className="text-center bg-linear-to-r from-gray-50 to-gray-100 px-6 py-3 rounded-xl border border-gray-200">
                <p className="text-sm text-gray-600 font-medium">Page</p>
                <p className="text-xl font-bold text-gray-900">
                  {pageNumber} <span className="text-gray-400">/</span>{" "}
                  {numPages}
                </p>
              </div>
            </div>

            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="px-6 py-3 bg-linear-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 active:scale-95 disabled:transform-none"
            >
              <span className="flex items-center gap-2">
                Next
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
