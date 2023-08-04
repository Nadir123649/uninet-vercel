import React from "react";
import { SiOnlyoffice } from "react-icons/si";
import { useTranslation } from "react-i18next";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

const BusinessDetails = ({ step, setStep }) => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <h1 className="font-semibold text-2xl mb-[10px] mt-3">
        {t("Questionnaire3.part49")}
      </h1>
      <p className="text-base font-normal text-gray-500">
        if you need more info, please check out.
        <span className="cursor-pointer text-primary-color"> Help Page </span>
      </p>

      <div className="row">
        <div className="col-md-12">
          <label
            htmlFor="firstNameInput"
            className="mb-[10px] text-sm font-semibold text-text-color mt-3"
          >
            {t("Questionnaire3.part50")}
            <span className="text-primary-color"> * </span>
          </label>
          <input
            className="block w-full px-2 py-[10px] mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
            type="text"
            id="listLabel"
            placeholder=""
            // value={}
            // onChange={}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="flex gap-3 items-center mt-[11px] mb-4">
            <SiOnlyoffice size={"40px"} style={{ color: "#8ECAE6" }} />
            <span className=" text-lg font-semibold text-text-color ">
              {" "}
              Company name
            </span>
          </div>
          <h1 className="font-semibold text-2xl mb-[10px] ">
            {t("Questionnaire1.part32")}
          </h1>
          <p className="text-base font-normal text-gray-500 mb-3">
            {t("Questionnaire1.part33")}
            <span className="cursor-pointer text-primary-color">Help Page</span>
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <label
            htmlFor="firstNameInput"
            className="mb-[10px] text-sm font-semibold text-text-color "
          >
            label
            <span className="text-primary-color"> * </span>
          </label>
          <input
            className="block w-full px-2 py-[10px] mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
            type="text"
            id="listLabel"
            placeholder="label"
            // value={}
            // onChange={}
          />

          <label
            htmlFor="firstNameInput"
            className="mb-[10px] text-sm font-semibold text-text-color mt-3 "
          >
            label_number
            <span className="text-primary-color"> * </span>
          </label>
          <input
            className="block w-full px-2 py-[10px] mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
            type="text"
            id="listLabel"
            placeholder="label_number"
            // value={}
            // onChange={}
          />
        </div>
      </div>

      <div className=" flex flex-row justify-between  mt-20">
        {step === 0 ? (
          <></>
        ) : (
          <button
            onClick={() => setStep(step - 1)}
            className=" bg-bg-secondary flex  text-base px-[22px] font-semibold flex  items-center py-[9px] text-white rounded-md "
            id="backButton"
          >
            <BsChevronLeft />
            <span>Back</span>
          </button>
        )}

        <button
          onClick={() => setStep(step + 1)}
          className=" bg-bg-secondary   text-base px-[22px] font-semibold flex gap-1 items-center py-[9px] text-white rounded-md "
        >
          <span>Continue</span>
          <BsChevronRight />
        </button>
      </div>
    </div>
  );
};
export default BusinessDetails;
