import React, { useEffect, useState } from "react";
import InputField from "../../components/inputField";
import GoogleIcon from "../../assets/images/google-icon.png";
import LogoIcon from "../../assets/images/Logo.webp";
import { useHistory } from "react-router-dom";
import Api from "../../services/api";
import Spinner from 'react-bootstrap/Spinner';
import toast, { Toaster } from 'react-hot-toast';
import { GoogleLogin } from 'react-google-login';
import {config} from "../../configs"
const Signin = () => {
  const history = useHistory();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isValid, setIsValid] = useState(true);
  console.log("config.GoogleClientID", config.GoogleClientID);
  const handleEmailChange = (e) => {
    const inputValue = e.target.value;
    setEmail(inputValue);
    // setIsValid(validateEmail(inputValue))
  };
  console.log("updated")
  const validateEmail = (input) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };
  // login with Email and password
  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      if (!email || !password) {
        setError(true)
        return false;
      }
      else if (isValid) {
        setIsValid(validateEmail(email))
        return false
      }
      setIsValid(true)
      setLoading(true)
      await Api.SignInUser({
        email,
        password
      })
        .then(async (res) => {
          console.log("res", res);
          if (res.Success === true) {
            setLoading(false)
            toast.success("✔️ Signin successfully")
            // history.push("/verify-email");
          } else {
            setLoading(false)
            toast.error("Uers Not Found")
          }

        })
        .catch((e) => {
          console.error(e?.data?.error);
          toast.error(e?.data?.error)
        });
    } catch (e) {
      console.log("e", e);
      toast.error("server Error. Please Refresh Page")
    }

  };

  // login with google
  const responseGoogle = (response) => {
    console.log(response);
  }
  return (
    <div className="relative flex items-center justify-center w-full min-h-screen bg-bg-linear wrapper-Div">
      <div className="flex flex-col items-center justify-center w-full mt-3 gap-4  mx-3 md:max-w-max-600 md:mx-0 lg:px-8" >
        <div className="Logo">
          <img src={LogoIcon} className="h-auto max-w-max-83" />
        </div>
        <div className="w-full px-4 py-8 text-center bg-gray-100 mb-3 rounded-md md:px-8 max-w-max-500 md:w-w-500 ">
          <h2 className="mb-3 text-3xl font-bold text-text-color">Sign In</h2>
          <p className="mb-3 text-xs text-gray-500">Your Social Campaigns</p>
          <fieldset>
            <GoogleLogin
              clientId={config.GoogleClientID}
              render={renderProps => (
                <div className="row">
              <div className="col-md-12">
                <button
                  onClick={renderProps.onClick}
                  className="flex items-center justify-center w-full gap-2 px-8 py-3 text-sm text-gray-700 border border-solid rounded-md border-bg-border bg-bg-btn"
                >
                  <span>
                    <img src={GoogleIcon} className="w-5 h-5" />
                  </span>
                  <span> Sign in with Google</span>
                </button>
              </div>
            </div>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            {/* <div className="row">
              <div className="col-md-12">
                <button
                  href="#"
                  className="flex items-center justify-center w-full gap-2 px-8 py-3 text-sm text-gray-700 border border-solid rounded-md border-bg-border bg-bg-btn"
                >
                  <span>
                    <img src={GoogleIcon} className="w-5 h-5" />
                  </span>
                  <span> Sign in with Google</span>
                </button>
              </div>
            </div> */}
            <div class="separator flex items-center text-center mt-8 mb-8 justify-center">
              <span className="text-sm font-normal text-text-color">
                Or with email
              </span>
            </div>
            <ul className="flex flex-col">
              <li className="flex flex-col items-start">
                <label
                  for="email"
                  className="mb-2 text-sm font-semibold text-text-color"
                >
                  Company email
                </label>
                <input
                  type="email"
                  // id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="block w-full px-2  py-[10px] mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                  required
                />
                {isValid === false ? <span className="text-red-600">Invalid email</span> : <span className="text-red-600"></span>}
                {error && !email && <span className="text-red-600">Email required</span>}
              </li>
              <li className="flex flex-col items-start mt-2">
                <label
                  for="password"
                  className="mb-2 text-sm font-semibold text-text-color"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-2 py-[10px] mb-[10px] text-lg font-medium leading-normal text-gray-900 bg-white border border-solid rounded-lg appearance-none border-bg-border bg-clip-padding"
                  required
                />
                {error && !password && <span className="text-red-600">Password required</span>}
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
            className="w-full py-[10px] mb-3  text-base font-medium text-white border-none rounded-md bg-bg-secondary secondary-btn"
            onClick={(e) => handleSubmit(e)}
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
          <p className="memberDesc">
            Not a Member yet?{" "}
            <span
              className="cursor-pointer text-primary-color"
              onClick={() => history.push("/signup")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
};

export default Signin;
