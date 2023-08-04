import ForgetPassword from "../../views/auth/forgetPassword";
import ResetPassword from "../../views/auth/resetPassword";
import Signin from "../../views/auth/signin";
import Signup from "../../views/auth/signup";
import VerifyEmail from "../../views/auth/verifyEmail";
import Questionnaire from "../../views/questionnaire";
import WelcomeScreen from "../../views/welcomeScreen";
import {
  questionnaire,
  forgetPassword,
  signIn,
  signUp,
  verifyEmail,
  welcomeScreen,
  resetPassword
} from "../pathName";

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
  {
    title: "Questionnaire",
    component: Questionnaire,
    path: questionnaire,
  },
  {
    title: "Welcome",
    component: WelcomeScreen,
    path: welcomeScreen,
  },
  {
    title: "Reset Password",
    component: ResetPassword,
    path: resetPassword

  }
  
];
