import { config } from "../configs";
import Service from "./service";
const Api = {
  SignInUser: async (data) => {
    try {
      return await Service.post(
        `${config.BaseURL}/api/Login/LoginWithEmailPassword`,
        {
          data,
        }
      );
    } catch (error) {
      throw error;
    }
  },
  SignUpUser: async (data) => {
    try {
      return await Service.post(`${config.BaseURL}/api/Register/Register`, {
        data,
      });
    } catch (error) {
      throw error;
    }
  },
  SignUPWithOtp: async (data) => {
    try {
      return await Service.post(
        `${config.BaseURL}/api/Register/RegisterWithOtp`,
        {
          data,
        }
      );
    } catch (error) {
      throw error;
    }
  },
  RegisterBusinessToUser: async (data) => {
    try {
      return await Service.post(
        `${config.BaseURL}/api/Register/RegisterBusinessToUser`,
        {
          data,
        }
      );
    } catch (error) {
      throw error;
    }
  },
  SecondQuestionnaire: async (data, token) => {
    try {
      return await Service.postWithAuthentication({
        url: `${config.BaseURL}/api/Register/RegisterBusinessToUser`,
        token,
        data: data,
      });
    } catch (error) {
      throw error;
    }
  },
  forgotPassword: async (data) => {
    try {
      return await Service.post(`${config.BaseURL}/api/Login/ForgotPassword`, {
        data,
      });
    } catch (error) {
      throw error;
    }
  },
  resetPassword: async (data) => { 
    try{
      return await Service.post(`${config.BaseURL}/api/Login/ResetPassword`, {
              data,
            });
    }catch(error){
      throw error;
    }
  }
};
export default Api;
