import React, { useEffect, useState } from "react";
import { SiOnlyoffice } from "react-icons/si";
import { useTranslation } from "react-i18next";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import SelectField from "./selectField";
import Api from "../services/api";
import Spinner from "react-bootstrap/Spinner";
import { useHistory } from "react-router-dom";
import ReactPlayer from "react-player";
const BusinessDetails = ({ step, setStep, isLastStep }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const initialQuestionnaireValues = {
    externalSystemId: null,
  };
  let ishbrews = localStorage.getItem("i18nextLng");
  const [questionnaireValues, setQuestionnaireValues] = useState({
    ...initialQuestionnaireValues,
  });
  const [externalSystem, setExternalSystem] = useState({});
  const [inputFieldDetails, setInputFieldDetails] = useState([]);
  const [inputFieldList, setInputFieldList] = useState([]);
  const [error, setError] = useState(false);
  const [logoIcons, setLogoIcons] = useState(null);
  const [videoLinks, setvideoLinks] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  // console.log("questionnaireValues", questionnaireValues?.externalSystemId);
  const handleWhatsAppButtonClick = () => {
    const whatsappUrl = "https://api.whatsapp.com/send?phone=972584222456";
    window.location.href = whatsappUrl;
  };
  const onExternalSystemChange = (value) => {
    setQuestionnaireValues((prev) => ({
      ...prev,
      externalSystemId: value?.value,
    }));
    const token = localStorage.getItem("accessToken");
    Api.getExternalCustomizedField(value?.value, token)
      .then(async (res) => {
        setInputFieldList(res?.listInputLabelDetails);
        // console.log("datareview", res);
        setLogoIcons(res?.logoIcon);
        setvideoLinks(res?.videoLink);
        setInputFieldDetails(res?.listInputLabelDetails);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };

  const handleInputChange = (fieldName, newValue) => {
    try {
      setInputFieldDetails((prevDetails) => {
        const updatedDetails = prevDetails.map((field) => {
          if (field?.FieldLabelName === fieldName) {
            if (fieldName === "user_email") {
              if (!/\S+@\S+\.\S+/.test(newValue)) {
                setEmailError(true);
              } else {
                setEmailError(false);
              }
            }
            return {
              ...field,
              FieldLabelValue: newValue,
            };
          }
          return field;
        });
        return updatedDetails;
      });
    } catch (e) {
      console.log("e", e);
    }
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validateInputFields = () => {
    const errors = {};
    inputFieldDetails.forEach((element) => {
      if (!element.FieldLabelValue) {
        errors[element.FieldLabelName] = "Input Field Required";
      } else if (
        element.FieldLabelName === "user_email" &&
        questionnaireValues?.externalSystemId === 2
        && !isValidEmail(element.FieldLabelValue)
      ) {
        errors[element.FieldLabelName] = "Invalid email address";
      }
    });
    setFieldErrors(errors);
    return Object.keys(errors).length === 0; // Returns true if there are no errors
  };

  const handleSUbmit = async () => {

    if (inputFieldList.length === 0) {
      setError(true);
      return false;
    };
    setError(false)
    const isValid = validateInputFields();
    if (isValid) {

      setLoading(true);
      const token = localStorage?.getItem("accessToken");
      try {
        if (questionnaireValues?.externalSystemId === 1) {
          setLoading(true);
          const token = localStorage?.getItem("accessToken");
          let data = { listInputLabelDetails: [] };
          data.ExternalSystemId = questionnaireValues?.externalSystemId;
          data.Companyid = "1014";
          await Api.SaveExternalCustomizedExternalSystemId(data, token)
            .then((response) => {
              // console.log("response", response);
              setLoading(false);
              if (response === false) {
                history.push("/welcomeScreen");
                setLoading(false);
              } else {
                history.push("/welcomeScreen");
                setLoading(false);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (questionnaireValues?.externalSystemId === 2) {
          let data = { listInputLabelDetails: [] };
          inputFieldDetails.forEach((element) => {
            data.listInputLabelDetails.push({
              FieldLabelName: element?.FieldLabelName,
              FieldLabelValue: element?.FieldLabelValue,
            });
          });
          data.ExternalSystemId = questionnaireValues?.externalSystemId;
          data.Companyid = "1014";
          const response = await Api.SaveExternalCustomizedExternalSystemId(
            data,
            token
          );
          // console.log("response: ", response);
          if (response === false) {
            history.push("/welcomeScreen");
          } else {
            history.push("/welcomeScreen");
          }
        } else if (questionnaireValues?.externalSystemId === 3) {
          setLoading(true);
          const token = localStorage?.getItem("accessToken");
          let data = { listInputLabelDetails: [] };
          data.ExternalSystemId = questionnaireValues?.externalSystemId;
          data.Companyid = "1014";
          await Api.SaveExternalCustomizedExternalSystemId(data, token)
            .then((response) => {
              // console.log("response", response);
              setLoading(false);
              if (response === false) {
                history.push("/welcomeScreen");
                setLoading(false);
              } else {
                history.push("/welcomeScreen");
                setLoading(false);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (questionnaireValues?.externalSystemId === 4) {
          setLoading(true);
          const token = localStorage?.getItem("accessToken");
          let data = { listInputLabelDetails: [] };
          data.ExternalSystemId = questionnaireValues?.externalSystemId;
          data.Companyid = "1014";
          await Api.SaveExternalCustomizedExternalSystemId(data, token)
            .then((response) => {
              // console.log("response", response);
              setLoading(false);
              if (response === false) {
                history.push("/welcomeScreen");
                setLoading(false);
              } else {
                history.push("/welcomeScreen");
                setLoading(false);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (e) {
        console.log("e", e);
      }
    } else {
      const firstErrorField = Object.keys(fieldErrors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField)?.scrollIntoView();
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    Api.getExternalSystem(token)
      .then(async (res) => {
        const options = Object.keys(res).map((key) => ({
          label: res[key],
          value: parseInt(key, 10),
        }));
        setExternalSystem(options);
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, []);
  return (
    <div>
      <h1 className="font-semibold text-2xl mb-[10px] text-center mt-3">
        {t("Questionnaire3.part49")}
      </h1>
      <p className="text-base font-normal text-gray-500 text-center">
        {t("Questionnaire1.pleasecheckout")} &nbsp;
        <span
          className={
            ishbrews === "he"
              ? "cursor-pointer text-primary-color text-left flex flex-row-reverse justify-center"
              : "cursor-pointer text-primary-color text-left"
          }
          onClick={handleWhatsAppButtonClick}
        >
          {t("Questionnaire1.part42")}
        </span>
      </p>

      <div className={ishbrews === "he" ? "row flex-row-reverse" : "row"}>
        <div
          className={ishbrews === "he" ? "col-md-12 text-right" : "col-md-12"}
        >
          <label
            htmlFor="firstNameInput"
            className="mb-[10px] text-sm font-semibold text-text-color mt-3"
          >
            {t("Questionnaire3.part50")}
            <span className="text-primary-color"> * </span>
          </label>{" "}
          <br />
          <SelectField
            options={externalSystem}
            defaultValue={questionnaireValues?.externalSystemId}
            handleChange={onExternalSystemChange}
          />
          {error && !questionnaireValues?.externalSystemId && (
            <span
              className={
                ishbrews === "he" ? "text-red-600 text-right" : "text-red-600"
              }
            >
              Please select at least one of the following
            </span>
          )}
        </div>
      </div>

      <div className={ishbrews === "he" ? "row flex-row-reverse" : "row"}>
        <div
          className={ishbrews === "he" ? "col-md-12 text-right" : "col-md-12"}
        >
          <div
            className={
              ishbrews === "he"
                ? "flex gap-3  flex-row-reverse items-center mt-[11px] mb-4"
                : "flex gap-3 justify-start items-center mt-[11px] mb-4"
            }
          >
            <SiOnlyoffice size={"40px"} style={{ color: "#8ECAE6" }} />
            <span className=" text-lg font-semibold text-text-color ">
              {" "}
              Company name
            </span>
          </div>
          <h1 className="font-semibold text-2xl mb-[10px] ">
            {t("Questionnaire1.part32")}
          </h1>
          <p className="text-base font-normal text-gray-500 mb-3 ">
            {t("Questionnaire1.part33")}
            &nbsp;{" "}
            <span
              className={
                ishbrews === "he"
                  ? "cursor-pointer text-primary-color text-left flex flex-row-reverse "
                  : "cursor-pointer text-primary-color text-left"
              }
              onClick={handleWhatsAppButtonClick}
            >
              {t("Questionnaire1.part42")}
            </span>
          </p>
        </div>
      </div>

      <div className={ishbrews === "he" ? "row flex-row-reverse" : "row"}>
        <div
          className={ishbrews === "he" ? "col-md-12 text-right" : "col-md-12"}
        >
          {inputFieldList &&
            inputFieldList?.map((item, idx) => {
              return (
                <div>
                  <div key={idx}>
                    <label
                      htmlFor="firstNameInput"
                      className="mb-[10px] text-sm font-semibold text-text-color "
                    >
                      {item?.FieldLabelName}
                      <span className="text-primary-color"> * </span>
                    </label>
                    <input
                      className={
                        ishbrews === "he"
                          ? "block w-full px-2 py-[10px] mb-[10px] text-base text-right md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                          : "block w-full px-2 py-[10px] mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                      }
                      type={item?.FieldTypeDesc}
                      // id="listLabel"
                      required
                      placeholder="label"
                      value={item?.FieldLabelValue}
                      onChange={(event) => {
                        handleInputChange(
                          item.FieldLabelName,
                          event.target.value
                        );
                      }}
                      // onChange={}
                    />
                    {fieldErrors[item.FieldLabelName] && (
                      <span className="text-red-600">
                        {fieldErrors[item.FieldLabelName]}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}


          {
            logoIcons && <div className="mt-4">
              {
                ishbrews === "he" ? <div className="mt-2 flex flex-row-reverse">
                  <img src={logoIcons} alt="logoIcon" />
                </div> :<div className="mt-2">
                  <img src={logoIcons} alt="logoIcon" />
                </div>
              }

            </div>
          }
          {videoLinks && (
            <div className="mt-4  flex justify-center">
              <ReactPlayer
                url={videoLinks}
                width="88%"
                height="400px"
                controls={true}
              />
            </div>
          )}
        </div>
      </div>

      <div
        className={
          ishbrews === "he"
            ? " flex flex-row-reverse justify-between  mt-20"
            : " flex flex-row justify-between  mt-20"
        }
      >
        {step === 0 || isLastStep ? (
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
          onClick={() => handleSUbmit()}
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
export default BusinessDetails;
