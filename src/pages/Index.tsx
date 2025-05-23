import React from 'react';
import PDFViewer from '../components/PDFViewer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gradient-to-r from-pdf-blue-600 to-pdf-blue-800 text-white p-4">
        <h1 className="text-2xl font-bold">PDF Viewer</h1>
      </header>
      <main className="flex-grow p-4">
        <PDFViewer />
      </main>
    </div>
  );
};

export default Index;