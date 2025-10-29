import { useState } from "react";
import { FileUpload } from "./FileUpload";
import { Processing } from "./Processing";
import { PDFViewer } from "./PDFViewer";
import { MockSigningServer } from "./mockServer";
import type { AppStage } from "./types";

function App() {
  const [stage, setStage] = useState<AppStage>("upload");
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [signedFile, setSignedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setOriginalFile(file);
    setError(null);
    setStage("processing");

    try {
      // Send to mock server for signing
      const signed = await MockSigningServer.signPDF(file);
      setSignedFile(signed);
      setStage("viewing");
    } catch (err) {
      console.error("Error signing PDF:", err);
      setError("Failed to sign the PDF. Please try again.");
      setStage("upload");
    }
  };

  const handleBack = () => {
    setStage("upload");
    setOriginalFile(null);
    setSignedFile(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-6 p-5 bg-linear-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl shadow-lg animate-pulse">
            <div className="flex items-center gap-3">
              <div className="shrink-0 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              <div className="flex-1">
                <p className="text-red-900 font-semibold text-lg">{error}</p>
                <p className="text-red-700 text-sm mt-1">
                  Please try uploading your document again
                </p>
              </div>
            </div>
          </div>
        )}

        {stage === "upload" && (
          <FileUpload onFileSelect={handleFileSelect} isProcessing={false} />
        )}

        {stage === "processing" && originalFile && (
          <Processing fileName={originalFile.name} />
        )}

        {stage === "viewing" && signedFile && (
          <PDFViewer file={signedFile} onBack={handleBack} />
        )}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200">
          <div className="w-8 h-8 bg-linear-to-br from-indigo-600 to-blue-600 rounded-full flex items-center justify-center">
            <svg
              className="w-4 h-4 text-white"
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
          <span className="text-sm font-semibold text-gray-700">
            Secure Digital Signature Platform
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-4">
          Powered by advanced PDF technology
        </p>
      </footer>
    </div>
  );
}

export default App;
