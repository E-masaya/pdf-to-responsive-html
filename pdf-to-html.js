// Load PDF.js and HTML2Canvas libraries
import { getDocument } from 'pdfjs-dist';
import html2canvas from 'html2canvas';

// Function to convert PDF to HTML
async function convertPdfToHtml(pdfUrl) {
  const pdf = await getDocument(pdfUrl).promise;
  const numPages = pdf.numPages;
  const container = document.getElementById('pdf-container');

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 1.5 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext: context, viewport: viewport }).promise;

    // Convert canvas to image and add to container
    const img = document.createElement('img');
    img.src = canvas.toDataURL();
    img.className = 'img-fluid';
    container.appendChild(img);
  }
}

// Call the function with the PDF URL
convertPdfToHtml('https://drive.google.com/uc?export=download&id=1S37R5RDXnqpAd99AL6Dy6zdav5ClFQGj');
