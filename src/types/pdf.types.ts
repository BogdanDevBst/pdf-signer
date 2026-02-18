/**
 * Possible stages of the application flow.
 */
export type AppStage = "upload" | "processing" | "viewing";

/**
 * Interface representing the state of the PDF signing process.
 */
export interface PDFState {
    /** The original PDF file uploaded by the user. */
    originalFile: File | null;
    /** The signed PDF file returned from the server. */
    signedFile: File | null;
    /** Whether a background process is currently running. */
    isProcessing: boolean;
    /** Error message to display to the user, if any. */
    error: string | null;
    /** Progress of the upload/signing operation (0-100). */
    uploadProgress: number;
}
