import React from "react";
import verify from "../../assets/images/verify-email.png";
import LogoIcon from "../../assets/images/Logo.webp";

const VerifyEmail = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-bg-linear wrapper-Div">
      <div className="flex flex-col items-center justify-center h-full gap-4 m-auto max-w-max-600 ">
        <div className="Logo">
          <img src={LogoIcon} className="h-auto max-w-max-83" />
        </div>
        <form className="px-8 text-center bg-gray-100 rounded-md py-9 max-w-max-500 w-w-500">
          <div className="verify-box">
            <img src={verify} className="mx-auto mb-2 h-130 max-w-max-200" />
          </div>
          <h2 className="mb-3 text-3xl font-bold text-text-color">
            Verify it's you
          </h2>
          <p className="mb-3 text-xs text-gray-500">
            Enter your verified code below
          </p>
          <fieldset>
            <ul className="flex flex-col">
              <li className="flex flex-col items-start">
                <label
                  for="text"
                  className="mb-2 text-sm font-semibold text-text-color"
                >
                  Verified code
                </label>
                <input
                  type="text"
                  id="text"
                  className="block w-full px-2  py-[10px]  mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                  required
                />
              </li>
            </ul>
            <button className="w-full py-[10px] mb-3 text-base font-medium text-white border-none rounded-md bg-bg-secondary secondary-btn">
              Submit
            </button>
            <p className="mb-0">
              <b>Still have not received a code?</b>
            </p>
            <p className="m-0 text-sm font-normal text-gray-500">
              Check your spam/updates folder or{" "}
              <span className="text-primary-color">get a new code</span>
            </p>
            <div class="separator flex items-center text-center justify-center mt-3 mb-3">
              <span className="text-sm font-normal text-text-color">Or</span>
            </div>
            <p className="m-0 text-sm font-normal text-gray-500">
              Noticed a type in your email?{" "}
              <span className="text-primary-color">Edit email address</span>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
