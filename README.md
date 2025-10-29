# Mobile PDF Signer

A mobile-friendly web application that allows users to upload PDF documents, send them to a mock server for digital signing, and view the signed PDFs directly on their device.

## Features

- **PDF Upload**: Drag-and-drop or click to upload PDF files from mobile devices
- **Mock Signing Server**: Simulates server-side PDF signing by adding a digital signature stamp
- **PDF Viewer**: Display signed PDFs with page navigation and download functionality
- **Fully Responsive**: Optimized for mobile phones, tablets, and desktop devices
- **TypeScript**: Fully typed for better development experience and code reliability

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **react-pdf** - PDF rendering in the browser
- **pdf-lib** - PDF manipulation for adding signatures

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <https://github.com/BogdanDevBst/pdf-signer>
cd pdf-signer
```

2. Install dependencies:

```bash
npm install
```

## Development

To run the application in development mode:

```bash
npm run dev
```

This will start the Vite development server. The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

The development server includes:

- Hot Module Replacement (HMR) for instant updates
- Fast refresh for React components
- TypeScript checking

## How It Works

1. **Upload Phase**: Users can upload PDF files either by clicking the upload area or using drag-and-drop functionality. The application validates that the file is a PDF and under 10MB.

2. **Processing Phase**: The uploaded PDF is sent to a mock signing server (simulated locally using pdf-lib). The server adds a digital signature stamp to the first page with the current date and a unique signature ID.

3. **Viewing Phase**: The signed PDF is displayed using react-pdf, which renders the PDF in the browser. Users can navigate between pages and download the signed document.

## Mobile Optimization

The application is optimized for mobile devices with:

- Touch-friendly buttons and controls
- Responsive layouts that adapt to screen sizes
- Proper viewport scaling
- PDF rendering that scales to device width
- Optimized file upload from mobile browsers

## Browser Compatibility

The application works on:

- Chrome/Edge (latest versions)
- Firefox (latest versions)
- Safari (iOS 12+, macOS)
- Mobile browsers (Android Chrome, iOS Safari)

## Security Notes

This is a demonstration application with a mock signing server. In a production environment, you would:

- Implement actual server-side PDF signing with cryptographic signatures
- Add authentication and authorization
- Implement secure file upload and storage
- Add rate limiting and file size restrictions
- Use HTTPS for all communications

## License

MIT License - feel free to use this code for your own projects.

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.
