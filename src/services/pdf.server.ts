import { PDFDocument, StandardFonts } from "pdf-lib";
import { SIGNATURE_STAMP } from "../constants/pdf";

/**
 * Generates a unique, human-readable signature ID for tracking.
 */
function generateSignatureId(): string {
    return `SIG-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 11)
        .toUpperCase()}`;
}

/**
 * Signs a PDF document by adding a digital stamp to specified pages.
 */
export async function signPDF(
    pdfBuffer: ArrayBuffer,
    signAllPages: boolean
): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.load(pdfBuffer);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const smallFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const signatureDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const signatureId = generateSignatureId();

    const pages = pdfDoc.getPages();
    const pagesToSign = signAllPages ? pages : [pages[pages.length - 1]];

    const { BOX, HEADER, DIVIDER, DATE, TITLE, ID } = SIGNATURE_STAMP;

    for (const page of pagesToSign) {
        const { width } = page.getSize();
        const x = width - BOX.WIDTH - BOX.MARGIN;
        const y = BOX.MARGIN;

        // Draw background
        page.drawRectangle({
            x,
            y,
            width: BOX.WIDTH,
            height: BOX.HEIGHT,
            borderColor: BOX.BORDER_COLOR,
            borderWidth: BOX.BORDER_WIDTH,
            color: BOX.BG_COLOR,
        });

        // "DIGITALLY SIGNED" header
        page.drawText(HEADER.TEXT, {
            x: x + 10,
            y: y + BOX.HEIGHT - 22,
            size: HEADER.SIZE,
            font,
            color: HEADER.COLOR,
        });

        // Divider line
        page.drawLine({
            start: { x: x + 10, y: y + BOX.HEIGHT - 28 },
            end: { x: x + BOX.WIDTH - 10, y: y + BOX.HEIGHT - 28 },
            thickness: DIVIDER.THICKNESS,
            color: DIVIDER.COLOR,
        });

        // Date
        page.drawText(`Date: ${signatureDate}`, {
            x: x + 10,
            y: y + BOX.HEIGHT - 44,
            size: DATE.SIZE,
            font: smallFont,
            color: DATE.COLOR,
        });

        // Signatory title
        page.drawText(TITLE.TEXT, {
            x: x + 10,
            y: y + BOX.HEIGHT - 58,
            size: TITLE.SIZE,
            font: smallFont,
            color: TITLE.COLOR,
        });

        // Unique tracking ID
        page.drawText(`ID: ${signatureId}`, {
            x: x + 10,
            y: y + 10,
            size: ID.SIZE,
            font: smallFont,
            color: ID.COLOR,
        });
    }

    return await pdfDoc.save();
}
