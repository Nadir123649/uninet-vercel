import React from "react";
import LogoIcon from "../../assets/images/Logo.webp";

import { useHistory } from "react-router-dom";

function Questionnairebar() {
  const history = useHistory();

  let ishbrews = localStorage.getItem("i18nextLng");

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
          <div className="Logo  cursor-pointer mr-4">
            <img
              src={LogoIcon}
              className="h-auto max-w-max-100"
              alt="logo"
              onClick={() => history.push("/")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Questionnairebar;
