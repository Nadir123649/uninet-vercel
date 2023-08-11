import React, { useState, useEffect } from "react";
import AccountsType from "../../components/accountStep";
import { BsWhatsapp } from "react-icons/bs";
import AccountsInfo from "../../components/accountInfo";
import QuestionaireStepper from "../../components/questionnaireStepper";
import BusinessDetails from "../../components/businessDetails";
import Questionnairebar from "../navbar/questionnairebar";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Navbars from "../navbar/navbar";
const Questionnaire = () => {
  const initialQuestionnaireValues = {
    FirstName: "",
    LastName: "",
    MobileNumber: "",
    OrganizationRole: "",
  };
  const [businessType, setBusinessType] = useState("")
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const location = useLocation();
  const data = location.state;
  let ishbrews = localStorage.getItem("i18nextLng");
  const [questionnaireValues, setQuestionnaireValues] = useState({
    ...initialQuestionnaireValues,
  });
  const [isLastStep, setIsLastStep] = useState(false);

  const stepperList = [
    {
      title: t("Questionnaire1.accountType"),
    },
    {
      title: t("Questionnaire1.User details"),
    },
    {
      title:   t("Questionnaire1.Connect to Uninet"),
    },
  ];

  useEffect(() => {
    if (data) {
      setStep(2);
      setIsLastStep(true);
    }
  }, [data]);
  const handleWhatsAppButtonClick = () => {
    const whatsappUrl = "https://api.whatsapp.com/send?phone=972584222456";
    window.location.href = whatsappUrl;
  };

  return (
    <div className="container-fluid bg-bg-linear p-0">
      <div className="container d-flex px-2 flex-column  min-h-screen md:px-2 ">
        <Questionnairebar />

        <div
          className={
            ishbrews === "he"
              ? "flex  flex-col  lg:flex-row-reverse gap-4 pt-3 mt-2 mb-3 mx-4"
              : "flex flex-col mx-2 lg:flex-row gap-4 mt-2 mb-3  pt-3 md:mx-4"
          }
        >
          <QuestionaireStepper
            activeStep={step}
            // values={values}
            stepperList={stepperList}
          />

          <div className="content w-full  bg-bg-btn rounded-md py-4 px-4">
            {step === 0 ? (
              <AccountsType
                step={step}
                setStep={setStep}
                questionnaireValues={questionnaireValues}
                setQuestionnaireValues={setQuestionnaireValues}
                setBusinessType = {setBusinessType}
                businessType={businessType}
              />
            ) : step === 1 ? (
              <AccountsInfo
                step={step}
                setStep={setStep}
                questionnaireValues={questionnaireValues}
                setQuestionnaireValues={setQuestionnaireValues}
                setBusinessType = {setBusinessType}
                businessType={businessType}
              />
            ) : (
              <BusinessDetails
                step={step}
                setStep={setStep}
                isLastStep={isLastStep}
              />
            )}
          </div>
        </div>
        <Navbars />
        <div className= {ishbrews === "he" ? "fixed  left-5 bottom-5" : "fixed  right-5 bottom-5" }>
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
      </div>
    </div>
  );
};

export default Questionnaire;
