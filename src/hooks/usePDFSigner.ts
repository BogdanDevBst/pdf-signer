"use client";

import { useState, useCallback } from "react";
import type { AppStage } from "@/types/pdf.types";
import { signPDF } from "@/services/signingService";

export function usePDFSigner() {
    const [stage, setStage] = useState<AppStage>("upload");
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [signedFile, setSignedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [signAllPages, setSignAllPages] = useState<boolean>(false);

    const handleFileSelect = useCallback(async (file: File) => {
        setOriginalFile(file);
        setError(null);
        setStage("processing");

        try {
            const signed = await signPDF(file, signAllPages);
            setSignedFile(signed);
            setStage("viewing");
        } catch (err) {
            console.error("Error signing PDF:", err);
            setError("Failed to sign the PDF. Please try again.");
            setStage("upload");
        }
    }, [signAllPages]);

    const onToggleSignAll = useCallback((value: boolean) => {
        setSignAllPages(value);
    }, []);

    const handleBack = useCallback(() => {
        setStage("upload");
        setOriginalFile(null);
        setSignedFile(null);
        setError(null);
        setSignAllPages(false);
    }, []);

    return {
        stage,
        originalFile,
        signedFile,
        error,
        signAllPages,
        handleFileSelect,
        handleBack,
        onToggleSignAll,
    };
}
