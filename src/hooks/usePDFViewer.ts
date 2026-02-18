"use client";

import { useState, useEffect, useCallback } from "react";

export function usePDFViewer(file: File) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageWidth, setPageWidth] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [fileUrl, setFileUrl] = useState<string>("");

    // Create object URL for the file
    useEffect(() => {
        const url = URL.createObjectURL(file);
        setFileUrl(url);
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    // Responsive page width based on container
    useEffect(() => {
        const updateWidth = () => {
            const container = document.getElementById("pdf-container");
            if (container) {
                const width = Math.min(container.offsetWidth * 0.95, 800);
                setPageWidth(width);
            }
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const onDocumentLoadSuccess = useCallback(
        ({ numPages }: { numPages: number }) => {
            setNumPages(numPages);
            setLoading(false);
            setError(null);
        },
        []
    );

    const onDocumentLoadError = useCallback((err: Error) => {
        console.error("Error loading PDF:", err);
        setError("Failed to load PDF. Please try uploading again.");
        setLoading(false);
    }, []);

    const goToPrevPage = useCallback(() => {
        setPageNumber((prev) => Math.max(prev - 1, 1));
    }, []);

    const goToNextPage = useCallback(
        () => {
            setPageNumber((prev) => Math.min(prev + 1, numPages));
        },
        [numPages]
    );

    const downloadPDF = useCallback(() => {
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [fileUrl, file.name]);

    return {
        numPages,
        pageNumber,
        pageWidth,
        loading,
        error,
        fileUrl,
        onDocumentLoadSuccess,
        onDocumentLoadError,
        goToPrevPage,
        goToNextPage,
        downloadPDF,
    };
}
