export interface PDFState {
  originalFile: File | null;
  signedFile: File | null;
  isProcessing: boolean;
  error: string | null;
  uploadProgress: number;
}

export type AppStage = 'upload' | 'processing' | 'viewing';
