/**
 * Client-side signing service.
 * Sends the PDF to the Next.js API route for server-side signing.
 */
export async function signPDF(file: File, signAllPages: boolean): Promise<File> {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("signAllPages", String(signAllPages));

    const response = await fetch("/api/sign", {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
            (errorData as { error?: string }).error ?? "Failed to sign PDF"
        );
    }

    const signedBytes = await response.arrayBuffer();
    const signedFileName = file.name.replace(/\.pdf$/i, "_signed.pdf");

    return new File([signedBytes], signedFileName, { type: "application/pdf" });
}
