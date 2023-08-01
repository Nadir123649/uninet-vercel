import React from "react";
import LogoIcon from "../../assets/images/Logo.webp";
import { useHistory } from "react-router-dom";

const ForgetPassword = () => {
  const history = useHistory();
  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-bg-linear wrapper-Div">
      <div className="flex flex-col items-center justify-center h-full gap-4 m-auto max-w-max-600 ">
        <div className="Logo">
          <img src={LogoIcon} className="h-auto max-w-max-83" />
        </div>
        <form className="px-8 text-center bg-gray-100 rounded-md py-9 max-w-max-500 w-w-500">
          <h2 className="mb-3 text-3xl font-bold text-text-color">
            Forgot Password?
          </h2>
          <p className="mb-3 text-xs text-gray-500">
            Enter your email to reset your password
          </p>
          <fieldset>
            <ul className="flex flex-col">
              <li className="flex flex-col items-start">
                <label
                  for="email"
                  className="mb-2 text-sm font-semibold text-text-color"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="block w-full px-2  py-[10px] mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                  required
                />
              </li>
            </ul>

            <div className="flex justify-center gap-4 mx-12 submit-email">
              <button type="submit" className="w-2/5 py-[10px] text-white border-none rounded-md outline-none bg-bg-secondary">Submit</button>
              <button className="w-2/5 py-[10px] border-none rounded-md outline-none text-text-color bg-bg-disable" onClick={() => history.push("/")}>
                Go back
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
