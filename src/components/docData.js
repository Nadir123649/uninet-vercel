import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Api from "../services/api";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const DocData = ({
  formValues,
  setFormValues,
  rejectData,
  setIsRejected,
  setIsEntered,
}) => {
  let ishbrews = localStorage.getItem("i18nextLng");
  const history = useHistory();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [rejectLoader, setRejectLoader] = useState(false);

  const token = localStorage?.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async () => {
    let data = {
      supplier_ID: formValues?.supplier_ID,
      expense_type_id: formValues?.expenseTypeList?.[0]?.expenseTypeId,
      expense_doctype: formValues?.doctype,
      expense_docnum: formValues?.docNumber,
      internalCompanyId: formValues?.internalCompanyId,
      expense_sum: formValues?.amountAV,
      Jsondocumentid: formValues?.jsondocumentid,
      Lang: ishbrews === "he" ? 2 : 1,
    };
    try {
      if (token) {
        setLoading(true);
        await Api.ApproveDoc(data, token)
          .then((response) => {
            if (response?.status == true) {
              setIsEntered(true);
              toast.success(response?.textResponse);
            } else {
              setIsEntered(false);
              toast.error(response?.textResponse);
            }
            setLoading(false);
          })
          .catch(async (e) => {
            if (e?.status === 401) {
              if (refreshToken) {
                await Api.refreshToken({
                  authenticationToken: refreshToken,
                })
                  .then(async (res) => {
                    await Api.ApproveDoc(data, token)
                      .then((response) => {
                        if (response?.success == true) {
                          setIsEntered(true);

                          toast.success(response?.textResponse);
                        } else {
                          setIsEntered(false);
                          toast.error(response?.textResponse);
                        }
                        setLoading(false);
                      })
                      .catch((err) => {
                        history.push("/");
                      });
                  })
                  .catch((err) => {
                    if (err?.status === 400) {
                      history.push("/");
                    }
                  });
              } else {
                history.push("/");
              }
            }
            if (e?.status === 400) {
              toast.error(e?.data?.title);
              setLoading(false);
            } else {
              history.push("/");
            }
          });
      } else {
        toast.error("You need to sign in or sign up before continuing");
        history.push("/");
      }
    } catch (e) {
      setLoading(false);
      console.log("e", e);
    }
  };

  const handleReject = async () => {
    let data = { ...rejectData, Lang: ishbrews === "he" ? 2 : 1 };

    try {
      if (token) {
        setRejectLoader(true);
        await Api.RejectDoc(data, token)
          .then((response) => {
            if (response?.success === true) {
              setIsRejected(true);
              toast.success(response?.textResponse);
            } else {
              setIsRejected(false);
              toast.error(response?.textResponse);
            }
            setRejectLoader(false);
          })
          .catch(async (e) => {
            if (e?.status === 401) {
              if (refreshToken) {
                await Api.refreshToken({
                  authenticationToken: refreshToken,
                })
                  .then(async (res) => {
                    await Api.RejectDoc(data, token)
                      .then((response) => {
                        if (response?.success == true) {
                          toast.success(response?.textResponse);
                        } else {
                          toast.error(response?.textResponse);
                        }
                        setRejectLoader(false);
                      })
                      .catch((err) => {
                        history.push("/");
                      });
                  })
                  .catch((err) => {
                    if (err?.status === 400) {
                      history.push("/");
                    }
                  });
              } else {
                history.push("/");
              }
            }
            if (e?.status === 400) {
              toast.error(e?.data?.title);
              setRejectLoader(false);
            } else {
              history.push("/");
            }
          });
      } else {
        toast.error("You need to sign in or sign up before continuing");
        history.push("/");
      }
    } catch (e) {
      setRejectLoader(false);
      console.log("e", e);
    }
  };

  // useEffect(() => {
  //   if (formValues?.docDate != undefined) {
  //     formatDate(formValues?.docDate);
  //   }
  // }, [formValues?.docDate]);
  return (
    <div className="w-full md:w-1/4 bg-white rounded-md shadow-md p-3 md:p-4 h-full">
      <h1 className=" font-semibold text-2xl underline text-text-color text-center mt-0 md:mt-3 mb-4">
        {t("main-console.rightSidebarHeading")}
      </h1>
      <div className="flex flex-col justify-between h-[85%]">
        {/* expense row */}
        <div
          className={ishbrews === "he" ? "row flex-wrap" : "row flex-wrap "}
          style={{ rowGap: "20px" }}
        >
          <div className="col-md-6 col-sm-12">
            <input
              type="text"
              className={
                ishbrews === "he"
                  ? "Amount-input-data w-full px-2 text-xs py-[12px] md:text-base border-[#D8D8D8]  font-normal leading-normal text-text-color text-right   bg-white   border-solid   rounded-md appearance-none "
                  : "Amount-input-data w-full  px-2 text-xs py-[12px] md:text-base  font-normal leading-normal text-text-color   bg-white border border-[#D8D8D8] border-solid    appearance-none rounded-md "
              }
              id="supplierName"
              name="supplier_name_Sender"
              value={formValues?.supplier_name_Sender}
              onChange={(e) => handleChange(e)}
              placeholder={t("main-console.part68")}
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <input
              className={
                ishbrews === "he"
                  ? "Amount-input-data  w-full  px-2 text-xs py-[12px] md:text-base text-right font-normal leading-normal text-text-color   bg-white border border-solid appearance-none rounded-md border-[#D8D8D8]  "
                  : "Amount-input-data  w-full  px-2 text-xs py-[12px] md:text-base     font-normal leading-normal text-text-color   bg-white border border-solid appearance-none rounded-md border-[#D8D8D8]  "
              }
              id="supplierId"
              name="supplier_ID"
              value={formValues?.supplier_ID}
              onChange={(e) => handleChange(e)}
              placeholder={t("main-console.part69")}
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <input
              type="number"
              className={
                ishbrews === "he"
                  ? "w-full  px-2 text-right text-xs py-[12px] md:text-base font-normal leading-normal text-text-color   bg-white border border-solid appearance-none rounded-md border-[#D8D8D8] "
                  : "w-full  px-2 text-xs py-[12px] md:text-base font-normal leading-normal text-text-color   bg-white border border-solid appearance-none rounded-md border-[#D8D8D8] "
              }
              id="docNumber"
              name="docNumber"
              value={formValues?.docNumber}
              onChange={(e) => handleChange(e)}
              placeholder={t("main-console.part70")}
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <input
              type="text"
              className={
                ishbrews === "he"
                  ? "w-full px-2  text-xs py-[12px] md:text-base    font-normal leading-normal text-text-color   bg-white border text-right border-solid border-[#D8D8D8]  appearance-none rounded-md "
                  : "w-full px-2  text-xs py-[12px] md:text-base    font-normal leading-normal text-text-color   bg-white border border-solid border-[#D8D8D8]  appearance-none rounded-md "
              }
              id="docType"
              name="doctype"
              value={formValues?.doctype}
              onChange={(e) => handleChange(e)}
              placeholder={t("main-console.part71")}
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <input
              type="text"
              className={
                ishbrews === "he"
                  ? "w-full  px-2  text-xs py-[12px] md:text-base    font-normal leading-normal text-text-color text-right bg-white border border-solid appearance-none rounded-md border-[#D8D8D8] "
                  : "w-full  px-2  text-xs py-[12px] md:text-base    font-normal leading-normal text-text-color bg-white border border-solid appearance-none rounded-md border-[#D8D8D8] "
              }
              name="docDate"
              value={formValues?.docDate?.slice(0, 10)}
              onChange={(e) => handleChange(e)}
              placeholder={t("main-console.part72")}
            />
          </div>
        </div>
        {/* expence row */}
        <div
          className={
            ishbrews === "he" ? "row flex-wrap mt-5" : "row flex-wrap mt-5"
          }
          style={{ rowGap: "20px" }}
        >
          <div className="col-md-6 col-sm-12">
            <input
              type="text"
              className={
                ishbrews === "he"
                  ? "w-full  px-2 text-xs py-[12px] md:text-base   text-right  font-normal leading-normal text-text-color   bg-white border border-[#D8D8D8] appearance-none rounded-md "
                  : "w-full  px-2 text-xs py-[12px] md:text-base     font-normal leading-normal text-text-color   bg-white border border-[#D8D8D8] appearance-none rounded-md "
              }
              id="supplierName"
              name="amountAV"
              value={formValues?.amountAV}
              onChange={(e) => handleChange(e)}
              placeholder={t("main-console.amountInputPlaceholder")}
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <input
              type="text"
              className={
                ishbrews === "he"
                  ? "w-full px-2 text-xs py-[12px] md:text-base text-right font-normal leading-normal text-text-color   bg-white border border-solid appearance-none rounded-md border-[#D8D8D8]  "
                  : "w-full  px-2 text-xs py-[12px] md:text-base   font-normal leading-normal text-text-color   bg-white border border-solid appearance-none rounded-md border-[#D8D8D8]  "
              }
              id="supplierId"
              // value={supplierId}
              // onChange={handleChange}
              placeholder={t("main-console.VATInputPlaceholder")}
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <input
              type="text"
              className={
                ishbrews === "he"
                  ? "w-full  px-2 text-xs py-[12px] md:text-base  text-right   font-normal leading-normal text-text-color   bg-white border border-solid appearance-none rounded-md  border-[#D8D8D8] "
                  : "w-full px-2 text-xs py-[12px] md:text-base    font-normal leading-normal text-text-color   bg-white border border-solid appearance-none rounded-md  border-[#D8D8D8] "
              }
              id="docNumber"
              // value={docNumber}
              // onChange={handleChange}
              placeholder={t("main-console.part73")}
            />
          </div>
        </div>

        {/* expense row */}
        <div className={ishbrews === "he" ? "row mt-5" : "row mt-5"}>
          <div className="col-md-12">
            <input
              type="text"
              className={
                ishbrews === "he"
                  ? " w-full  px-2  py-[12px] text-xs md:text-base text-right font-normal leading-normal text-gray-900 bg-white border border-solid  rounded-md border-[#D8D8D8] focus:outline-none"
                  : " w-full  px-2 text-center py-[12px] text-xs md:text-base    font-normal leading-normal text-gray-900 bg-white border border-solid  rounded-md border-[#D8D8D8] focus:outline-none"
              }
              placeholder={t("main-console.part75")}
            />
          </div>
        </div>

        {/* expense row */}
        <div
          className={
            ishbrews === "he"
              ? "row flex-wrap mt-5 mb-3"
              : "row flex-wrap mt-5 mb-3"
          }
        >
          <div className="col-md-6">
            <button
              className="bg-bg-secondary py-[11px] w-full text-white text-xs md:text-base rounded-md  "
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
                    className=" mr-1"
                  />
                  <span className="">{t("signin.Loading")}...</span>
                </>
              ) : (
                <>{t("main-console.part76")}</>
              )}
            </button>
          </div>
          <div className="col-md-6">
            <button
              onClick={handleReject}
              className="bg-text-color py-[11px] w-full text-white text-xs md:text-base rounded-md "
            >
              {rejectLoader ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    // size="20px"
                    role="status"
                    aria-hidden="true"
                    className=" mr-1"
                  />
                  <span className="">{t("signin.Loading")}...</span>
                </>
              ) : (
                <> {t("main-console.part77")}</>
              )}
            </button>
          </div>
        </div>

        {/* <div
          className={
            ishbrews === "he"
              ? "Amount-input flex flex-col gap-2 md:flex-row-reverse md:gap-0 max-w-full justify-between mr-0 md:mr-0 mt-2 md:mt-2"
              : "Amount-input flex flex-col gap-2 md:flex-row md:gap-0 max-w-full justify-between mr-0 md:mr-4 mt-2 md:mt-2"
          }
        ></div> */}
      </div>
    </div>
  );
};
export default DocData;
