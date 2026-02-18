"use client";

import { useRef, useState } from "react";
import type { DragEvent, ChangeEvent } from "react";
import type { FileUploadProps } from "@/types/components.types";

export const FileUpload: React.FC<FileUploadProps> = ({
    onFileSelect,
    isProcessing,
    signAllPages,
    onToggleSignAll,
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Drag and Drop event handlers to provide visual feedback and capture files
    const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true); // Update state to show "Release to Upload" UI
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files && files[0]) handleFile(files[0]);
    };

    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) handleFile(files[0]);
    };

    /**
     * Common file handling logic for both input change and drag-and-drop.
     * Enforces PDF type and a 10MB size limit.
     */
    const handleFile = (file: File) => {
        if (file.type !== "application/pdf") {
            alert("Please upload a PDF file");
            return;
        }
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (file.size > maxSize) {
            alert("File size must be less than 10MB");
            return;
        }
        onFileSelect(file);
    };

    const handleClick = (e: React.MouseEvent) => {
        // Only click if we didn't click the checkbox group
        if (!(e.target as HTMLElement).closest(".checkbox-group")) {
            fileInputRef.current?.click();
        }
    };

    return (
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-0">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-linear-to-br from-indigo-600 via-blue-600 to-cyan-500 rounded-xl sm:rounded-2xl mb-4 sm:mb-6 shadow-xl">
                    <svg
                        className="w-6 h-6 sm:w-8 sm:h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                    Digital PDF Signature
                </h1>
                <p className="text-sm sm:text-base text-gray-500 max-w-sm mx-auto">
                    Upload your document and sign it instantly
                </p>
            </div>

            {/* Upload Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-4 sm:p-6 lg:p-8">
                    <div
                        onClick={handleClick}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`
              relative border-2 border-dashed rounded-xl sm:rounded-2xl
              p-8 sm:p-10 lg:p-12 cursor-pointer
              transition-all duration-300 ease-out
              ${isDragging
                                ? "border-blue-500 bg-linear-to-br from-blue-50 to-indigo-50 scale-[1.01] shadow-xl"
                                : "border-gray-300 bg-linear-to-br from-gray-50 to-white hover:border-blue-400 hover:shadow-lg"
                            }
              ${isProcessing ? "opacity-50 cursor-not-allowed" : ""}
            `}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleFileInput}
                            className="hidden"
                            disabled={isProcessing}
                        />

                        <div className="flex flex-col items-center text-center">
                            {/* Icon */}
                            <div
                                className={`
                  relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl
                  flex items-center justify-center mb-6
                  transition-all duration-300
                  ${isDragging
                                        ? "bg-linear-to-br from-blue-500 to-indigo-600 scale-110 rotate-3"
                                        : "bg-linear-to-br from-gray-100 to-gray-200"
                                    }
                `}
                            >
                                <svg
                                    className={`w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300 ${isDragging ? "text-white" : "text-gray-400"
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                            </div>

                            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                                {isDragging ? "Release to Upload" : "Upload Document"}
                            </h2>

                            <p className="text-sm sm:text-base text-gray-600 mb-6 max-w-xs sm:max-w-md leading-relaxed">
                                {isDragging ? "Drop your file here" : "Drag and drop or tap to select"}
                            </p>

                            <div className="checkbox-group mb-6 flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                                <input
                                    type="checkbox"
                                    id="signAllPages"
                                    checked={signAllPages}
                                    onChange={(e) => onToggleSignAll(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                                />
                                <label htmlFor="signAllPages" className="text-sm sm:text-base font-semibold text-gray-700 cursor-pointer select-none">
                                    Sign all pages
                                </label>
                            </div>

                            <button
                                type="button"
                                disabled={isProcessing}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClick(e);
                                }}
                                className="group relative px-6 sm:px-8 py-2.5 sm:py-3.5 bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white text-sm sm:text-base font-semibold rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 min-h-[44px]"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                                        />
                                    </svg>
                                    Choose PDF
                                </span>
                            </button>

                            <p className="text-xs sm:text-sm text-gray-500 mt-4 flex items-center gap-1.5">
                                Maximum 10MB
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
