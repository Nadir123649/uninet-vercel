import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Api from "../services/api";
import Spinner from "react-bootstrap/Spinner";

const DocData = () => {
  let ishbrews = localStorage.getItem("i18nextLng");
  // console.log("ishbrews", ishbrews);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  //  const token = localStorage?.getItem("accessToken");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQzIiwibmJmIjoxNjkxNjc5ODM2LCJleHAiOjE2OTE2ODI4MzZ9.ruMdH7BQsjFDwn7aAVUshpzcv04W5I6vv6DnteuDoeg";
  let data = {
    supplier_id: 11,
    expense_type_id: 3,
    expense_doctype: "invoice",
    expense_docnum: "2000",
    internalCompanyId: 1021,
    expense_sum: 830.7,
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await Api.InsertUserDigitalDocToUninetSystem(data, token)
        .then((response) => {
          console.log("response", response);
          setLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setLoading(false);
        });
    } catch (e) {
      setLoading(false);
      console.log("e", e);
    }
  };
  return (
    <div class="w-full md:w-1/4 bg-gray-200 p-3 md:p-4">
      <h1 className=" font-semibold text-2xl underline text-text-color text-center mt-0 md:mt-3 mb-4">
        Doc Data
      </h1>
      <div className="flex flex-col md:flex-row flex-wrap gap-3">
        <input
          type="text"
          className="Amount-input-data w-full max-w-full md:w-w-1/6   md:max-w-max-150  px-2 text-sm py-[11px] md:text-lg mb-3 font-normal leading-normal text-text-color   bg-white border border-black appearance-none bg-clip-padding"
          id="supplierName"
          // value={supplierName}
          // onChange={handleChange}
          placeholder={t("main-console.part68")}
        />
        <input
          className="Amount-input-data  w-full max-w-full  md:w-w-1/6  md:max-w-max-150  px-2 text-sm py-[11px] md:text-lg  mb-3  font-normal leading-normal text-text-color   bg-white border border-solid appearance-none border-black  bg-clip-padding"
          id="supplierId"
          // value={supplierId}
          // onChange={handleChange}
          placeholder={t("main-console.part69")}
        />
        <input
          type="number"
          className="w-full max-w-full  md:w-w-1/6  md:max-w-max-150 px-2 text-sm py-[11px] md:text-lg font-normal leading-normal text-text-color   bg-white border border-solid appearance-none border-black bg-clip-padding"
          id="docNumber"
          // value={docNumber}
          // onChange={handleChange}
          placeholder={t("main-console.part70")}
        />
        <input
          type="text"
          className="w-full max-w-full  md:w-w-1/6 md:max-w-max-150 px-2  text-sm py-[11px] md:text-lg font-normal leading-normal text-text-color   bg-white border border-solid border-black  appearance-none bg-clip-padding"
          id="docType"
          // value={docType}
          // onChange={handleChange}
          placeholder={t("main-console.part71")}
        />
        <input
          type="text"
          className="w-full max-w-full  md:w-w-1/6 md:max-w-max-150 px-2  mt-2  text-sm py-[11px] md:text-lg  font-normal leading-normal text-text-color bg-white border border-solid appearance-none border-black bg-clip-padding"
          // value={docDate}
          // onChange={handleChange}
          placeholder={t("main-console.part72")}
        />
      </div>
      <div className="Amount-input flex flex-col md:flex-row flex-wrap gap-3 mt-5">
        <input
          type="text"
          className="w-full max-w-full  md:w-w-1/6 md:max-w-max-150 px-2 text-sm py-[11px] md:text-lg  mb-1 font-normal leading-normal text-text-color   bg-white border border-black appearance-none bg-clip-padding"
          id="supplierName"
          // value={supplierName}
          // onChange={handleChange}
          placeholder="Amount"
        />
        <input
          type="text"
          className="w-full max-w-full  md:w-w-1/6 md:max-w-max-150 px-2 text-sm py-[11px] md:text-lg mb-1  font-normal leading-normal text-text-color   bg-white border border-solid appearance-none border-black  bg-clip-padding"
          id="supplierId"
          // value={supplierId}
          // onChange={handleChange}
          placeholder="VAT"
        />
        <input
          type="text"
          className="w-full max-w-full  md:w-w-1/6  md:max-w-max-150 px-2 text-sm py-[11px] md:text-lg font-normal leading-normal text-text-color   bg-white border border-solid appearance-none  border-black bg-clip-padding"
          id="docNumber"
          // value={docNumber}
          // onChange={handleChange}
          placeholder={t("main-console.part73")}
        />
      </div>
      <div className="mr-0 md:mr-4 Amount-input mt-5">
        <input
          type="text"
          className=" w-full max-w-full px-2 text-center  py-[11px] text-sm md:text-lg font-normal leading-normal text-gray-900 bg-white border border-solid  border-black focus:outline-none "
          placeholder={t("main-console.part75")}
        />
      </div>
      <div className="Amount-input flex flex-col gap-2 md:flex-row md:gap-0 max-w-full justify-between mr-0 md:mr-4 mt-5 md:mt-5">
        <button
          className="bg-bg-secondary py-[11px] px-[20px] text-white text-sm md:text-lg"
          onClick={handleSubmit}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="">{t("signin.Loading")}...</span>
            </>
          ) : (
            <>{t("main-console.part76")}</>
          )}
        </button>
        <button className="bg-text-color py-[11px] px-[26px] text-white text-sm md:text-lg">
          {t("main-console.part77")}
        </button>
      </div>
    </div>
  );
};
export default DocData;
