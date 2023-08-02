import React from "react";
import Filter from "../../assets/images/filter.png";
import AccountsType from "../../components/accountStep";
import AccountsInfo from "../../components/accountInfo";
import { useState } from "react";
import QuestionaireStepper from "../../components/questionnaireStepper";
import BusinessDetails from "../../components/businessDetails";

const Home = () => {
  const [step, setStep] = useState(0);
  const handleSubmit = () => {
    if (step <= 1) setStep(step + 1);
    else {
      setStep(2);
      alert("You are at last step");
    }
  };
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
  return (
    <>
      <div className="d-flex flex-column h-screen bg-bg-secondary">
        <div className="end-button flex flex-row justify-end gap-3 p-4 ">
          <button className="flex items-center justify-center gap-2 px-[22px] text-base font-semibold  py-[9px] text-text-color rounded-md bg-bg-btn">
            <span>
              <img
                src={Filter}
                style={{ maxWidth: "25px" }}
                className=""
                alt="filter"
              />
            </span>
            <span>Filter</span>
          </button>
          <button className="bg-primary-color  text-base px-[22px] font-semibold  py-[9px] text-white rounded-md">
            Create
          </button>
        </div>

        <div className="flex gap-4 mt-2 mb-3 mx-2 ">
          <QuestionaireStepper
            activeStep={step}
            // values={values}
            stepperList={stepperList}
          />

          <div className="content w-full bg-bg-btn rounded-md py-4 px-4">
            {step === 0 ? (
              <AccountsType />
            ) : step === 1 ? (
              <AccountsInfo />
            ) : (
              <BusinessDetails />
            )}
            <div className="flex flex-row justify-end  mt-20">
              <button
                onClick={() => handleSubmit()}
                className=" bg-bg-secondary  text-base px-[22px] font-semibold  py-[9px] text-white rounded-md "
              >
                <span></span>
                <span>Continue</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
