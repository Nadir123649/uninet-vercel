import React from "react";

const ShowPdf = ({ pdfFile, setIsPDFLoaded }) => {
  const pdfURL = pdfFile?.docInfoUrl;
  const handlePDFLoad = () => {
    if (pdfURL) {
      setIsPDFLoaded(false);
    }
  };
  return (
    <div className="w-full md:w-1/2 h-full">
     
      <div className="pdf-viewer">
        {pdfURL ? (
          <iframe
          className="min-h-screen "
            src={pdfURL}
            title="PDF Viewer"
            width="100%"
            height="100%"
            onLoad={handlePDFLoad}
          ></iframe>
        ) : (
          <></>
          // <div className="flex justify-center items-center h-full">
          //   <h1 className="text-xl font-bold">Loading ...</h1>
          // </div>
        )}
      </div>
    </div>
  );
};

export default ShowPdf;
