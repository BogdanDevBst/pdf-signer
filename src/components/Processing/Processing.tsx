import type { ProcessingProps } from "@/types/components.types";

export const Processing: React.FC<ProcessingProps> = ({ fileName }) => {
    return (
        <div className="w-full max-w-3xl mx-auto px-4 sm:px-0">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10 border border-gray-100">
                <div className="flex flex-col items-center text-center">
                    {/* Animated spinner */}
                    <div className="relative w-16 h-16 sm:w-24 sm:h-24 mb-6 sm:mb-8">
                        <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
                        <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 border-r-blue-600 rounded-full animate-spin" />
                        <div
                            className="absolute inset-2 sm:inset-3 border-4 border-transparent border-t-blue-500 border-l-cyan-500 rounded-full animate-spin"
                            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-linear-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                <svg
                                    className="w-4 h-4 sm:w-6 sm:h-6 text-white"
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

                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                        Signing Your Document
                    </h2>

                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-sm sm:max-w-md leading-relaxed">
                        Your PDF is being processed and digitally signed
                    </p>

                    {/* File name badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:py-2 bg-linear-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-200 mb-6 sm:mb-8 max-w-full">
                        <svg
                            className="w-3.5 h-3.5 text-blue-600 shrink-0"
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
                        <p className="text-[10px] sm:text-xs text-blue-700 font-medium truncate max-w-[150px] sm:max-w-xs lg:max-w-md">
                            {fileName}
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="w-full max-w-xs sm:max-w-md space-y-3 sm:space-y-4">
                        {/* Step 1 — Done */}
                        <div className="flex items-center gap-3 p-3 sm:p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0 shadow-md">
                                <svg
                                    className="w-4 h-4 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight">Document Uploaded</p>
                            </div>
                        </div>

                        {/* Step 2 — In Progress */}
                        <div className="flex items-center gap-3 p-3 sm:p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-600 to-blue-600 flex items-center justify-center shrink-0 animate-pulse">
                                <div className="w-2.5 h-2.5 bg-white rounded-full" />
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-bold text-gray-900 text-xs sm:text-sm leading-tight">Digital Signature</p>
                            </div>
                            <div className="shrink-0">
                                <svg
                                    className="animate-spin h-4 w-4 text-blue-600"
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
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Step 3 — Pending */}
                        <div className="flex items-center gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="w-8 h-8 rounded-full bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center shrink-0">
                                <div className="w-2.5 h-2.5 bg-gray-400 rounded-full" />
                            </div>
                            <div className="flex-1 text-left">
                                <p className="font-semibold text-gray-500 text-xs sm:text-sm leading-tight">Preparing Download</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 sm:mt-8 inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-gray-50 to-gray-100 rounded-full border border-gray-100">
                        <svg
                            className="w-4 h-4 text-gray-500"
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
                        <p className="text-xs text-gray-500 font-medium">
                            Usually takes just a few seconds
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
