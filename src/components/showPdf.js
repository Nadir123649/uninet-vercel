import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const ShowPdf = ({pdfFile}) => {
 
  const [isPDFLoaded, setIsPDFLoaded] = useState(false);
  const pdfURL = pdfFile?.docInfoUrl;
  let ishbrews = localStorage.getItem("i18nextLng");
  console.log("ishbrews", ishbrews);
  const handlePDFLoad = () => {
    console.log(pdfURL);
    if (pdfURL) {
      console.log("hello");
      setIsPDFLoaded(true);
    }
  };
  console.log(isPDFLoaded);
  return (
    <div className="w-full md:w-1/2 bg-white p-4">
      <div className="pdf-viewer">
        {!isPDFLoaded && pdfURL && (
          <div className="h-screen flex justify-center items-center ">
            <h1 className="text-xl  font-bold">Loading ...</h1>
          </div>
        )}
        <object
          data={pdfURL}
          type="application/pdf"
          width="100%"
          height="650px"
          onLoad={handlePDFLoad}
        />
      </div>
    </div>
  );
};

export default ShowPdf;
