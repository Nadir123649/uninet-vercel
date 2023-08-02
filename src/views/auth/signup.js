import React, { useEffect, useState, useContext } from "react";
import InputField from "../../components/inputField";
import GoogleIcon from "../../assets/images/google-icon.png";
import LogoIcon from "../../assets/images/Logo.webp";
import { useHistory } from "react-router-dom";
import Api from "../../services/api";
import Spinner from 'react-bootstrap/Spinner';
import toast, { Toaster } from 'react-hot-toast';
import { AuthUserContext } from "../../context"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
const SignUp = () => {
  const history = useHistory();
  const { setEncryptedUser } = useContext(AuthUserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleEMailChange = (e) => {
    let { value } = e.target;
    setEmail(value)
    setIsValid(emailRegex.test(value));
  }

  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        setError(true)
        return false;
      }
      setLoading(true)
      await Api.SignUpUser({
        email,
        password,
        TemplateId: 1,
        Lang: 1
      }).then((res) => {
        console.log('res', res);
        if (res.textResponse == "User already Exist ,Otp Sent For Verification") {
          toast.error("User already Exist")
          setLoading(false)
        } else if (res.textResponse == "User Failed to Register") {
          setLoading(false)
          toast.error("User Failed to Register")
        } else {
          toast.success("SignUp successfully registered")
          setLoading(false)
          history.push("/verify-email")
          setEncryptedUser(res.encryptedUser)
        }

      }).catch((e) => {
        console.error(e?.data?.error);
        toast.error(e?.data?.error)
      });
    } catch (e) {
      console.log("e", e);
    }
  }

  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-bg-linear wrapper-Div">
      <div className="flex flex-col items-center justify-center h-full gap-4 m-auto max-w-max-600 mb-3 mt-3">
        <div className="Logo">
          <img src={LogoIcon} className="h-auto max-w-max-83" />
        </div>
        <div className="px-8 text-center bg-gray-100 rounded-md py-9 max-w-max-500 w-w-500">
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
                    <img src={GoogleIcon} className="w-5 h-5" />
                  </span>
                  <span> Sign up with Google</span>
                </button>
              </div>
            </div>
            <div className="separator flex items-center text-center mt-8 mb-8 justify-center">
              <span className="text-sm font-normal text-text-color">Or with email</span>
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
                  value={email}
                  onChange={handleEMailChange}
                  className="block w-full px-2 py-2 mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                  required
                />
                {!isValid ? <span className="text-red-600">Invalid email</span> : <span className="text-red-600"></span>}
                {error && !email && <span className="text-red-600">Email required</span>}
              </li>
              <li className="flex flex-col items-start mt-3">
                <label
                  htmlFor="password"
                  className="mb-2 text-sm font-semibold text-text-color"
                >
                  Password
                </label>
                <div className="flex items-center w-full px-2  py-[6px]  mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control border-none"
                    required
                  />
                  <div onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <AiFillEye size={25}  /> : <AiFillEyeInvisible size={25} />}

                  </div>
                </div>

                {error && !password && <span className="text-red-600">Password required</span>}
              </li>
            </ul>
          </fieldset>
          <button
            className=" mt-2 w-full py-[10px] mb-3 mt-1 text-base font-medium text-white border-none rounded-md bg-bg-secondary secondary-btn"
            onClick={handleSubmit}
          >
            {loading ? <><Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
              <span className="">Loading...</span></> : <>Continue</>}
          </button>
          <p href="#" className="m-0 text-sm font-normal text-gray-500">
            Already have an account{" "}
            <span className="cursor-pointer text-primary-color"
              onClick={() => history.push("/")}
            >Sign in</span>
          </p>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default SignUp;
