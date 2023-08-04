import React, { useContext, useState } from "react";
import LogoIcon from "../../assets/images/Logo.webp";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbars from "../navbar/navbar";
import Api from "../../services/api";
import Spinner from "react-bootstrap/Spinner";
import toast, { Toaster } from "react-hot-toast";

const ForgetPassword = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const [email, setEmails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    try {
      const inputValue = e.target.value;
      setEmails(inputValue);
      if (inputValue) setIsValid(emailRegex.test(inputValue));
    } catch (e) {
      console.log("e", e);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // if()
      if (!email) {
        setError(true);
        return false;
      }
      if (!isValid) {
        return false;
      }
      setLoading(true);
      await Api.forgotPassword({
        email,
      })
        .then((response) => {
          console.log("response", response);
          if (response === false) {
            toast.error("Email is not valid! Please user valid email");
          } else {
            toast.success(
              "Reset password Link Sent by email address! Please Check your email "
            );
          }
          setLoading(false);
        })
        .catch((e) => {
          console.error(e?.data?.error);
          // toast.error(e?.data?.error);
        });
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div className="bg-bg-linear">
      <Navbars />
      <div className="relative flex items-center justify-center w-full h-screen  wrapper-Div">
        <div className="flex flex-col items-center justify-center w-full mt-3 gap-4  mx-3 md:max-w-max-600 md:mx-0 lg:px-8">
          <div className="Logo ">
            <img src={LogoIcon} className="h-auto max-w-max-83" alt="verify" />
          </div>
          <form className="w-full px-4 py-8 text-center bg-gray-100 rounded-md md:px-12 max-w-max-500 md:w-w-500">
            <h2 className="mb-3 text-3xl font-bold text-text-color">
              {t("forgotPassword.part19")}
            </h2>
            <p className="mb-3 text-xs text-gray-500">
              {t("forgotPassword.part20")}
            </p>
            <fieldset>
              <ul className="flex flex-col text-start mb-3">
                <li className="flex flex-col items-start">
                  <label
                    htmlFor="email"
                    className="mb-2 text-sm font-semibold text-text-color"
                  >
                    {t("forgotPassword.part21")}
                  </label>
                  <input
                    type="email"
                    // id="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e)}
                    className="block w-full px-2  py-[10px] mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                    required
                  />
                </li>
                {error && !email ? (
                  <span className="text-red-600">Email required</span>
                ) : !isValid ? (
                  <span className="text-red-600">Invalid email</span>
                ) : (
                  <span className="text-red-600"></span>
                )}
              </ul>

              <div className="flex justify-center gap-4 mx-12 submit-email">
                <button
                  type="submit"
                  className="w-2/5 py-[10px] text-white border-none rounded-md outline-none bg-bg-secondary"
                  onClick={(e) => handleSubmit(e)}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      <span className="">Loading...</span>
                    </>
                  ) : (
                    <>{t("forgotPassword.part22")}</>
                  )}
                </button>
                <button
                  className="w-2/5 py-[10px] border-none rounded-md outline-none text-text-color bg-bg-disable"
                  onClick={() => history.push("/")}
                >
                  {t("forgotPassword.part23")}
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ForgetPassword;
