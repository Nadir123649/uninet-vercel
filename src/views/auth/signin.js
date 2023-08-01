import React from "react";
import InputField from "../../components/inputField";
import GoogleIcon from "../../assets/images/google-icon.png";
import LogoIcon from "../../assets/images/Logo.webp";
import { useHistory } from "react-router-dom";

const Signin = () => {
  const history = useHistory();
  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-bg-linear wrapper-Div">
      <div className="flex flex-col items-center justify-center w-full h-full gap-4 m-auto mx-3 md:max-w-max-600 md:mx-0 lg:px-8">
        <div className="hidden Logo md:block">
          <img src={LogoIcon} className="h-auto max-w-max-83" />
        </div>
        <form className="w-full px-4 py-8 text-center bg-gray-100 rounded-md md:px-8 max-w-max-500 md:w-w-500 ">
          <h2 className="mb-2 text-3xl font-bold lg:mb-3 text-text-color">
            Sign In
          </h2>
          <p className="mb-3 text-xs text-gray-500">Your Social Campaigns</p>
          <fieldset>
            <div className="row">
              <div className="col-md-12">
                <button
                  href="#"
                  className="flex items-center justify-center w-full gap-2 px-8 py-[10px] md:py-3 text-sm text-gray-700 border border-solid rounded-md border-bg-border bg-bg-btn"
                >
                  <span>
                    <img src={GoogleIcon} className="w-5 h-5" />
                  </span>
                  <span> Sign in with Google</span>
                </button>
              </div>
            </div>
            <div class="separator flex items-center text-center mt-4 md:mt-8 mb-4 md:mb-8 justify-center">
              <span className="text-xs font-normal md:text-sm text-text-color">
                Or with email
              </span>
            </div>
            <ul className="flex flex-col">
              <li className="flex flex-col items-start">
                <label
                  htmlFor="email"
                  className="mb-2 text-sm font-semibold text-text-color"
                >
                  Company email
                </label>
                <input
                  type="email"
                  id="email"
                  className="block w-full px-2 py-2 md:py-[10px] mb-2 text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                  required
                />
              </li>
              <li className="flex flex-col items-start">
                <label
                  htmlFor="password"
                  className="mb-2 text-sm font-semibold text-text-color"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="block w-full px-2 py-2 md:py-[10px] mb-2 text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                  required
                />
              </li>
            </ul>
            <div className="flex justify-end gap-3 mb-3 text-xs font-semibold">
              <p
                class="cursor-pointer text-primary-color"
                onClick={() => history.push("/forget-password")}
              >
                Forgot Password ?
              </p>
            </div>
          </fieldset>
          <button
            className="w-full py-2 mb-3 text-base font-medium text-white border-none rounded-md md:text-lg bg-bg-secondary secondary-btn"
            onClick={() => history.push("/verify-email")}
          >
            Continue
          </button>
          <p  className="m-0 mt-3 text-sm font-normal text-gray-500">
            Not a Member yet?{" "}
            <span
              className="cursor-pointer text-primary-color"
              onClick={() => history.push("/signup")}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
