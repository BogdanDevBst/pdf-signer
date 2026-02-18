import type { ErrorBannerProps } from "@/types/components.types";

export const ErrorBanner: React.FC<ErrorBannerProps> = ({ message }) => {
    return (
        <div className="mb-4 sm:mb-6 p-4 sm:p-5 bg-linear-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-xl sm:rounded-2xl shadow-lg animate-pulse">
            <div className="flex items-start sm:items-center gap-3">
                <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-red-500 rounded-full flex items-center justify-center mt-0.5 sm:mt-0">
                    <svg
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-red-900 font-semibold text-base sm:text-lg">{message}</p>
                    <p className="text-red-700 text-xs sm:text-sm mt-1">
                        Please try uploading your document again
                    </p>
                </div>
            </div>
        </div>
    );
};
