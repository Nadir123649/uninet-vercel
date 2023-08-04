import React, { useState, useContext } from "react";
import GoogleIcon from "../../assets/images/google-icon.png";
import LogoIcon from "../../assets/images/Logo.webp";
import { useHistory } from "react-router-dom";
import Api from "../../services/api";
import Spinner from "react-bootstrap/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { AuthUserContext } from "../../context";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import Navbars from "../navbar/navbar";

const SignUp = () => {
  const history = useHistory();
  const { t, i18n } = useTranslation();
  const { setEncryptedUser, ishbrew } = useContext(AuthUserContext);
  // console.log("ishbrew", ishbrew);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEMailChange = (e) => {
    let { value } = e.target;
    setEmail(value);
    if (value) setIsValid(emailRegex.test(value));
  };

  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        setError(true);
        return false;
      }
      if (!isValid) {
        return false;
      }
      setLoading(true);
      await Api.SignUpUser({
        email,
        password,
        TemplateId: ishbrew ? 2 : 1,
        Lang: 1,
      })
        .then((res) => {
          console.log("res", res);
          if (
            res.textResponse === "User already Exist ,Otp Sent For Verification"
          ) {
            toast.error("User already Exist, Signup with another account");
            setLoading(false);
          } else if (res.textResponse === "User Failed to Register") {
            setLoading(false);
            toast.error("User Failed to Register");
          } else {
            toast.success("User successfully registered");
            setLoading(false);
            history.push("/verify-email");
            setEncryptedUser(res.encryptedUser);
          }
        })
        .catch((e) => {
          console.error(e?.data?.error);
          toast.error(e?.data?.error);
        });
    } catch (e) {
      console.log("e", e);
    }
  };

  return (
    <div className="bg-bg-linear">
      <Navbars />
      <div className="relative flex items-center justify-center w-full min-h-screen  wrapper-Div">
        <div className="flex flex-col items-center justify-center h-full gap-4 m-auto max-w-max-600 mb-3 mt-3">
          <div className="Logo">
            <img src={LogoIcon} className="h-auto max-w-max-83" alt="logo" />
          </div>
          <div className="px-4 text-center bg-gray-100 rounded-md py-9 max-w-max-500 mx-2">
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
            <fieldset>
              <div className="row">
                <div className="col-md-12">
                  <button
                    href="#"
                    className={
                      ishbrew
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
              </div>
              <div className="separator flex items-center text-center mt-8 mb-8 justify-center">
                <span className="text-sm font-normal text-text-color">Or</span>
              </div>
              <ul className="flex flex-col">
                <li
                  className={
                    ishbrew
                      ? "flex flex-col items-end"
                      : "flex flex-col items-start"
                  }
                >
                  <label
                    htmlFor="email"
                    className={
                      ishbrew
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
                      ishbrew
                        ? "block w-full px-2 py-2 md:py-[10px] text-right mb-2 text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                        : "block w-full px-2 py-2 md:py-[10px] mb-2 text-base md:text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                    }
                    required
                  />
                  {error && !email ? (
                    <span className="text-red-600">Email required</span>
                  ) : !isValid ? (
                    <span className="text-red-600">Invalid email</span>
                  ) : (
                    <span className="text-red-600"></span>
                  )}
                  {}
                </li>
                <li
                  className={
                    ishbrew
                      ? "flex flex-col items-end"
                      : "flex flex-col items-start"
                  }
                >
                  <label
                    htmlFor="password"
                    className={
                      ishbrew
                        ? "mb-2 text-base font-semibold text-text-color text-right"
                        : "mb-2 text-sm font-semibold text-text-color"
                    }
                  >
                    {t("signin.part6")}
                  </label>
                  <div className="flex items-center w-full px-2  py-[6px]  mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={
                        ishbrew
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

                  {error && !password && (
                    <span className="text-red-600">Password required</span>
                  )}
                </li>
              </ul>
            </fieldset>
            <button
              className=" mt-2 w-full py-[10px] mb-3 md:mt-1 text-base font-medium text-white border-none rounded-md bg-bg-secondary secondary-btn"
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
                  <span className="">Loading...</span>
                </>
              ) : (
                <>{t("Signup.part17")}</>
              )}
            </button>
            <p className="m-0 mt-3 text-sm font-normal text-gray-500 tracking-wider leading-5 ">
              {t("signin.part9")}
              {/* By signing up you agree to Uninet's
            <span className="cursor-pointer text-primary-color "> term of service </span>  and <span className="cursor-pointer text-primary-color  ">
              Privacy Policy.
            </span> */}
            </p>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default SignUp;
