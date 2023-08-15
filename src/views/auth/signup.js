import React, { useState, useContext, useEffect } from "react";
import GoogleIcon from "../../assets/images/google-icon.png";
import LogoIcon from "../../assets/images/Logo.webp";
import NeedHelp from "../../components/needHelp";
import { useHistory, useLocation } from "react-router-dom";
import Api from "../../services/api";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";
import { AuthUserContext } from "../../context";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import Navbars from "../navbar/navbar";
import CryptoJS from "crypto-js";
import { GoogleLogin } from "@leecheuk/react-google-login";
import { gapi } from "gapi-script";
import { config } from "../../configs";
const SignUp = () => {
  const history = useHistory();
  const { t } = useTranslation();
  const location = useLocation();
  const valueReceived = location.state?.data || "";
  const { setEncryptedUser } = useContext(AuthUserContext);
  const [email, setEmail] = useState(valueReceived);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let ishbrews = localStorage.getItem("i18nextLng");
 

  const handleEMailChange = (e) => {
    let { value } = e.target;
    setEmail(value);
    if (value) setIsValid(emailRegex.test(value));
  };

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

      await Api.SignUpUser({
        email,
        password,
        TemplateId: 1,
        Lang: ishbrews === "he" ? 2 : 1,
      })
        .then((res) => {
          console.log("resSigup", res);
          if (res?.textResponse === "User already Exist ") {
            toast.error("User already Exist, Signup with another account");
            setLoading(false);
          } else {
            setLoading(false);
            let EncryptedUserId = res?.encryptedUser;
            let resetOtData = {
              email,
              EncryptedUserId,
              TemplateId: 1,
              Lang: ishbrews === "he" ? 2 : 1,
            };
            history.push("/verify-email");
            localStorage.setItem("user-details", JSON.stringify(resetOtData));
            setEncryptedUser(res.encryptedUser);
          }
        })
        .catch((e) => {
          console.error(e?.data?.error);
          toast.error(e);
        });
    } catch (e) {
      console.log("e", e);
    }
  };

  //login with google
  const responseGoogle = (response) => {
    // toast.success("✔️ Signin successfully");
    console.log(response);
    if (response) {
      history.push("/questionnaire");
    }
  };
  const onLoginFailure = (res) => {
    if (res.error === "popup_closed_by_user") {
    } else {
      toast.error("Server Error. Please Refresh Page");
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

  return (
    <div className={ishbrews === "he" ? "bg-bg-reverse" :"bg-bg-linear"} >
      <div className="relative flex items-center justify-center w-full min-h-screen  wrapper-Div">
        <div className="flex flex-col items-center justify-center mx-3 h-full gap-4 m-auto max-w-max-600 mb-3 mt-3">
          <div className="Logo">
            <img
              src={LogoIcon}
              className="h-auto max-w-max-83 cursor-pointer"
              alt="logo"
              onClick={() => history.push("/")}
            />
          </div>
          <div className="w-full px-4 py-8 text-center bg-gray-100 mb-3 rounded-md md:px-8 max-w-max-500 md:w-w-500 ">
            <h2 className="mb-3 text-3xl font-bold text-text-color">
              {t("Signup.part10")}
            </h2>
            <p className="mb-3 text-sm text-gray-500">
              {t("Signup.part11")}
              <span
                className="cursor-pointer text-primary-color"
                onClick={() => history.push("/")}
              >
                {t("Signup.signis")}
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
            {/* <div className="row">
              <div className="col-md-12">
                <button
                  href="#"
                  className={
                    ishbrews === "he"
                      ? "flex items-center flex-row-reverse justify-center w-full gap-2 px-8 py-3 text-sm text-gray-700 border border-solid rounded-md border-bg-border bg-bg-btn "
                      : "flex items-center justify-center  flex-row w-full gap-2 px-8 py-3 text-sm text-gray-700 border border-solid rounded-md border-bg-border bg-bg-btn "
                  }
                >
                  <span>
                    <img src={GoogleIcon} className="w-5 h-5" alt="logo" />
                  </span>
                  <span> {t("signin.part3")}</span>
                </button>
              </div>
            </div> */}
            <div className="separator flex items-center text-center mt-8 mb-8 justify-center">
              <span className="text-sm font-normal text-text-color">
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
                    onChange={handleEMailChange}
                    className={
                      ishbrews === "he"
                        ? "block w-full px-2 py-2 md:py-[10px] text-right mb-2 text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                        : "block w-full px-2 py-2 md:py-[10px] mb-2 text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
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
                  {}
                </li>
                <li
                  className={
                    ishbrews === "he"
                      ? "flex flex-col mt-2 items-end"
                      : "flex flex-col mt-2 items-start"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={
                        ishbrews === "he"
                          ? "form-control border-none text-right"
                          : "form-control border-none"
                      }
                      required
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
                      Password must be at least 6 characters long.
                    </span>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
              {/* </fieldset> */}
              <button
                className=" mt-3 w-full py-[10px] mb-3 md:mt-1 text-base font-medium text-white border-none rounded-md bg-bg-secondary secondary-btn"
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
                  <>{t("Signup.part17")}</>
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
                {/* &nbsp;{t("Signup.and")} */}
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
                >
                  {t("Signup.term")}
                </a>
                {t("Signup.and")}{" "}
                <a
                  href="https://uninet-io.com/privacy-policy-en/"
                  className="cursor-pointer text-primary-color"
                  target="_blank"
                >
                  {t("Signup.Privacy")}
                </a>
              </p>
            )}
          </div>
        </div>
        {/* <Toaster position="top-center" reverseOrder={false} /> */}
      </div>
      <Navbars />
      <NeedHelp />
    </div>
  );
};

export default SignUp;
