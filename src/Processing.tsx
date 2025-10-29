interface ProcessingProps {
  fileName: string;
}

export const Processing: React.FC<ProcessingProps> = ({ fileName }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl p-12 sm:p-16 border border-gray-100">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-32 h-32 mb-8">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 border-r-blue-600 rounded-full animate-spin"></div>

            <div
              className="absolute inset-3 border-4 border-transparent border-t-blue-500 border-l-cyan-500 rounded-full animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-linear-to-br from-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Signing Your Document
          </h2>

          <p className="text-lg text-gray-600 mb-3 max-w-md leading-relaxed">
            Your PDF is being processed and digitally signed with a secure
            signature
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200 mb-8">
            <svg
              className="w-4 h-4 text-blue-600"
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
            <p className="text-sm text-blue-700 font-medium truncate max-w-xs sm:max-w-md">
              {fileName}
            </p>
          </div>

          <div className="w-full max-w-md space-y-4">
            <div className="flex items-center gap-4 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0 shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  strokeWidth={2}
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">Document Uploaded</p>
                <p className="text-sm text-gray-600">
                  File received successfully
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-300 shadow-lg">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-600 to-blue-600 flex items-center justify-center shrink-0 shadow-lg animate-pulse">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-gray-900">
                  Adding Digital Signature
                </p>
                <p className="text-sm text-blue-700 font-medium">
                  Processing your document...
                </p>
              </div>
              <div className="shrink-0">
                <svg
                  className="animate-spin h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center shrink-0">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-500">
                  Preparing Download
                </p>
                <p className="text-sm text-gray-400">
                  Finalizing your signed PDF
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-gray-50 to-gray-100 rounded-full border border-gray-200">
            <svg
              className="w-5 h-5 text-gray-600"
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
            <p className="text-sm text-gray-600 font-medium">
              This process typically takes just a few seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
