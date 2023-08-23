import React, { useState } from "react";
import TabsInfo from "../../components/tabsInfo";
import ShowPdf from "../../components/showPdf";
import HeaderConsole from "../../components/headerConsole";
import SideBarConsole from "../../components/sideBarConsole";
import DocData from "../../components/docData";
import { useTranslation } from "react-i18next";
import en from "../../assets/images/en.svg";
import he from "../../assets/images/he.svg";
import NeedHelp from "../../components/needHelp";
import { ToastContainer } from "react-toastify";
// const MyLazyComponent = React.lazy(() => import('../../components/showPdf'));

const MainConsole = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const [formValues, setFormValues] = useState({});
  const [rejectData, setRejectData] = useState({});
  const [isPDFLoaded, setIsPDFLoaded] = useState(false);
  const [pdfFile, setPdfFile] = useState([]);
  let ishbrews = localStorage.getItem("i18nextLng");
  return (
    <>
      <div className="bg-bg-linear min-h-screen flex h-full">
        <SideBarConsole 
        setPdfFile={setPdfFile}
        setRejectData={setRejectData}
        setIsPDFLoaded={setIsPDFLoaded}
        pdfFile={pdfFile}
        isPDFLoaded={isPDFLoaded}
        formValues={formValues}
        setFormValues={setFormValues}
        rejectData={rejectData}
        
        />
      </div>

      <div
      // className={
      //   ishbrews === "he"
      //     ? "flex flex-col md:flex-row-reverse border min-h-screen"
      //     : "flex  flex-col md:flex-row border min-h-screen"
      // }
      >
        {isPDFLoaded && pdfFile && (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        )}
        {/* <TabsInfo
          setPdfFile={setPdfFile}
          setFormValues={setFormValues}
          setRejectData={setRejectData}
          setIsPDFLoaded={setIsPDFLoaded}
        />

        <ShowPdf
          pdfFile={pdfFile}
          setIsPDFLoaded={setIsPDFLoaded}
          isPDFLoaded={isPDFLoaded}
        />
        <DocData
          formValues={formValues}
          setFormValues={setFormValues}
          rejectData={rejectData}
        /> */}
      </div>
      {/* Loader Overlay */}

      {/* <Navbars/> */}
      <div className="col-md-12 d-flex gap-3 bg-primary-color py-3 justify-center pb-2">
        <div
          className="d-flex gap-2 cursor-pointer back-color p-2"
          onClick={() => {
            changeLanguage("en");
          }}
        >
          <img src={en} alt="en" />
          English
        </div>
        <div
          className="d-flex gap-2 cursor-pointer p-2 back-color"
          onClick={() => {
            changeLanguage("he");
          }}
        >
          <img src={he} alt="en" />
          עברית (Hebrew)
        </div>
      </div>

      <ToastContainer rtl={ishbrews === "he" ? true : false} />

      <NeedHelp />
    </>
  );
};

export default MainConsole;
{
  /* <Suspense fallback={<div>Loading...</div>}>
        <MyLazyComponent pdfFile={pdfFile}/>
      </Suspense> */
}
