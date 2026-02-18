"use client";

import dynamic from "next/dynamic";
import { FileUpload } from "@/components/FileUpload";
import { Processing } from "@/components/Processing";
const PDFViewer = dynamic(() => import("@/components/PDFViewer").then(mod => mod.PDFViewer), {
    ssr: false,
    loading: () => (
        <div className="w-full max-w-5xl mx-auto p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600 mx-auto mb-4" />
            <p className="text-gray-600">Initializing viewer...</p>
        </div>
    ),
});
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { Footer } from "@/components/ui/Footer";
import { usePDFSigner } from "@/hooks/usePDFSigner";

export default function Home() {
    const {
        stage,
        originalFile,
        signedFile,
        error,
        signAllPages,
        handleFileSelect,
        handleBack,
        onToggleSignAll,
    } = usePDFSigner();

    return (
        <div className="min-h-screen flex flex-col bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100">
            <main className="flex-grow py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {error && <ErrorBanner message={error} />}

                    <div className="flex flex-col items-center">
                        {stage === "upload" && (
                            <FileUpload
                                onFileSelect={handleFileSelect}
                                isProcessing={false}
                                signAllPages={signAllPages}
                                onToggleSignAll={onToggleSignAll}
                            />
                        )}

                        {stage === "processing" && originalFile && (
                            <Processing fileName={originalFile.name} />
                        )}

                        {stage === "viewing" && signedFile && (
                            <PDFViewer file={signedFile} onBack={handleBack} />
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
