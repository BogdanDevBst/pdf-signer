"use client";

import { useState, useEffect, useCallback } from "react";

export function usePDFViewer(file: File) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageWidth, setPageWidth] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [fileUrl, setFileUrl] = useState<string>("");

    // Create object URL for the file to be used as a source for the PDF viewer.
    // We must revoke the URL when the component unmounts or the file changes to prevent memory leaks.
    useEffect(() => {
        const url = URL.createObjectURL(file);
        setFileUrl(url);
        return () => {
            URL.revokeObjectURL(url);
        };
    }, [file]);

    // Responsive page width logic:
    // Calculates the available width in the #pdf-container and adjusts the PDF page width.
    // This allows the viewer to be responsive without complex CSS hacks.
    useEffect(() => {
        const updateWidth = () => {
            const container = document.getElementById("pdf-container");
            if (container) {
                // Use 95% of the container width to provide some internal padding,
                // capped at 800px for better legibility on ultra-wide screens.
                const width = Math.min(container.offsetWidth * 0.95, 800);
                setPageWidth(width);
            }
        };
        updateWidth();
        window.addEventListener("resize", updateWidth); // Listen for window resize to update width
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
