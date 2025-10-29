import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export class MockSigningServer {
  static async signPDF(file: File): Promise<File> {
    // Simulate network delay
    await this.delay(2000);

    // Read the PDF file
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);

    // Get the first page to add signature
    const pages = pdfDoc.getPages();
    const lastPage = pages[pages.length - 1];
    const { width } = lastPage.getSize();

    // Embed font
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const smallFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Add signature box
    const boxWidth = 200;
    const boxHeight = 80;
    const margin = 20;
    const x = width - boxWidth - margin;
    const y = margin;

    // Draw signature background
    lastPage.drawRectangle({
      x,
      y,
      width: boxWidth,
      height: boxHeight,
      borderColor: rgb(0.2, 0.4, 0.8),
      borderWidth: 2,
      color: rgb(0.95, 0.97, 1),
    });

    // Add "DIGITALLY SIGNED" text
    lastPage.drawText('DIGITALLY SIGNED', {
      x: x + 10,
      y: y + boxHeight - 25,
      size: 12,
      font,
      color: rgb(0.2, 0.4, 0.8),
    });

    // Add signature details
    const signatureDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    lastPage.drawText(`Date: ${signatureDate}`, {
      x: x + 10,
      y: y + boxHeight - 45,
      size: 9,
      font: smallFont,
      color: rgb(0.3, 0.3, 0.3),
    });

    lastPage.drawText('Authorized Signatory', {
      x: x + 10,
      y: y + boxHeight - 60,
      size: 9,
      font: smallFont,
      color: rgb(0.3, 0.3, 0.3),
    });

    // Add signature ID
    const signatureId = this.generateSignatureId();
    lastPage.drawText(`ID: ${signatureId}`, {
      x: x + 10,
      y: y + 10,
      size: 7,
      font: smallFont,
      color: rgb(0.5, 0.5, 0.5),
    });

    // Save the modified PDF
    const signedPdfBytes = await pdfDoc.save();

    // Create a new File object with the signed PDF
    // Use type assertion to handle ArrayBufferLike compatibility
    const signedFile = new File(
      [signedPdfBytes.buffer as ArrayBuffer],
      file.name.replace('.pdf', '_signed.pdf'),
      { type: 'application/pdf' }
    );

    return signedFile;
  }

  private static generateSignatureId(): string {
    return `SIG-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }

    // Simulates network delay
   
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
