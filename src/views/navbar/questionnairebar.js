import React from "react";
import en from "../../assets/images/en.svg";
import he from "../../assets/images/he.svg";
import LogoIcon from "../../assets/images/Logo.webp";
import { useTranslation } from "react-i18next";

function Questionnairebar() {
  const { t, i18n } = useTranslation();
  let ishbrews = localStorage.getItem("i18nextLng");
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // console.log("i18" , i18n.changeLanguage(lng));
  };

  return (
    <div className="container-fluid px-4  md:px-4">
      <div className="row p-0">
        <div
          className={
            ishbrews === "he"
              ? "col-md-12 p-0 d-flex pt-3 px-0 justify-end pr-10"
              : "col-md-12 p-0 d-flex pt-3 px-0 justify-start "
          }
        >
          <div className="Logo  mr-4">
            <img src={LogoIcon} className="h-auto max-w-max-100" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questionnairebar;
