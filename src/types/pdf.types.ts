// PDF state and stage types
export type AppStage = "upload" | "processing" | "viewing";

export interface PDFState {
    originalFile: File | null;
    signedFile: File | null;
    isProcessing: boolean;
    error: string | null;
    uploadProgress: number;
}
