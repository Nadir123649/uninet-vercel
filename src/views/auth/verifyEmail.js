import React, { useState, useContext, useEffect } from "react";
import verify from "../../assets/images/verify-email.png";
import LogoIcon from "../../assets/images/Logo.webp";
import Api from "../../services/api";
import Spinner from "react-bootstrap/Spinner";
import toast, { Toaster } from "react-hot-toast";
import { AuthUserContext } from "../../context";
import { useTranslation } from "react-i18next";
import Navbars from "../navbar/navbar";
import { useHistory,useLocation } from "react-router";
import CryptoJS from 'crypto-js';

const VerifyEmail = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { encryptedUser } = useContext(AuthUserContext)
  let ishbrews = localStorage.getItem('i18nextLng')
  const [otp, setOTP] = useState("");
  const valueReceived = location.state?.data || '';
  console.log("valueReceived", valueReceived);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const [decryptedPassword, setDecryptedPassword] = useState('');
  const history = useHistory();
  let passwordDecrypted = JSON.parse(localStorage.getItem('user-details'))
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!otp) {
        setError(true)
        return false;
      }
      setLoading(true);
      await Api.SignUPWithOtp({
        Otp: otp,
        EncryptedUser: passwordDecrypted?.EncryptedUserId,
        Lang: ishbrews == "he" ? 2 : 1,
      })
        .then((res) => {
          if(!passwordDecrypted?.EncryptedUserId) {
            toast.error("EncryptedUser is missing")
            
          } else {
            if (res.Success === false) {
              setLoading(false);
              toast.error("Please Enter Valid OTP");
            } else {
              setLoading(false);
              history.push("/questionnaire");
              localStorage.setItem("accessToken", res?.accessToken);
            }
          }
          
        })
        .catch((e) => {
          setLoading(false);
          console.error(e);
          toast.error("EncryptedUser is missing");
        });
    } catch (e) {
      setLoading(false);
      console.log("e", e);
    }
  };

  const handleResetOtp = async () => {
    try {
      await Api.resentOTP({
        Email: passwordDecrypted?.email,
        EncryptedUserId: passwordDecrypted?.EncryptedUserId,
        TemplateId: passwordDecrypted?.TemplateId,
        Lang: passwordDecrypted?.Lang,
      }).then((res) => {
        // console.log("res", res);
        if (res.textResponse === "OTP sent successfully") {
          toast.success("OTP sent successfully");
        } else if (res.textResponse === "Can't send OTP more than five times in the last five minutes") {
          toast.error("Can't send OTP more than five times in the last five minutes");
        }
        else {
          toast.error("user is already validated no need for otp");
        }
      }).catch((e) => {
        console.error(e);
        toast.error("OTP resent failed");
      })
    } catch (e) {
      console.log("e", e)
    }
  }

  return (
    <div className="bg-bg-linear">

      <div className="relative flex items-center justify-center w-full h-screen  wrapper-Div mb-4">
        <div className="flex flex-col items-center justify-center w-full mt-3 gap-4  mx-3 md:max-w-max-600 md:mx-0 lg:px-8">
          <div className=" Logo mt-4 ">
            <img src={LogoIcon} className="h-auto max-w-max-83" alt="logo" />
          </div>
          <div className="w-full px-4 py-8 text-center bg-gray-100 rounded-md md:px-12 max-w-max-500 md:w-w-500">
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
            {
              ishbrews === "he" ? <p className="mb-3  text-sm text-gray-500">
                <span className="text-primary-color">{passwordDecrypted?.email}</span><span>{t("verifyEmail.part25")}</span>
              </p> : <p className="mb-3  text-sm text-gray-500">
                <span>{t("verifyEmail.part25")}</span> <span className="text-primary-color">{passwordDecrypted?.email}</span>
              </p>
            }

            <fieldset>
              <form>
                <ul className="flex flex-col">
                  <li className={ishbrews == "he" ? "flex flex-col items-end" : "flex flex-col items-start"}>
                    <label
                      htmlFor="text"
                      className={ishbrews == "he" ? "mb-2 text-base font-semibold text-text-color" : "mb-2 text-sm font-semibold text-text-color"}
                    >
                      {t("verifyEmail.part26")}
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOTP(e.target.value)}
                      id="text"
                      className={
                        ishbrews == "he"
                          ? "block w-full px-3 py-2 md:py-[10px] text-right mb-2 font-normal text-base md:text-lg leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                          : "block w-full px-3 py-2 md:py-[10px] mb-2 text-base md:text-lg font-normal leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                      }
                      required
                    />
                    {error && !otp && <span className="text-red-600">OTP Required</span>}
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
                      <span className="">{t('signin.Loading')}...</span>
                    </>
                  ) : (
                    <>{t("verifyEmail.part27")}</>
                  )}
                </button>
              </form>
              <p className="mb-[9px]">
                <b>{t("verifyEmail.part28")}</b>
              </p>
              <p className="m-0 text-sm font-normal text-gray-500">
                {t("verifyEmail.part29")} &nbsp;
                <span className="text-primary-color cursor-pointer" onClick={handleResetOtp}>{t('verifyEmail.getNewCode')}</span>
              </p>
              <div className="separator flex items-center text-center justify-center mt-3 mb-3">
                <span className="text-sm font-normal text-text-color ">
                  {t("verifyEmail.part30")}
                </span>
              </div>
              <p className="m-0 text-sm font-normal text-gray-500">
                {t("verifyEmail.part31")}
                <span className="text-primary-color cursor-pointer" onClick={() => history.push('/signup', { data: passwordDecrypted?.email })}>
                  {t("verifyEmail.edit")}
                </span>
              </p>
            </fieldset>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Navbars />
    </div>
  );
};

export default VerifyEmail;
