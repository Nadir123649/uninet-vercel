import ForgetPassword from "../../views/auth/forgetPassword";
import Signin from "../../views/auth/signin";
import Signup from "../../views/auth/signup";
import VerifyEmail from "../../views/auth/verifyEmail";
import { forgetPassword, signIn, signUp, verifyEmail } from "../pathName";

export const PublicRoutes = [
  {
    title: "SignIn",
    component: Signin,
    path: signIn,
  },
  {
    title: "SignUp",
    component: Signup,
    path: signUp,
  },
  {
    title: "Forget Password",
    component: ForgetPassword,
    path: forgetPassword,
  },
  {
    title: "Verify Email",
    component: VerifyEmail,
    path: verifyEmail,
  },
  
];
