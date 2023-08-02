import { Steps } from "antd";
import React from "react";
const { Step } = Steps;
const QuestionaireStepper = ({ activeStep, values, stepperList }) => {
  return (
    <div className="stepper-wrapper w-1/4 bg-primary-color py-5 rounded-md px-2">
      <Steps direction={"vertical"} current={activeStep}>

        {stepperList?.map((item, idx) => (
          <Step title={item?.title} description={item?.description} key={idx} />
        ))}
      </Steps>
    </div>
  );
};
export default QuestionaireStepper;