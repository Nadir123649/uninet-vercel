import React, { useContext, useEffect, useState } from "react";
// import InputField from "../../components/inputField";
import GoogleIcon from "../../assets/images/google-icon.png";
import LogoIcon from "../../assets/images/Logo.webp";
import { useHistory, useLocation } from "react-router-dom";
import Api from "../../services/api";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from "@leecheuk/react-google-login";
import { config } from "../../configs";
import NeedHelp from "../../components/needHelp";
import { gapi } from "gapi-script";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Navbars from "../navbar/navbar";
import { useTranslation } from "react-i18next";
import queryString from "query-string";
import { AuthUserContext } from "../../context";

const Signin = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();

  const { setBusinessId } = useContext(AuthUserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [googleError, setGoogleError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let ishbrews = localStorage.getItem("i18nextLng");
  localStorage.removeItem("Q1_Q2_InidicationRes");
  localStorage.removeItem("businessId");
  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    if (inputValue) setIsValid(emailRegex.test(inputValue));
  };

  // login with Email and password
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setError(true);
        return false;
      }
      if (!isValid) {
        return false;
      }
      if (password.length < 6) {
        setErrorMessage(true);
        return false;
      }
      setErrorMessage(false);
      setLoading(true);
      await Api.SignInUser({
        email,
        password,
        Lang: ishbrews === "he" ? 2 : 1,
      })
        .then(async (res) => {
          if (res.Success === true) {
            setBusinessId(res?.BusinessId);
            if (res?.verified === true) {
              setLoading(false);
              localStorage.setItem("accessToken", res?.accessToken);
              localStorage.setItem("refreshToken", res?.refreshToken);
              if (
                res?.Q1_Q2_InidicationRes === true &&
                res?.Q3_InidicationRes === true
              ) {
                history.push("/main-console");
              } else if (res?.Q1_Q2_InidicationRes === false) {
                history.push("/questionnaire");
              } else {
                history.push({
                  pathname: "/questionnaire",
                  state: 2,
                });
              }
            } else {
              setLoading(false);
              let EncryptedUserId = res?.EncryptedUserId;
              let response = {
                EncryptedUserId,
                email,
                TemplateId: 1,
                Lang: ishbrews === "he" ? 2 : 1,
              };
              localStorage.setItem("user-details", JSON.stringify(response));
              // toast.error("The user is not verified. Please verify first.");
              history.push("/verify-email");
            }
          } else {
            setLoading(false);

            toast.error(res?.textResponse);
          }
        })
        .catch((e) => {
          console.log("error message", e);

          toast.error(e?.data?.error);
        });
    } catch (e) {
      console.log("error message", e);
      toast.error("Server Error. Please Refresh Page");
    }
  };

  const responseGoogle = async (response) => {
    if (response) {
      await Api.SignInWithGoogle({
        Email: response?.profileObj?.email,
        GoogleId: response?.tokenObj?.id_token,
        Lang: ishbrews === "he" ? 2 : 1,
      })
        .then(async (res) => {
          if (res.success === true) {
            toast.success(res?.message);
            localStorage.setItem("accessToken", res?.accessToken);
            localStorage.setItem("refreshToken", res?.refreshToken);
            if (
              res?.Q1_Q2_InidicationRes === true &&
              res?.Q3_InidicationRes === true
            ) {
              history.push("/main-console");
            } else if (res?.Q1_Q2_InidicationRes === false) {
              history.push("/questionnaire");
            } else {
              history.push({
                pathname: "/questionnaire",
                state: 2,
              });
            }
          } else {
            toast.error(res?.message);
          }
        })
        .catch((e) => {
          toast.error("Server Error. Please Refresh Page");
        });
    }
  };

  const onLoginFailure = (res) => {
    if (res.error === "popup_closed_by_user") {
    } else {
      setGoogleError(res?.details + " Enable cookies and refresh the page");
    }
  };

  useEffect(() => {
    function start() {
      gapi.auth2.init({
        clientId: config.GoogleClientID,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  useEffect(() => {
    const queryParams = queryString.parse(window.location.search);
    const referringURL = queryParams.lang || "unknown";
    if (referringURL === "en") {
      i18n.changeLanguage("en");
    }
    if (referringURL === "he") {
      i18n.changeLanguage("he");
    } else {
      i18n.changeLanguage("en");
    }
  }, []);

  return (
    <div className={ishbrews === "he" ? "bg-bg-reverse" : "bg-bg-linear"}>
      <div className="relative flex items-center justify-center w-full min-h-screen  wrapper-Div">
        <div className="flex flex-col items-center justify-center w-full gap-4  mx-3 md:max-w-max-600 md:mx-0 lg:px-8">
          <div className="Logo mt-4">
            <img src={LogoIcon} className="h-auto max-w-max-83" alt="logo" />
          </div>
          <div className="w-full px-4 py-8 text-center bg-gray-100 mb-3 rounded-md md:px-8 max-w-max-500 md:w-w-500 ">
            <h2 className="mb-2 text-3xl font-bold lg:mb-3 text-text-color">
              {t("signin.part1")}
            </h2>
            <p className="mb-3 text-sm text-gray-500">
              {t(`signin.part2`)}
              <span
                className="cursor-pointer text-primary-color"
                onClick={() => history.push("/signup")}
              >
                {t("signin.signup")}
              </span>
            </p>
            {/* <fieldset> */}
            <GoogleLogin
              clientId={config.GoogleClientID}
              render={(renderProps) => (
                <div className="row">
                  <div className="col-md-12">
                    <button
                      href="#"
                      onClick={renderProps.onClick}
                      className={
                        ishbrews === "he"
                          ? "flex items-center flex-row-reverse justify-center w-full gap-2 px-8 py-3 text-sm text-gray-700 border border-solid rounded-md border-bg-border bg-bg-btn "
                          : "flex items-center justify-center  flex-row w-full gap-2 px-8 py-3 text-sm text-gray-700 border border-solid rounded-md border-bg-border bg-bg-btn "
                      }
                    >
                      <span>
                        <img
                          src={GoogleIcon}
                          className="w-5 h-5"
                          alt="google"
                        />
                      </span>
                      <span> {t("signin.part3")}</span>
                    </button>
                  </div>
                </div>
              )}
              uxMode="redirect"
              onSuccess={responseGoogle}
              onFailure={onLoginFailure}
              cookiePolicy={"single_host_origin"}
            />
            {googleError !== "" ? (
              <span className="text-red-600">{googleError}</span>
            ) : (
              <></>
            )}

            {/* <div className="row">
              <div className="col-md-12">
                <button
                  className={
                    ishbrews == "he"
                      ? "flex items-center flex-row-reverse justify-center w-full gap-2 px-8 py-3 text-sm text-gray-700 border border-solid rounded-md border-bg-border bg-bg-btn "
                      : "flex items-center justify-center  flex-row w-full gap-2 px-8 py-3 text-sm text-gray-700 border border-solid rounded-md border-bg-border bg-bg-btn "
                  }
                >
                  <span>
                    <img src={GoogleIcon} className="w-5 h-5" alt="google" />
                  </span>
                  <span> {t("signin.part3")}</span>
                </button>
              </div>
            </div> */}

            <div className="separator flex items-center text-center mt-4 md:mt-8 mb-4 md:mb-8 justify-center">
              <span
                className={
                  ishbrews === "he"
                    ? "text-base font-normal md:text-base text-text-color text-right "
                    : "text-xs font-normal md:text-sm text-text-color"
                }
              >
                {t("signin.part4")}
              </span>
            </div>
            <form>
              <ul className="flex flex-col">
                <li
                  className={
                    ishbrews === "he"
                      ? "flex flex-col items-end"
                      : "flex flex-col items-start"
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
                    {t("signin.part5")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={
                      ishbrews === "he"
                        ? "block w-full px-[22px] py-2 md:py-[10px] text-right font-normal mb-2 text-xs md:text-lg  leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                        : "block w-full px-[22px] py-2 md:py-[10px] mb-2 font-normal text-xs md:text-lg  leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                    }
                    required
                  />
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
                </li>
                <li
                  className={
                    ishbrews === "he"
                      ? "flex flex-col items-end mt-2 text-right"
                      : "flex flex-col items-start mt-2"
                  }
                >
                  <label
                    htmlFor="password"
                    className={
                      ishbrews === "he"
                        ? "mb-2 text-lg font-semibold text-text-color text-right"
                        : "mb-2 text-sm font-semibold text-text-color"
                    }
                  >
                    {t("signin.part6")}
                  </label>
                  <div
                    className={
                      ishbrews === "he"
                        ? "flex flex-row-reverse items-center w-full px-2  py-[6px]  mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                        : "flex items-center w-full px-2  py-[6px]  mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                    }
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className={
                        ishbrews === "he"
                          ? "form-control border-none text-right"
                          : "form-control border-none"
                      }
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <AiFillEye size={25} />
                      ) : (
                        <AiFillEyeInvisible size={25} />
                      )}
                    </div>
                  </div>

                  {error && !password ? (
                    <span className="text-red-600">
                      {t("signin.Passwordisrequired")}
                    </span>
                  ) : errorMessage ? (
                    <span className="text-red-600">
                      {t("signin.passwordErrorMsg")}
                    </span>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
              <div
                className={
                  ishbrews === "he"
                    ? " flex justify-start gap-3 mb-3 text-xs font-semibold mt-2"
                    : "flex justify-end gap-3 mb-3 text-xs font-semibold mt-2"
                }
              >
                <p
                  className="cursor-pointer text-primary-color"
                  onClick={() => history.push("/forget-password")}
                >
                  {t("signin.part7")}
                </p>
              </div>
              {/* </fieldset> */}
              <button
                className="w-full py-2 mb-3 text-base font-medium text-white border-none rounded-md md:text-lg bg-bg-secondary secondary-btn"
                onClick={handleSubmit}
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
                  <>{t("signin.part8")}</>
                )}
              </button>
            </form>
            {ishbrews === "he" ? (
              <p className="m-0 mt-3 text-bold font-normal text-gray-500 tracking-wider leading-5 ">
                {t("Signup.part18")}{" "}
                <a
                  href="https://uninet-io.com/term-of-use-he/"
                  className="cursor-pointer text-primary-color"
                  target="_blank"
                >
                  {t("Signup.term")}
                </a>
                &nbsp;
                <a
                  href="https://uninet-io.com/privacy-policy-he/"
                  className="cursor-pointer text-primary-color"
                  target="_blank"
                >
                  {t("Signup.Privacy")}
                </a>
              </p>
            ) : (
              <p className="m-0 mt-3 text-sm font-normal text-gray-500 tracking-wider leading-5 ">
                {t("Signup.part18")}{" "}
                <a
                  href="https://uninet-io.com/term-of-use-en/"
                  className="cursor-pointer text-primary-color"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("Signup.term")}
                </a>
                {t("Signup.and")}{" "}
                <a
                  className="cursor-pointer text-primary-color"
                  href="https://uninet-io.com/privacy-policy-en/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("Signup.Privacy")}
                </a>
              </p>
            )}
            {/* <p
              className={
                ishbrews === "he"
                  ? "m-0 mt-3 text-base font-normal text-gray-500 tracking-wider leading-5 text-right "
                  : "m-0 mt-3 text-sm font-normal text-gray-500 tracking-wider leading-5 "
              }
            >
              {t("signin.part9")} */}
            {/* By signing in you agree to Uninet's
            <span className="cursor-pointer text-primary-color "> term of service </span>  and <span className="cursor-pointer text-primary-color  ">
              Privacy Policy.
            </span> */}
            {/* </p> */}
          </div>
        </div>
        {/* <Toaster position="top-center" reverseOrder={false} /> */}
      </div>
      <Navbars />
      <NeedHelp />
      <ToastContainer rtl={ishbrews === "he" ? true : false} />
    </div>
  );
};

export default Signin;
