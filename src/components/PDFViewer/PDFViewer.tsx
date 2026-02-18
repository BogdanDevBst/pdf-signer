"use client";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import type { PDFViewerProps } from "@/types/components.types";
import { usePDFViewer } from "@/hooks/usePDFViewer";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const PDFViewer: React.FC<PDFViewerProps> = ({ file, onBack }) => {
    const {
        numPages,
        pageNumber,
        pageWidth,
        loading,
        error,
        fileUrl,
        onDocumentLoadSuccess,
        onDocumentLoadError,
        goToPrevPage,
        goToNextPage,
        downloadPDF,
    } = usePDFViewer(file);

    return (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-0 h-full flex flex-col">
            {/* Toolbar */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 mb-4 sm:mb-6 border border-gray-100">
                <div className="flex items-center justify-between gap-3">
                    <button
                        onClick={onBack}
                        className="px-4 py-2 bg-linear-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-200 font-semibold shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95"
                    >
                        <span className="flex items-center gap-2">
                            <svg
                                className="w-4 h-4"
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

                    <div className="flex-1 min-w-0 text-center">
                        <p className="text-sm font-medium text-gray-500 truncate">{file.name}</p>
                    </div>

                    <button
                        onClick={downloadPDF}
                        className="px-5 py-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-200 font-bold shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95"
                    >
                        <span className="flex items-center gap-2">
                            <svg
                                className="w-4 h-4"
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

            {/* PDF Container */}
            <div
                id="pdf-container"
                className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 border border-gray-100 overflow-hidden"
            >
                {loading && !error && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-indigo-600 to-blue-600 rounded-xl mb-4 shadow-lg animate-pulse">
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
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-100 border-t-blue-600 mx-auto mb-4" />
                        <p className="text-lg font-semibold text-gray-700">
                            Loading your signed PDF...
                        </p>
                    </div>
                )}

                {error && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 rounded-xl mb-4">
                            <svg
                                className="w-6 h-6 text-red-600"
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
                        <p className="text-red-600 mb-4 font-medium">{error}</p>
                        <button
                            onClick={onBack}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
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
                            className="flex justify-center w-full"
                        >
                            <Page
                                pageNumber={pageNumber}
                                width={pageWidth || undefined}
                                renderTextLayer={false}
                                renderAnnotationLayer={false}
                                className="shadow-lg rounded-lg overflow-hidden max-w-full h-auto"
                            />
                        </Document>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {numPages > 0 && !error && (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-2 sm:p-3 border border-gray-100 shrink-0">
                    <div className="flex items-center justify-between gap-2">
                        <button
                            onClick={goToPrevPage}
                            disabled={pageNumber <= 1}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 disabled:from-gray-200 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md disabled:shadow-none transform hover:scale-105 active:scale-95 disabled:transform-none min-h-[40px] text-xs sm:text-sm"
                        >
                            <span className="flex items-center gap-1">
                                <svg
                                    className="w-3.5 h-3.5"
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
                                <span>Prev</span>
                            </span>
                        </button>

                        <div className="text-center bg-gray-50 px-3 sm:px-4 py-1 rounded-lg border border-gray-100">
                            <p className="text-[10px] text-gray-500 font-medium">Page</p>
                            <p className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                                {pageNumber} <span className="text-gray-400">/</span> {numPages}
                            </p>
                        </div>

                        <button
                            onClick={goToNextPage}
                            disabled={pageNumber >= numPages}
                            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 disabled:from-gray-200 disabled:to-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-semibold shadow-md disabled:shadow-none transform hover:scale-105 active:scale-95 disabled:transform-none min-h-[40px] text-xs sm:text-sm"
                        >
                            <span className="flex items-center gap-1">
                                <span>Next</span>
                                <svg
                                    className="w-3.5 h-3.5"
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
