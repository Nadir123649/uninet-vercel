import React, { useState, useContext, useEffect } from "react";
import Api from "../services/api";
import { AuthUserContext } from "../context";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { useTranslation } from "react-i18next";
// import toast, { Toaster } from "react-hot-toast";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { useHistory } from "react-router-dom";
const AccountInfo = ({
  step,
  setStep,
  questionnaireValues,
  setQuestionnaireValues,
  businessType,
}) => {
  const { setBusinessId } = useContext(AuthUserContext);

  const { t } = useTranslation();
  // const { businessType } = useContext(AuthUserContext);
  const [formError, setFormError] = useState({});
  const history = useHistory();
  const [error, setError] = useState(false);
  const [loading, setLaoding] = useState(false);
  let ishbrews = localStorage.getItem("i18nextLng");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionnaireValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[name]) {
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const validate = (values) => {
    const errors = {};

    if (!values?.FirstName) {
      errors.FirstName = t("Questionnaire1.firstName");
    }
    if (!values?.LastName) {
      errors.LastName = t("Questionnaire1.lastNAme");
    }
    if (!values?.MobileNumber) {
      errors.MobileNumber = t("Questionnaire1.mobileNo");
    }
    if (!values?.OrganizationRole) {
      errors.OrganizationRole = t("Questionnaire1.organizationrole");
    }
    Object.keys(errors).map((key) => {
      if (Object.keys(errors[key])?.length === 0) delete errors[key];
    });

    return errors;
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      if (
        !questionnaireValues?.FirstName ||
        !questionnaireValues?.LastName ||
        !questionnaireValues?.MobileNumber ||
        !questionnaireValues?.OrganizationRole
      ) {
        setError(true);
        return false;
      }
      setLaoding(true);
      const token = localStorage?.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      const data = {
        RegisterUserReq: [
          {
            BusinessType: parseInt(businessType),
            FirstName: questionnaireValues?.FirstName,
            LastName: questionnaireValues?.LastName,
            MobileNumber: questionnaireValues?.MobileNumber,
            OrganizationRole: questionnaireValues?.OrganizationRole,
            OrganizationName: "OrganizationB",
            OrganizationType: 1,
            ExternalSystemId: 2,
          },
        ],
        Lang: ishbrews === "he" ? 2 : 1,
      };
      if (token) {
        await Api.SecondQuestionnaire(data, token)
          .then((res) => {
            if (res?.addBusinessToUserResult?.result === true) {
              localStorage.setItem(
                "businessId",
                res?.addBusinessToUserResult?.businessRequests?.[0]?.BusinessId
              );

              setBusinessId(
                res?.addBusinessToUserResult?.businessRequests?.[0]?.BusinessId
              );
              localStorage.setItem("Q1_Q2_InidicationRes", true);
              setLaoding(false);
              setStep(step + 1);
            } else {
              toast?.error(res?.textResponse);
              setLaoding(false);
              // setStep(step + 1);
              // toast.error(ishbrews === "he" ? "החברה לא התווספה" : "Error Occured Company Wasnt Added");
            }
          })
          .catch(async (e) => {
            if (e?.status === 401) {
              if (refreshToken) {
                await Api.refreshToken({
                  authenticationToken: refreshToken,
                })
                  .then(async (res) => {
                    await Api.SecondQuestionnaire(data, res?.accessToken)
                      .then((res) => {
                        if (res?.addBusinessToUserResult?.result === true) {
                          localStorage.setItem("Q1_Q2_InidicationRes", true);
                          localStorage.setItem(
                            "businessId",
                            res?.addBusinessToUserResult?.businessRequests?.[0]
                              ?.BusinessId
                          );

                          setBusinessId(
                            res?.addBusinessToUserResult?.businessRequests?.[0]
                              ?.BusinessId
                          );
                          setLaoding(false);
                          setStep(step + 1);
                        } else {
                          setLaoding(false);
                          history.push("/");
                        }
                      })
                      .catch((err) => {
                        history.push("/");
                      });
                  })
                  .catch((err) => {
                    console.log("Something went wrong", err.statusText);
                    if (err?.status === 400) {
                      setLaoding(false);
                      history.push("/");
                    }
                  });
              } else {
                setLaoding(false);
                history.push("/");
              }
            } else {
              history.push("/");
            }
          });
      } else {
        setLaoding(false);
        toast.error("You need to sign in or sign up before continuing");
        history.push("/");
      }
    } catch (e) {
      console.log("e", e);
    }
  };
  // const addQuestionnaireData = () => {
  //   const validateForm = validate(questionnaireValues);
  //   setFormError(validateForm);
  //   if (Object.keys(validateForm)?.length === 0) {
  //     handleSubmit();
  //   }
  // };

  // useEffect(() => {
  //   const validateForm = validate(questionnaireValues);
  //   setFormError(validateForm);
  // }, [ishbrews])

  return (
    <div>
      <h1 className="font-semibold text-2xl text-center mb-[10px] mt-3">
        {t("Questionnaire2.part43")}
      </h1>
      <p className="text-base font-normal text-gray-500 text-center mb-10">
        {t("Questionnaire2.part48")}
      </p>
      <div className={ishbrews === "he" ? "row flex-row-reverse" : "row"}>
        <div className="col-md-6 flex flex-col flex-start">
          <label
            htmlFor="firstNameInput"
            className={
              ishbrews === "he"
                ? "mb-[10px] text-sm font-semibold text-right text-text-color"
                : "mb-[10px] text-sm font-semibold text-text-color"
            }
          >
            {t("Questionnaire2.part44")}
          </label>
          <input
            className={
              ishbrews === "he"
                ? "block w-full px-2 py-[10px]  mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border text-right bg-clip-padding"
                : "block w-full px-2 py-[10px]  mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
            }
            type="text"
            id="firstNameInput"
            name="FirstName"
            placeholder={t("Questionnaire2.part44")}
            value={questionnaireValues?.FirstName}
            onChange={handleChange}
          />
          {error && !questionnaireValues?.FirstName ? (
            <p
              className={
                ishbrews === "he" ? "text-red-600 text-right " : "text-red-600 "
              }
            >
              {t("Questionnaire1.firstName")}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 flex flex-col flex-start">
          <label
            htmlFor="lastNameInput"
            className={
              ishbrews === "he"
                ? "mb-[10px] text-sm font-semibold text-right text-text-color"
                : "mb-[10px] text-sm font-semibold text-text-color"
            }
          >
            {t("Questionnaire2.part45")}
          </label>
          <input
            className={
              ishbrews === "he"
                ? "block w-full px-2 py-[10px]  mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border text-right bg-clip-padding"
                : "block w-full px-2 py-[10px]  mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
            }
            type="text"
            id="lastNameInput"
            placeholder={t("Questionnaire2.part45")}
            name="LastName"
            value={questionnaireValues?.LastName}
            onChange={handleChange}
          />
          {error && !questionnaireValues?.LastName ? (
            <p
              className={
                ishbrews === "he" ? "text-red-600 text-right " : "text-red-600 "
              }
            >
              {t("Questionnaire1.lastNAme")}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 flex flex-col">
          <label
            htmlFor="mobileNumberInput"
            className={
              ishbrews === "he"
                ? "mb-[10px] text-sm font-semibold text-right text-text-color"
                : "mb-[10px] text-sm font-semibold text-text-color"
            }
          >
            {t("Questionnaire2.part46")}
          </label>

          <input
            className={
              ishbrews === "he"
                ? "block w-full px-2 py-[10px]  mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border text-right bg-clip-padding"
                : "block w-full px-2 py-[10px]  mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
            }
            type="number"
            id="mobileNumberInput"
            placeholder={t("Questionnaire2.part46")}
            name="MobileNumber"
            value={questionnaireValues?.MobileNumber}
            onChange={handleChange}
          />
          {error && !questionnaireValues?.MobileNumber ? (
            <p
              className={
                ishbrews === "he" ? "text-red-600 text-right " : "text-red-600 "
              }
            >
              {t("Questionnaire1.mobileNo")}
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 flex flex-col">
          <label
            htmlFor="roleInput"
            className={
              ishbrews === "he"
                ? "mb-[10px] text-sm font-semibold text-right text-text-color"
                : "mb-[10px] text-sm font-semibold text-text-color"
            }
          >
            {t("Questionnaire2.part47")}
          </label>
          <input
            type="text"
            id="roleInput"
            className={
              ishbrews === "he"
                ? "block w-full px-2 py-[10px]  mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border text-right bg-clip-padding"
                : "block w-full px-2 py-[10px]  mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
            }
            placeholder={t("Questionnaire2.part47")}
            name="OrganizationRole"
            value={questionnaireValues?.OrganizationRole}
            onChange={handleChange}
          />
          {error && !questionnaireValues?.OrganizationRole ? (
            <p
              className={
                ishbrews === "he" ? "text-red-600 text-right " : "text-red-600 "
              }
            >
              {t("Questionnaire1.organizationrole")}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className={
          ishbrews === "he"
            ? " flex flex-row-reverse  justify-between  mt-20"
            : " flex flex-row justify-between  mt-20"
        }
      >
        {step === 0 ? (
          <></>
        ) : (
          <button
            onClick={() => setStep(step - 1)}
            className=" bg-bg-secondary flex  text-base px-[22px] font-semibold items-center py-[9px] text-white rounded-md "
            id="backButton"
          >
            {ishbrews === "he" ? (
              <div className="flex items-center gap-2">
                {" "}
                <span>{t("Questionnaire2.Back")}</span>
                <BsChevronRight />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <BsChevronLeft />
                <span>{t("Questionnaire2.Back")}</span>
              </div>
            )}
          </button>
        )}

        <button
          onClick={() => handleSubmit()}
          className=" bg-bg-secondary   text-base px-[22px] font-semibold flex gap-1 items-center py-[9px] text-white rounded-md "
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
            <>
              {ishbrews === "he" ? (
                <div className="flex items-center gap-2">
                  <BsChevronLeft />
                  <span>{t("Questionnaire1.part40")}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {" "}
                  <span>{t("Questionnaire1.part40")}</span>
                  <BsChevronRight />
                </div>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AccountInfo;
