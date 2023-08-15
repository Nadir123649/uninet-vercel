import React from "react";
import { BsWhatsapp } from "react-icons/bs";

function NeedHelp() {
  let ishbrews = localStorage.getItem("i18nextLng");
  const handleWhatsAppButtonClick = () => {
    const whatsappUrl = "https://api.whatsapp.com/send?phone=972584222456";
    window.location.href = whatsappUrl;
  };
  return (
    <div
      className={
        ishbrews === "he" ? "fixed  left-5 bottom-5" : "fixed  right-5 bottom-5"
      }
    >
      <button
        className="cursor-pointer rounded-md bg-bg-secondary text-center py-[6px] px-2"
        onClick={handleWhatsAppButtonClick}
      >
        {/* <span className="cursor-pointer text-white">
        {t("Questionnaire1.part42")}
      </span> */}
        <BsWhatsapp size={"35px"} className="white-icon" />
      </button>
    </div>
  );
}

export default NeedHelp;
