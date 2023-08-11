import React, { useState } from "react";
import Navbars from "../navbar/navbar";
import TabsInfo from "../../components/tabsInfo";
import ShowPdf from "../../components/showPdf";
import DocData from "../../components/docData";
import { useTranslation } from "react-i18next";
import en from "../../assets/images/en.svg";
import he from "../../assets/images/he.svg";
// const MyLazyComponent = React.lazy(() => import('../../components/showPdf'));

const MainConsole = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [approveListByUser, setApproveListByUser] = useState([])
  const [pdfFile, setPdfFile] = useState([]);
  let ishbrews = localStorage.getItem("i18nextLng")
  // console.log("ishbrews", ishbrews);
  return (
    <div className="bg-bg-linear">
      <div className="min-h-screen  wrapper-Div">
        <div className={
          ishbrews === "he"
            ? "flex min-h-screen flex-col-reverse md:flex-row-reverse border"
            : "flex min-h-screen flex-col md:flex-row"
        }>

          <TabsInfo
            setApproveListByUser={setApproveListByUser}
            approveListByUser={approveListByUser}
            setPdfFile={setPdfFile}
          />

          <ShowPdf
            pdfFile={pdfFile}
          />
          <DocData />
        </div>
        {/* <Navbars/> */}
        <div className="col-md-12 d-flex gap-3  py-3 justify-center mb-4">
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
      </div>
    </div>
  );
};

export default MainConsole;
{/* <Suspense fallback={<div>Loading...</div>}>
        <MyLazyComponent pdfFile={pdfFile}/>
      </Suspense> */}