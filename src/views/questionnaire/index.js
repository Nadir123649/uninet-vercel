import React, { useState, useEffect, useContext } from "react";
import Filter from "../../assets/images/filter.png";
import AccountsType from "../../components/accountStep";
import AccountsInfo from "../../components/accountInfo";
import QuestionaireStepper from "../../components/questionnaireStepper";
import BusinessDetails from "../../components/businessDetails";
import Navbars from "../navbar/navbar";
import Questionnairebar from "../navbar/questionnairebar";
import { useTranslation } from "react-i18next";
import { AuthUserContext } from "../../context";
import { useLocation } from "react-router-dom";
const Questionnaire = () => {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(0);
  const { ishbrew } = useContext(AuthUserContext);
  const location = useLocation();
  const data = location.state;

  const stepperList = [
    {
      title: "Account Type",
      description: "Setup your Account Details",
    },
    {
      title: "Account Settings",
      description: "Setup your Account Details",
    },
    {
      title: "Business Info",
      description: "Your Business Related info",
    },
  ];

  useEffect(() => {
    if (data) {
      setStep(2);
    }
  }, [data]);

  return (
    <>
      <div className=" d-flex flex-column  min-h-screen px-3 md:px-2 bg-bg-linear">
        <Questionnairebar />

        <div
          className={
            ishbrew
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
              <AccountsType step={step} setStep={setStep} />
            ) : step === 1 ? (
              <AccountsInfo step={step} setStep={setStep} />
            ) : (
              <BusinessDetails step={step} setStep={setStep} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Questionnaire;
