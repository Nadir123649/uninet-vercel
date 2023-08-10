import React, { useEffect, useState } from "react";
import { SiOnlyoffice } from "react-icons/si";
import { useTranslation } from "react-i18next";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import SelectField from "./selectField";
import Api from "../services/api";
import Spinner from "react-bootstrap/Spinner";
import { useHistory } from "react-router-dom";

const BusinessDetails = ({ step, setStep, isLastStep }) => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
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
  const [errorMessageVideo, setErrorMessageVideo] = useState("");
  const [videoLinksVideo, setVideoLinksVideo] = useState("");
  const [videoLinksVideoOne, setVideoLinksVideoOne] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessageImage, setErrorMessageImage] = useState("");
  const [errorMessageImageOne, setErrorMessageImageOne] = useState("");
  const [loading, setLoading] = useState(false);
  // console.log("questionnaireValues",questionnaireValues?.externalSystemId);
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

  //video field
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["video/mp4", "video/webm", "video/ogg"];
      if (allowedTypes.includes(selectedFile.type) === true) {
        setErrorMessageVideo("");
        setVideoLinksVideo(selectedFile);
      } else {
        setErrorMessageVideo(
          "Please select a valid video file (MP4, WebM, or OGG)."
        );
      }
    }
  };

  // Image field
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.startsWith("image/") === true) {
        setSelectedImage(selectedFile);
        setErrorMessageImage("");
      } else {
        setSelectedImage(null);
        setErrorMessageImage("Please select a valid image file.");
      }
    }
  };

  const handleSUbmit = async () => {
    try {
      if (inputFieldList.length === 0) {
        setError(true);
        return false;
      }

      let data = {
        listInputLabelDetails: [],
      };
      let hasError = false;
      inputFieldDetails.forEach((element) => {
        if (!element?.FieldLabelValue) {
          hasError = true;
        }
      });
      setErrorMessage(hasError);
      if (!hasError) {
        data.listInputLabelDetails = [];
        inputFieldDetails.forEach((element) => {
          data.listInputLabelDetails.push({
            FieldLabelName: element?.FieldLabelName,
            FieldLabelValue: element?.FieldLabelValue,
          });
        });
      }
      setError(false);
      if (!selectedImage) {
        setErrorMessageImageOne(true);
        return false;
      }
      setErrorMessageImageOne(false);
      if (!videoLinksVideo) {
        setVideoLinksVideoOne(true);
        return false;
      }
      setVideoLinksVideoOne(false);
      setLoading(true);
      data.ExternalSystemId = questionnaireValues?.externalSystemId;
      data.Companyid = "1014";
      data.logoIcon = selectedImage;
      data.videoLink = videoLinksVideo;

      if (data.listInputLabelDetails.length === 5) {
        const token = localStorage?.getItem("accessToken");
        await Api.SaveExternalCustomizedExternalSystemId(data, token)
          .then((response) => {
            // console.log("response", response);
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
            setLoading(false);
          });
      }

      // Update data object

      // inputFieldDetails.forEach((element)=>{
      // if(!element?.FieldLabelValue){
      //   setErrorMessage(true)
      //   return false
      // }
      // setErrorMessage(false)
      //   data.listInputLabelDetails.push({
      //     FieldLabelName: element?.FieldLabelName,
      //     FieldLabelValue: element?.FieldLabelValue
      //   });
      // })

      // data.ExternalSystemId = questionnaireValues?.externalSystemId;
      // console.log("data",data);
    } catch (e) {
      console.log("e", e);
      setLoading(false);
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
        {t("Questionnaire1.pleasecheckout")}
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
          {error && (
            <span
              className={
                ishbrews === "he" ? "text-red-600 text-right" : "text-red-600"
              }
            >
              Please select at least one of the following
            </span>
          )}
          {/* <input
            className="block w-full px-2 py-[10px] mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
            type="text"
            id="listLabel"
            placeholder=""
            // value={}
            // onChange={}
          />{" "} */}
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
          <p className="text-base font-normal text-gray-500 mb-3">
            {t("Questionnaire1.part33")}
            <span
              className="cursor-pointer text-primary-color"
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
              // console.log("item?.FieldLabelValue", item?.FieldLabelValue);
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
                  </div>
                  {errorMessage && (
                    <span
                      className={
                        ishbrews === "he"
                          ? "text-red-600 text-right"
                          : "text-red-600"
                      }
                    >
                      All Input Field required
                    </span>
                  )}
                </div>
              );
            })}
          {logoIcons && (
            <div>
              <label
                htmlFor="firstNameInput"
                className="mb-[10px] text-sm font-semibold text-text-color "
              >
                Icon Image
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                required
                className={
                  ishbrews === "he"
                    ? "block w-full px-2 py-[10px] mb-[10px] text-base text-right md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                    : "block w-full px-2 py-[10px] mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                }
              />
              {errorMessageImage ? (
                <span
                  className={
                    ishbrews === "he"
                      ? "text-red-600 text-right"
                      : "text-red-600"
                  }
                >
                  {errorMessageImage}
                </span>
              ) : (
                errorMessageImageOne && (
                  <span
                    className={
                      ishbrews === "he"
                        ? "text-red-600 text-right"
                        : "text-red-600"
                    }
                  >
                    Field required
                  </span>
                )
              )}
            </div>
          )}
          {videoLinks && (
            <div>
              <label
                htmlFor="firstNameInput"
                className="mb-[10px] text-sm font-semibold text-text-color "
              >
                Icon Video
              </label>
              <input
                type="file"
                id="videoInput"
                name="videoInput"
                accept="video/mp4, video/webm, video/ogg"
                required
                onChange={handleFileChange}
                className="block w-full px-2 py-[10px] mb-[10px] text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
              />
              {errorMessageVideo ? (
                <span
                  className={
                    ishbrews === "he"
                      ? "text-red-600 text-right"
                      : "text-red-600"
                  }
                >
                  {errorMessageVideo}
                </span>
              ) : (
                videoLinksVideoOne && (
                  <span
                    className={
                      ishbrews === "he"
                        ? "text-red-600 text-right"
                        : "text-red-600"
                    }
                  >
                    Field required
                  </span>
                )
              )}
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
