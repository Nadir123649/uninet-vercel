import { Steps } from "antd";
import React, { useContext } from "react";
const { Step } = Steps;
const QuestionaireStepper = ({ activeStep, values, stepperList }) => {
  let ishbrews = localStorage.getItem("i18nextLng");

  return (
    <div
      className={
        ishbrews === "he"
          ? "stepper-wrapper w-full pt-[25px] pb[20px] lg:w-1/3 flex bg-bg-second  md:pb-5 md:pt-[50px] rounded-md pr-4 flex-row-reverse"
          : "stepper-wrapper w-full pt-[25px] pb-[20px] lg:w-1/3 flex bg-bg-second  md:pb-5 md:pt-[50px] rounded-md pl-8"
      }
    >
      <Steps
        direction={"vertical"}
        current={activeStep}
        className={ishbrews === "he" ? "rtl-rule" : "lft-rule"}
      >
        {stepperList?.map((item, idx) => (
          <Step title={item?.title} description={item?.description} key={idx} />
        ))}
      </Steps>
    </div>
  );
};
export default QuestionaireStepper;
