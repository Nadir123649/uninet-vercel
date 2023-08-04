import { Steps } from "antd";
import React,{useContext} from "react";
import {AuthUserContext} from "../context"
const { Step } = Steps;
const QuestionaireStepper = ({ activeStep, values, stepperList }) => {
  const { ishbrew } = useContext(AuthUserContext);
  return (
    <div className={ishbrew ? "stepper-wrapper w-1/3 flex bg-primary-color py-5 rounded-md px-4 flex-row-reverse": "stepper-wrapper w-1/3 flex bg-primary-color py-5 rounded-md px-4"}>
      <Steps direction={"vertical"} current={activeStep}>

        {stepperList?.map((item, idx) => (
          <Step title={item?.title} description={item?.description} key={idx} />
        ))}
      </Steps>
    </div>
  );
};
export default QuestionaireStepper;