export const Footer: React.FC = () => {
    return (
        <footer className="text-center pb-2 sm:pb-0">
            <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-linear-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center">
                    <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white"
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
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                    Secure Digital Signature Platform
                </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4">
                Powered by advanced PDF technology
            </p>
        </footer>
    );
};
