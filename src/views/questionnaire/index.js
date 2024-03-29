import React, { useState, useEffect } from "react";
import AccountsType from "../../components/accountStep";
import AccountsInfo from "../../components/accountInfo";
import QuestionaireStepper from "../../components/questionnaireStepper";
import BusinessDetails from "../../components/businessDetails";
import Questionnairebar from "../navbar/questionnairebar";
import { useTranslation } from "react-i18next";
import NeedHelp from "../../components/needHelp";
import { useLocation } from "react-router-dom";
import Navbars from "../navbar/navbar";
import { ToastContainer } from "react-toastify";
const Questionnaire = () => {
  const initialQuestionnaireValues = {
    FirstName: "",
    LastName: "",
    MobileNumber: "",
    OrganizationRole: "",
  };
  const [businessType, setBusinessType] = useState("");

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
      title: t("Questionnaire1.UserDetails"),
    },
    {
      title: t("Questionnaire1.ConnectToUninet"),
    },
  ];

  useEffect(() => {
    if (data) {
      setStep(2);
      setIsLastStep(true);
    }
  }, [data]);

  useEffect(() => {
    if (localStorage.getItem("Q1_Q2_InidicationRes") === "true") {
      setStep(2);
      setIsLastStep(true);
    }
  }, [localStorage]);

  return (
    <div
      className={
        ishbrews === "he"
          ? "container-fluid bg-bg-reverse p-0"
          : "container-fluid bg-bg-linear p-0"
      }
    >
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
                setBusinessType={setBusinessType}
                businessType={businessType}
              />
            ) : step === 1 ? (
              <AccountsInfo
                step={step}
                setStep={setStep}
                questionnaireValues={questionnaireValues}
                setQuestionnaireValues={setQuestionnaireValues}
                setBusinessType={setBusinessType}
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
        <NeedHelp />
        <ToastContainer rtl={ishbrews === "he" ? true : false} />
      </div>
    </div>
  );
};

export default Questionnaire;
