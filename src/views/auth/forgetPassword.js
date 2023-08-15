import React, { useContext, useState } from "react";
import LogoIcon from "../../assets/images/Logo.webp";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbars from "../navbar/navbar";
import Api from "../../services/api";
import Spinner from "react-bootstrap/Spinner";
import toast, { Toaster } from "react-hot-toast";
import NeedHelp from "../../components/needHelp";
// import { AuthUserContext } from "../../context";
const ForgetPassword = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [email, setEmails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let ishbrews = localStorage.getItem("i18nextLng");
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
        Lang: ishbrews === "he" ? 2 : 1,
      })
        .then((response) => {
          // console.log("response", response);
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
          toast.error(e);
        });
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div className={ishbrews === "he" ? "bg-bg-reverse" :"bg-bg-linear"} >
      <div className="relative flex flex-col items-center justify-center w-full h-screen  wrapper-Div">
        <div className="flex flex-col items-center justify-center w-full mt-3 gap-4  mx-3 md:max-w-max-600 md:mx-0 lg:px-8">
          <div className="Logo ">
            <img
              src={LogoIcon}
              className="h-auto max-w-max-83 cursor-pointer"
              alt="verify"
              onClick={() => history.push("/")}
            />
          </div>
          <form className="w-full px-4 py-8 text-center bg-gray-100 rounded-md md:px-12 max-w-max-500 md:w-w-500">
            <h2 className="mb-3 text-3xl font-bold text-text-color">
              {t("forgotPassword.part19")}
            </h2>
            <p className="mb-3 text-bold text-gray-500">
              {t("forgotPassword.part20")}
            </p>
            <fieldset>
              <ul className="flex flex-col  mb-3">
                <li
                  className={
                    ishbrews === "he"
                      ? "flex flex-col items-end mt-2 text-right"
                      : "flex flex-col items-start mt-2"
                  }
                >
                  <label
                    htmlFor="email"
                    className={
                      ishbrews === "he"
                        ? "mb-2 text-lg font-semibold text-text-color text-right"
                        : "mb-2 text-sm font-semibold text-text-color"
                    }
                  >
                    {t("forgotPassword.part21")}
                  </label>
                  <input
                    type="email"
                    // id="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e)}
                    className={
                      ishbrews === "he"
                        ? "block w-full px-2 py-2 md:py-[10px] text-right mb-2 text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                        : "block w-full px-2 py-2 md:py-[10px] mb-2 text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                    }
                    required
                  />
                </li>
                <div className={ishbrews === "he" ? "text-right" : "text-left"}>
                  {error && !email ? (
                    <span className="text-red-600">
                      {t("signin.Emailisrequired")}
                    </span>
                  ) : !isValid ? (
                    <span className="text-red-600">
                      {t("signin.Invalidemail")}
                    </span>
                  ) : (
                    <span className="text-red-600"></span>
                  )}
                </div>
              </ul>

              <div
                className={
                  ishbrews === "he"
                    ? "flex flex-row-reverse justify-center gap-4 mx-12 submit-email"
                    : "flex row justify-center gap-4 mx-12 submit-email"
                }
              >
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
                      <span className="">{t("signin.Loading")}...</span>
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
        <Navbars />
        <NeedHelp />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ForgetPassword;
