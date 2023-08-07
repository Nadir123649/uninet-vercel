import React from "react";
import en from "../../assets/images/en.svg";
import he from "../../assets/images/he.svg";
import LogoIcon from "../../assets/images/Logo.webp";
import { useTranslation } from "react-i18next";

function Questionnairebar() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // console.log("i18" , i18n.changeLanguage(lng));
  };

  return (
    <div className="container px-4  md:px-4">
      <div className="row p-0">
        <div className="col-md-12 p-0 d-flex pt-3 px-0 justify-between items-center">
          <div className="Logo ">
            <img src={LogoIcon} className="h-auto max-w-max-100" alt="logo" />
          
          </div>
          {/* <div className="flex items-center gap-3">
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
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Questionnairebar;
