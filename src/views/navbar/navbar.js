import React, { useContext } from "react";
import en from "../../assets/images/en.svg";
import he from "../../assets/images/he.svg";
import { AuthUserContext } from "../../context";
import { useTranslation } from "react-i18next";

function Navbars() {
  const { t, i18n } = useTranslation();
  const { setIsHbrew } = useContext(AuthUserContext);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // console.log("i18" , i18n.changeLanguage(lng));
  };

  return (
    <div className="container">
      <div className="row ">
        <div className="col-md-12 d-flex gap-3  pt-3 justify-end">
          <div
            className="d-flex gap-2 cursor-pointer back-color p-2"
            onClick={() => {
              changeLanguage("en");
              setIsHbrew(false);
            }}
          >
            <img src={en} alt="en" />
            English
          </div>
          <div
            className="d-flex gap-2 cursor-pointer p-2 back-color"
            onClick={() => {
              changeLanguage("he");
              setIsHbrew(true);
            }}
          >
            <img src={he} alt="en" />
            עברית (Hebrew)
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbars;
