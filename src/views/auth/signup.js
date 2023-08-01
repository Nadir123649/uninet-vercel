import React from "react";
import InputField from "../../components/inputField";
import GoogleIcon from "../../assets/images/google-icon.png";
import LogoIcon from "../../assets/images/Logo.webp";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const history = useHistory();
  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-bg-linear wrapper-Div">
      <div className="flex flex-col items-center justify-center h-full gap-4 m-auto max-w-max-600 ">
        <div className="Logo">
          <img src={LogoIcon} className="h-auto max-w-max-83" />
        </div>
        <form className="px-8 text-center bg-gray-100 rounded-md py-9 max-w-max-500 w-w-500">
          <h2 className="mb-3 text-3xl font-bold text-text-color">Sign Up</h2>
          <p className="mb-3 text-xs text-gray-500">Your Social Campaigns</p>
          <fieldset>
            <div className="row">
              <div className="col-md-12">
                <button
                  href="#"
                  className="flex items-center justify-center w-full gap-2 px-8 py-3 text-sm text-gray-700 border border-solid rounded-md border-bg-border bg-bg-btn "
                >
                  <span>
                    <img src={GoogleIcon} className="w-5 h-5"/>
                  </span>
                  <span> Sign up with Google</span>
                </button>
              </div>
            </div>
            <div class="separator flex items-center text-center mt-8 mb-8 justify-center">
              <span className="text-sm font-normal text-text-color">Or with email</span>
            </div>
            <ul className="flex flex-col">
              <li className="flex flex-col items-start">
                <label
                  for="email"
                  className="mb-2 text-sm font-semibold text-text-color"
                >
                  Company email
                </label>
                <input
                  type="email"
                  id="email"
                  className="block w-full px-2 py-2 mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                  required
                />
              </li>
              <li className="flex flex-col items-start">
                <label
                  for="password"
                  className="mb-2 text-sm font-semibold text-text-color"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="block w-full px-2  py-[10px]  mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                  required
                />
              </li>
            </ul>
          </fieldset>
          <button
            className="w-full py-[10px] mb-3 mt-1 text-base font-medium text-white border-none rounded-md bg-bg-secondary secondary-btn"
            onClick={() => history.push("/verify-email")}
          >
            Continue
          </button>
          <p href="#" className="m-0 text-sm font-normal text-gray-500">
            Already have an account{" "}
            <span className="cursor-pointer text-primary-color">Sign in</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
