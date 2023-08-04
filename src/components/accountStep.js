import React, { useState, useContext, useEffect } from "react";
import {
  BsBank,
  BsHandbagFill,
  BsFillPersonCheckFill,
  BsChevronRight,
  BsChevronLeft,
} from "react-icons/bs";
import { AuthUserContext } from "../context";
import { useTranslation } from "react-i18next";
import Navbars from "../views/navbar/navbar";
function AccountStep({ step, setStep }) {
  const { t, i18n } = useTranslation();
  const [color, setColor] = useState("");
  const {setBusinessType,businessType, ishbrew} = useContext(AuthUserContext)
   const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    if (color) {
      setIsValid(false);
      setBusinessType(color);
    }
  }, [color]);

  useEffect(() => {
    setColor(businessType);
  }, [businessType]);

  const handleWhatsAppButtonClick = () => {
    // Replace the following URL with your desired WhatsApp URL or phone number
    const whatsappUrl = 'https://api.whatsapp.com/send?phone=972584222456';
    window.location.href = whatsappUrl;
  };

  return (
    <div>
      
      <h1 className={ishbrew ? "font-semibold text-2xl mb-[10px] mt-3 text-right" : "font-semibold text-2xl mb-[10px] mt-3"}>
        {t('Questionnaire1.part32')}
      </h1>
      <p className={ishbrew ? "text-lg font-normal text-gray-500 mb-10 text-right" : "text-base font-normal text-gray-500 mb-10"}>
       {t('Questionnaire1.part33')}
        <span className="cursor-pointer text-primary-color" onClick={handleWhatsAppButtonClick}>Help Page</span>
      </p>

      <div className= {ishbrew ?"row justify-between flex-row-reverse mx-1" : "row justify-between mx-1" }>
        <div
          className={
            color === "0"
              ? "col-md-4 card relative cursor-pointer border border-solid rounded-md py-4 bg-primary-color border-blue-500 px-2 d-flex items-center mb-10"
              : "col-md-4 card relative cursor-pointer border border-solid rounded-md border-bg-border py-4 px-2 d-flex items-center mb-10"
          }
          id="0"
          onClick={() => {
            setColor("0");
          }}
        >
          <input
            type="radio"
            className="hidden"
            name="account_type"
            value="personal"
            checked="checked"
            id=""
          />
          <label htmlFor=""  className={ishbrew ? "flex items-center flex-row-reverse gap-3 cursor-pointer" : "flex items-center gap-3 cursor-pointer"}>
            <div>
              <BsBank size={"30px"} />
            </div>

            <div>
              <span className={ishbrew ? "block font-semibold text-right" : "block font-semibold text-left"}>
                <span className="text-dark font-bold block text-xl mb-2">
                  {t("Questionnaire1.part34")}
                </span>
                <span className={ishbrew ? "text-muted font-semibold text-[14px]" : "text-muted font-semibold text-[11px]"}>
                {t('Questionnaire1.part35')}
                </span>
              </span>
            </div>
          </label>
        </div>
        <div
          className={
            color === "1"
              ? "col-md-4 card relative  cursor-pointer border border-solid rounded-md py-4 bg-primary-color px-2   d-flex items-center mb-10"
              : "col-md-4  card  relative cursor-pointer border border-solid rounded-md border-bg-border  py-4 px-2  d-flex items-center mb-10"
          }
          id="1"
          onClick={() => setColor("1")}
        >
          <input
            type="radio"
            className="hidden"
            name="account_type"
            value="personal"
            checked="checked"
            id=""
          />
          <label htmlFor="label" className={ishbrew ? "flex items-center flex-row-reverse gap-3 cursor-pointer" : "flex items-center gap-3 cursor-pointer"}>
            <div>
              <BsHandbagFill size={"30px"} />
            </div>
            <div>
              <span className={ishbrew ? "block font-semibold text-right" : "block font-semibold text-left"}>
                <span className="text-dark font-bold block text-xl mb-2">
                  {t("Questionnaire1.part36")}
                </span>
                <span className={ishbrew ? "text-muted font-semibold text-[14px]" : "text-muted font-semibold text-[11px]"}>
                {t('Questionnaire1.part37')}
                </span>
              </span>
            </div>
          </label>
        </div>
        <div
          className={
            color === "2"
              ? "col-md-4 card relative bg-primary-color cursor-pointer border border-solid rounded-md py-4 px-2   d-flex items-center mb-10"
              : "col-md-4 relative  card  cursor-pointer border border-solid rounded-md border-bg-border  py-4 px-2  d-flex items-center mb-10"
          }
          id="2"
          onClick={() => setColor("2")}
        >
          <input
            type="radio"
            className="hidden"
            name="account_type"
            value=""
            checked="checked"
            id=""
          />
          <label  className={ishbrew ? "flex items-center flex-row-reverse gap-3 cursor-pointer" : "flex items-center gap-3 cursor-pointer"} htmlFor="">
            <div>
              <BsFillPersonCheckFill size={"30px"} />
            </div>
            <div>
              <span className={ishbrew ? "block font-semibold text-right" : "block font-semibold text-left"}>
                <span className="text-dark font-bold block text-xl mb-2">
                  {t("Questionnaire1.part38")}
                </span>
                <span className={ishbrew ? "text-muted font-semibold text-[14px]" : "text-muted font-semibold text-[11px]"}>
                {t('Questionnaire1.part39')}
                </span>
              </span>
            </div>
          </label>
        </div>
      </div>
      {isValid && (
        <span className="text-red-600">Please Select any of the Field </span>
      )}{" "}
      <div className=" flex flex-row justify-between  mt-20">
        {/* {step === 0 ? (
          <></>
        ) : (
          <button
            onClick={() => handleBackSubmit()}
            className=" bg-bg-secondary flex  text-base px-[22px] font-semibold flex  items-center py-[9px] text-white rounded-md "
            id="backButton"
          >
            <BsChevronLeft />
            <span>Back</span>
          </button>
        )} */}

        <button
          onClick={() => {
            if (color === "") setIsValid(true);
            else {
              setStep(step + 1);
            }
          }}
          className=" bg-bg-secondary   text-base px-[22px] font-semibold flex gap-1 items-center py-[9px] text-white rounded-md "
        >
          <span>{t('Questionnaire1.part40')}</span>
          <BsChevronRight />
        </button>
      </div>
    </div>
  );
}

export default AccountStep;
