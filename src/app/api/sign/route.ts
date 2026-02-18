import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const runtime = "nodejs";

/**
 * POST /api/sign
 *
 * Receives a PDF file via multipart/form-data, adds a digital signature
 * stamp using pdf-lib (server-side Node.js), and returns the signed PDF.
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
        const pdfDoc = await PDFDocument.load(arrayBuffer);

        // Embed fonts
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const smallFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // Prepare signature date
        const signatureDate = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        const signatureId = generateSignatureId();

        // Get all pages
        const pages = pdfDoc.getPages();

        // Determine which pages to sign
        const pagesToSign = signAllPages ? pages : [pages[pages.length - 1]];

        // Apply signature to selected pages
        for (const page of pagesToSign) {
            const { width } = page.getSize();

            // Signature box dimensions
            const boxWidth = 220;
            const boxHeight = 90;
            const margin = 20;
            const x = width - boxWidth - margin;
            const y = margin;

            // Draw signature background
            page.drawRectangle({
                x,
                y,
                width: boxWidth,
                height: boxHeight,
                borderColor: rgb(0.2, 0.4, 0.8),
                borderWidth: 2,
                color: rgb(0.95, 0.97, 1),
            });

            // "DIGITALLY SIGNED" header
            page.drawText("DIGITALLY SIGNED", {
                x: x + 10,
                y: y + boxHeight - 22,
                size: 12,
                font,
                color: rgb(0.2, 0.4, 0.8),
            });

            // Divider line
            page.drawLine({
                start: { x: x + 10, y: y + boxHeight - 28 },
                end: { x: x + boxWidth - 10, y: y + boxHeight - 28 },
                thickness: 0.5,
                color: rgb(0.2, 0.4, 0.8),
            });

            // Signature date
            page.drawText(`Date: ${signatureDate}`, {
                x: x + 10,
                y: y + boxHeight - 44,
                size: 9,
                font: smallFont,
                color: rgb(0.3, 0.3, 0.3),
            });

            // Signatory
            page.drawText("Authorized Signatory", {
                x: x + 10,
                y: y + boxHeight - 58,
                size: 9,
                font: smallFont,
                color: rgb(0.3, 0.3, 0.3),
            });

            // Signature ID
            page.drawText(`ID: ${signatureId}`, {
                x: x + 10,
                y: y + 10,
                size: 7,
                font: smallFont,
                color: rgb(0.5, 0.5, 0.5),
            });
        }

        // Save the signed PDF
        const signedPdfBytes = await pdfDoc.save();
        // Convert Uint8Array to Buffer for NextResponse compatibility
        const signedBuffer = Buffer.from(signedPdfBytes);

        return new NextResponse(signedBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "inline",
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

function generateSignatureId(): string {
    return `SIG-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 11)
        .toUpperCase()}`;
}
