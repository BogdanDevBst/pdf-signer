import { useRef, useState } from "react";
import type { DragEvent, ChangeEvent } from "react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  isProcessing,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
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
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File size must be less than 10MB");
      return;
    }

    onFileSelect(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl mb-6 shadow-2xl">
          <svg
            className="w-10 h-10 text-white"
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
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Digital PDF Signature
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Transform your documents with professional digital signatures. Fast,
          secure, and effortless.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Upload Area */}
        <div className="p-8 sm:p-12">
          <div
            onClick={handleClick}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-3 border-dashed rounded-2xl p-12 sm:p-16 cursor-pointer
              transition-all duration-300 ease-out
              ${
                isDragging
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
              {/* Upload Icon */}
              <div
                className={`
                relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center mb-8
                transition-all duration-300
                ${
                  isDragging
                    ? "bg-linear-to-br from-blue-500 to-indigo-600 scale-110 rotate-3"
                    : "bg-linear-to-br from-gray-100 to-gray-200"
                }
              `}
              >
                <svg
                  className={`w-14 h-14 sm:w-16 sm:h-16 transition-all duration-300 ${
                    isDragging ? "text-white" : "text-gray-400"
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

                {/* Animated Ring */}
                {isDragging && (
                  <div className="absolute inset-0 rounded-2xl border-4 border-blue-400 animate-ping opacity-75"></div>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {isDragging ? "Release to Upload" : "Upload Your Document"}
              </h2>

              <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-md leading-relaxed">
                Drag and drop your PDF file here, or click the button below to
                select from your device
              </p>

              {/* CTA Button */}
              <button
                type="button"
                disabled={isProcessing}
                className="group relative px-10 py-4 bg-linear-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white text-lg font-semibold rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
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
                  Choose PDF File
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-cyan-600 via-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <p className="text-sm text-gray-500 mt-6 flex items-center gap-2">
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
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                PDF format only • Maximum 10MB
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 px-8 py-10 border-t border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-linear-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                Lightning Fast
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Sign your documents in seconds with our optimized processing
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                Secure & Safe
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your documents are protected with industry-standard encryption
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                Mobile Ready
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Works seamlessly on any device - phone, tablet, or desktop
              </p>
            </div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="px-8 py-10 bg-white">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How It Works
          </h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-center gap-6 sm:gap-4 max-w-3xl mx-auto">
            {/* Step 1 */}
            <div className="flex items-center gap-3 flex-1">
              <div className="shrink-0 w-10 h-10 bg-linear-to-br from-indigo-600 to-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                1
              </div>
              <div>
                <p className="font-semibold text-gray-900">Upload PDF</p>
                <p className="text-sm text-gray-600">Select your document</p>
              </div>
            </div>

            {/* Arrow */}
            <svg
              className="hidden sm:block w-8 h-8 text-gray-300 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>

            {/* Step 2 */}
            <div className="flex items-center gap-3 flex-1">
              <div className="shrink-0 w-10 h-10 bg-linear-to-br from-blue-600 to-cyan-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                2
              </div>
              <div>
                <p className="font-semibold text-gray-900">Auto-Sign</p>
                <p className="text-sm text-gray-600">
                  Digital signature applied
                </p>
              </div>
            </div>

            {/* Arrow */}
            <svg
              className="hidden sm:block w-8 h-8 text-gray-300 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>

            {/* Step 3 */}
            <div className="flex items-center gap-3 flex-1">
              <div className="shrink-0 w-10 h-10 bg-linear-to-br from-cyan-600 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg">
                3
              </div>
              <div>
                <p className="font-semibold text-gray-900">Download</p>
                <p className="text-sm text-gray-600">Get your signed PDF</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="text-center mt-8">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-lg border border-gray-200">
          <div className="w-8 h-8 bg-linear-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-700">
            Trusted by thousands of users worldwide
          </span>
        </div>
      </div>
    </div>
  );
};
