import { NextRequest, NextResponse } from "next/server";
import { signPDF } from "@/services/pdf.server";

export const runtime = "nodejs";

/**
 * POST /api/sign
 *
 * Receives a PDF file via multipart/form-data, adds a digital signature
 * stamp using the server-side signing service, and returns the signed PDF.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const formData = await request.formData();
        const file = formData.get("file");
        const signAllPages = formData.get("signAllPages") === "true";

        if (!file || !(file instanceof Blob)) {
            return NextResponse.json(
                { error: "No PDF file provided" },
                { status: 400 }
            );
        }

        // Validate MIME type
        if (file.type !== "application/pdf") {
            return NextResponse.json(
                { error: "File must be a PDF" },
                { status: 400 }
            );
        }

        // Read the PDF bytes
        const arrayBuffer = await file.arrayBuffer();

        // Sign the PDF using the service
        const signedPdfBytes = await signPDF(arrayBuffer, signAllPages);

        // Convert Uint8Array to Buffer for compatibility with Next.js Response body
        const signedBuffer = Buffer.from(signedPdfBytes);

        return new NextResponse(signedBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "inline", // Display in browser if possible
            },
        });
    } catch (error) {
        console.error("PDF signing error:", error);
        return NextResponse.json(
            { error: "Failed to sign PDF. Please try again." },
            { status: 500 }
        );
    }
}
