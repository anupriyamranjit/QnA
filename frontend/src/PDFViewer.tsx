import { Button } from 'antd';
import React, { useMemo, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  

function PDFViewer({ pdfData } : { pdfData: string } ) {

  const [pageNumber, setPageNumber] = useState(1);
  const [text, setText] = useState('');
  const [scale, setScale] = useState(1);
  const [sendableText, setSendableText] = useState<string>("");

  const handleSendText = async () => {
    fetch('http://localhost:3001/pdf-text', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text: sendableText}), 
    })
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));

    setSendableText("");
  }

  const handleSendableTextButton = () => {
    setSendableText(x => x + " " + text);
  }


  const handleLoadSuccess = async (page: any) : Promise<void> => {
    const textContent = await page.getTextContent();
    const combinedText = textContent.items.map((item: { str: any; }) => item.str).join(' ');
    setText(combinedText);
  };
  // eslint-disable-next-line no-labels
  const memoizedFile = useMemo(() =>  ({ data : new Uint8Array(Object.values(JSON.parse(pdfData))) }), [pdfData]);
  return (
    <div>
      <Button onClick={() => setPageNumber(pageNumber + 1)}>Next</Button>
      <Button onClick={() => setPageNumber(pageNumber - 1)}>Previous</Button>
      <Button onClick={() => setScale(x => x + 0.1)}>Scale up</Button>
      <Button onClick={() => setScale(x => x - 0.1)}>Scale Down</Button>
      <Button onClick={() => handleSendText()}>Send Text</Button>
      <Button onClick={() => handleSendableTextButton()}>Add to Sendable Text</Button>
      <Document file={memoizedFile}>
        <Page 
          onLoadSuccess={handleLoadSuccess} 
          scale={scale}  
          renderAnnotationLayer={false} 
          renderTextLayer={false} 
          pageNumber={pageNumber}  />
      </Document>
    </div>
  );
}

export default PDFViewer;