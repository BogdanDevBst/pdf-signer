// Component prop interfaces

export interface FileUploadProps {
    onFileSelect: (file: File) => void;
    isProcessing: boolean;
    signAllPages: boolean;
    onToggleSignAll: (value: boolean) => void;
}

export interface ProcessingProps {
    fileName: string;
}

export interface PDFViewerProps {
    file: File;
    onBack: () => void;
}

export interface ErrorBannerProps {
    message: string;
}
