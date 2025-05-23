import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import PDFControls from './PDFControls';
import PDFSidebar from './PDFSidebar';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFViewer = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [pdfFile, setPdfFile] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPdfFile(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-full">
      <PDFSidebar numPages={numPages} currentPage={pageNumber} onPageClick={setPageNumber} />
      <div className="flex-grow flex flex-col items-center">
        <input type="file" accept=".pdf" onChange={handleFileChange} className="mb-4" />
        {pdfFile && (
          <>
            <PDFControls
              pageNumber={pageNumber}
              numPages={numPages}
              scale={scale}
              setPageNumber={setPageNumber}
              setScale={setScale}
            />
            <div className="border border-gray-300 shadow-lg">
              <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} scale={scale} />
              </Document>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;