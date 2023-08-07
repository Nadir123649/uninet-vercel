import React, { useEffect, useState } from "react";
import LogoIcon from "../../assets/images/Logo.webp";
import Api from "../../services/api";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useHistory } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
// import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbars from "../navbar/navbar";
// import { AuthUserContext } from "../../context";

function ResetPassword() {
  let query= new URLSearchParams(window.location.search);
  let UserResetToken = query.get("UserResetToken");
  let ishbrews = localStorage.getItem('i18nextLng') 
  console.log("ishbrews", ishbrews);
  const initalialResetPasswordValue = {
    password: "",
    confirmPassword: "",
  }
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [formError, setFormError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [checkConfirmPassword, setCheckConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorMessage1, setErrorMessage1] = useState(false);
  const [passwordValue, setPasswordValue] = useState({
    ...initalialResetPasswordValue,
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordValue({
      ...passwordValue,
      [name]: value,
    })
    setFormError((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors[name]) {
        delete newErrors[name];
      }
      return newErrors;
    });
  }

  const validate = (values) => {
    const errors = {};
     console.log(values);
    if (!values?.password) {
      console.log(ishbrews);
      errors.password = ishbrews === "he" ? "יש להזין סיסמה" : "Please enter Password";
    }
    if (!values?.confirmPassword) {
      errors.confirmPassword = t("resetPassword.part61");
    }
    Object.keys(errors).map((key) => {
      if (Object.keys(errors[key])?.length === 0) delete errors[key];
    });
    return errors;
  };
  
  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      if( passwordValue?.password.length < 6){
        setErrorMessage(true)
        return false
      }
      if( passwordValue?.confirmPassword.length < 6){
        setErrorMessage1(true)
        return false
      }
      if (passwordValue?.password !== passwordValue?.confirmPassword) {
        setCheckConfirmPassword(true)
        return false
      }
      
      setErrorMessage1(false)
      setErrorMessage(false)
      setCheckConfirmPassword(false)
      setLoading(true)
      await Api.resetPassword({
        ResetPasswordToken: UserResetToken,
        passwordEncrypted: passwordValue?.password
      }).then((res) => {
        console.log(res);
        if (res === false) {
          setLoading(false)
          toast.error("Something went wrong")
        } else {
          toast.success(t("resetPassword.part62"))
          setLoading(false)
          history.push('/')
        }
      }).catch((err) => {
        console.error(err);
        toast.error(e?.data?.error);
      })
    } catch (e) {
      setLoading(false)
      console.log("e", e);
    }
  }
  const resetPasswordData = (e) => {
    e.preventDefault();
    
    const validateForm = validate(passwordValue);
    setFormError(validateForm);
    if (Object.keys(validateForm)?.length === 0) {
      handleSubmit();
    }
  };
  useEffect(()=>{
   const validateForm =  validate(passwordValue)
    setFormError(validateForm);
  },[ishbrews])
  return (
    <div className="bg-bg-linear">
      
      <div className="relative flex flex-col items-center justify-center w-full h-screen  wrapper-Div">
        <div className="flex flex-col items-center justify-center w-full  gap-4  mx-3 md:max-w-max-600 md:mx-0 lg:px-8">
          <div className="Logo ">
            <img src={LogoIcon} className="h-auto max-w-max-83" alt="verify" />
          </div>
          <div className="w-full px-4 py-8 text-center bg-gray-100 rounded-md md:px-12 max-w-max-500 md:w-w-500">
            <h2 className="mb-3 text-3xl font-bold text-text-color">
              {t('resetPassword.part57')}
            </h2>
            <form>
              <ul className="flex flex-col">
                <li className={ishbrews == "he" ? "flex flex-col items-end" :  "flex flex-col items-start"}>
                  <label
                    htmlFor="email"
                    className="mb-2 text-sm font-semibold text-text-color"
                  >
                    {t('resetPassword.part58')}
                  </label>
                  <div className={ishbrews === "he" ? "flex flex-row-reverse items-center w-full px-2  py-[6px]  mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding": "flex items-center w-full px-2  py-[6px]  mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"}>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={passwordValue?.password}
                      onChange={handleChange}
                      name="password"
                      className={ishbrews == "he" ? "form-control border-none text-right"  : "form-control border-none"}
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

                  {formError?.password ? (
                    <p className="text-red-600 ">{formError?.password}</p>
                  ) : errorMessage === true ? <span className="text-red-600">Password must be at least 6 characters long.</span>:(
                    ''
                  )}
                </li>
                <li className={ishbrews == "he" ? "flex flex-col items-end mt-3" :  "flex flex-col items-start mt-3"}>
                  <label
                    htmlFor="email"
                    className="mb-2 text-sm font-semibold text-text-color"
                  >
                    {t('resetPassword.part59')}
                  </label>
                  <div className={ishbrews === "he" ? "flex flex-row-reverse items-center w-full px-2  py-[6px]  mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding": "flex items-center w-full px-2  py-[6px]  mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="password"
                      value={passwordValue?.confirmPassword}
                      onChange={handleChange}
                      name="confirmPassword"
                      className={ishbrews == "he" ? "form-control border-none text-right" : "form-control border-none"}
                      required
                    />
                    <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? (
                        <AiFillEye size={25} />
                      ) : (
                        <AiFillEyeInvisible size={25} />
                      )}
                    </div>
                  </div>

                  {formError?.confirmPassword ? (
                    <p className="text-red-600 ">{formError?.confirmPassword}</p>
                  ) : checkConfirmPassword ? <p className="text-red-600 "> {t('resetPassword.part63')} </p> : errorMessage1 ? <span className="text-red-600">Password must be at least 6 characters long.</span> : (
                    ""
                  )}
                </li>
              </ul>

              <div className="flex justify-center gap-4 mt-[10px] submit-email">
                <button
                 
                  className="w-full py-[11px] text-white border-none rounded-md outline-none bg-bg-secondary"
                  onClick={resetPasswordData}
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
                    <>{t('forgotPassword.part22')}</>
                  )}

                </button>
              </div>
            </form>
          </div>
        </div>
        <Navbars />
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default ResetPassword;
