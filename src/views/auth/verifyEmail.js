import React, { useState, useContext } from "react";
import verify from "../../assets/images/verify-email.png";
import LogoIcon from "../../assets/images/Logo.webp";
import Api from "../../services/api";
import Spinner from "react-bootstrap/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { AuthUserContext } from "../../context";
import { useTranslation } from "react-i18next";
import Navbars from "../navbar/navbar";
import { useHistory } from "react-router";

const VerifyEmail = () => {
  const { t, i18n } = useTranslation();
  const { encryptedUser,ishbrew } = useContext(AuthUserContext)
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!otp){
        setError(true)
        return false;
      }
      setLoading(true);
      await Api.SignUPWithOtp({
        otp,
        encryptedUser,
      })
        .then((res) => {
          if (res.Success === false) {
            setLoading(false);
            toast.error("Please Enter Valid OTP");
          } else {
            setLoading(false);
            toast.success("OTP Verified successfully");
            history.push("/questionnaire");
            localStorage.setItem("accessToken", res?.accessToken);
          }
        })
        .catch((e) => {
          setLoading(false);
          console.error(e?.data?.error);
          // toast.error(e?.data?.error);
        });
    } catch (e) {
      setLoading(false);
      console.log("e", e);
    }
  };
  return (
    <div className="bg-bg-linear">
      <Navbars />
      <div className="relative flex items-center justify-center w-full h-screen  wrapper-Div">
        <div className="flex flex-col items-center justify-center w-full mt-3 gap-4  mx-3 md:max-w-max-600 md:mx-0 lg:px-8">
          <div className=" Logo ">
            <img src={LogoIcon} className="h-auto max-w-max-83" alt="logo" />
          </div>
          <form className="w-full px-4 py-8 text-center bg-gray-100 rounded-md md:px-12 max-w-max-500 md:w-w-500">
            <div className="verify-box">
              <img
                src={verify}
                className="mx-auto mb-2 h-130 max-w-max-200"
                alt="verify"
              />
            </div>
            <h2 className="mb-3 text-3xl font-bold text-text-color">
              {t("verifyEmail.part24")}
            </h2>
            <p className="mb-3 text-xs text-gray-500">
              {t("verifyEmail.part25")}
            </p>
            <fieldset>
              <ul className="flex flex-col">
                <li className={ishbrew ? "flex flex-col items-end" :"flex flex-col items-start"}>
                  <label
                    htmlFor="text"
                    className={ishbrew ? "mb-2 text-base font-semibold text-text-color" : "mb-2 text-sm font-semibold text-text-color" }
                  >
                    {t("verifyEmail.part26")}
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOTP(e.target.value)}
                    id="text"
                    className={ishbrew ? "block w-full px-2  py-[10px]  mb-[10px] text-lg font-medium leading-normal text-gray-900 text-right bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding" :
                    "block w-full px-2  py-[10px]  mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"}
                    required
                  />
                  {error && !otp && <span className="text-red-600">OTP Required</span> }
                  
                </li>
              </ul>
              <button
                className="w-full mt-2 py-[10px] mb-3 text-base font-medium text-white border-none rounded-md bg-bg-secondary secondary-btn"
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
                  <>{t("verifyEmail.part27")}</>
                )}
              </button>
              <p className="mb-0">
                <b>{t("verifyEmail.part28")}</b>
              </p>
              <p className="m-0 text-sm font-normal text-gray-500">
                {t("verifyEmail.part29")}
                {/* Check your spam/updates folder or{" "}
                <span className="text-primary-color">get a new code</span> */}
              </p>
              <div className="separator flex items-center text-center justify-center mt-3 mb-3">
                <span className="text-sm font-normal text-text-color">
                  {t("verifyEmail.part30")}
                </span>
              </div>
              <p className="m-0 text-sm font-normal text-gray-500">
                {t("verifyEmail.part31")}
                <span className="text-primary-color">
                  {t("verifyEmail.edit")}
                </span>
              </p>
            </fieldset>
          </form>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default VerifyEmail;
