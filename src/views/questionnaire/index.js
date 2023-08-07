import React, { useState, useEffect} from "react";
import AccountsType from "../../components/accountStep";
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
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(0);
  const location = useLocation();
  const data = location.state;
  let ishbrews = localStorage.getItem('i18nextLng') 
  const [questionnaireValues, setQuestionnaireValues] = useState({
    ...initialQuestionnaireValues,
  });
  const [isLastStep, setIsLastStep] = useState(false);

  const stepperList = [
    {
      title: t('Questionnaire1.accountType'),
    },
    {
      title: "User details",
    },
    {
      title: "Connect to Uninet",
    },
  ];

  useEffect(() => {
    if (data) {
      setStep(2);
      setIsLastStep(true);
    }
  }, [data]);

  return (
    <>
      <div className=" d-flex flex-column  min-h-screen px-3 md:px-2 bg-bg-linear">
        <Questionnairebar />

        <div
          className={
            ishbrews == "he"
              ? "flex  flex-row-reverse gap-4 pt-3 mt-2 mb-3 mx-4"
              : "flex gap-4 mt-2 mb-3  pt-3 mx-4"
          }
        >
          <QuestionaireStepper
            activeStep={step}
            // values={values}
            stepperList={stepperList}
          />

          <div className="content w-full bg-bg-btn rounded-md py-4 px-4">
            {step === 0 ? (
              <AccountsType
                step={step}
                setStep={setStep}
                questionnaireValues={questionnaireValues}
                setQuestionnaireValues={setQuestionnaireValues}
              />
            ) : step === 1 ? (
              <AccountsInfo
                step={step}
                setStep={setStep}
                questionnaireValues={questionnaireValues}
                setQuestionnaireValues={setQuestionnaireValues}
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
      </div>
    </>
  );
};

export default Questionnaire;
