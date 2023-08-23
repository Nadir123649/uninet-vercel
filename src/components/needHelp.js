import React from "react";
import { BsWhatsapp } from "react-icons/bs";
import { ButtonToolbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function NeedHelp() {
  const { t } = useTranslation();
  let ishbrews = localStorage.getItem("i18nextLng");
  const handleWhatsAppButtonClick = () => {
    const whatsappUrl = "https://api.whatsapp.com/send?phone=972584222456";
    window.open(whatsappUrl, "_blank");
  };
  const tooltip = (
    <Tooltip id="tooltip">
      <strong> {t("Questionnaire1.part42")}</strong>
    </Tooltip>
  );
  return (
    <ButtonToolbar>
      <OverlayTrigger
        placement={ishbrews === "he" ? "right" : "left"}
        overlay={tooltip}
      >
        <div
          bsStyle="default"
          className={
            ishbrews === "he"
              ? "fixed  left-5 bottom-5"
              : "fixed  right-5 bottom-5"
          }
        >
          <button
            className="cursor-pointer rounded-md bg-bg-secondary text-center py-[6px] px-2"
            onClick={handleWhatsAppButtonClick}
          >
            <BsWhatsapp size={"35px"} className="white-icon" />
          </button>
        </div>
      </OverlayTrigger>
    </ButtonToolbar>
  );
}

export default NeedHelp;
