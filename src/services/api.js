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
  SignInWithGoogle: async (data) => {
    try {
      return await Service.post(
        `https://uninetweapi.azurewebsites.net/api/Login/GoogleSignIn`,
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
    try {
      return await Service.post(`${config.BaseURL}/api/Login/ResetPassword`, {
        data,
      });
    } catch (error) {
      throw error;
    }
  },
  resentOTP: async (data) => {
    try {
      return await Service.post(`${config.BaseURL}/api/Register/ResentOtp`, {
        data,
      });
    } catch (error) {
      throw error;
    }
  },
  getExternalSystem: async (lang, token) => {
    try {
      return await Service.get(
        `${config.BaseURL}/api/Register/GetExternalSystem?Lang=${lang}`,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  getExternalCustomizedField: async (id, token) => {
    try {
      return await Service.get(
        `${config.BaseURL}/api/Register/GetExternalCustomizedFieldByExternaLSystemID?ExternalSystemId=${id}`,
        token
      );
    } catch (error) {
      throw error;
    }
  },
  SaveExternalCustomizedExternalSystemId: async (data, token) => {
    try {
      return await Service.postWithAuthentication({
        url: `${config.BaseURL}/api/Register/SaveExternalCustomizedExternalSystemId`,
        token,
        data: data,
      });
    } catch (error) {
      throw error;
    }
  },

  GetDigitalDocumentToApproveListByUser: async (token, type) => {
    try {
      return await Service.get(
        `${config.BaseURL}/api/UninetOutPutControllercs/GetDigitalDocumentToApproveListByUser?Typelist=${type}`,
        token
      );
    } catch (error) {
      throw error;
    }
  },

  ApproveDoc: async (data, token) => {
    try {
      return await Service.postWithAuthentication({
        url: `${config.BaseURL}/api/UninetOutPutControllercs/AproveDoc`,
        token,
        data: data,
      });
    } catch (error) {
      throw error;
    }
  },
  RejectDoc: async (data, token) => {
    try {
      return await Service.postWithAuthentication({
        url: `${config.BaseURL}/api/UninetOutPutControllercs/RejectDocument`,
        token,
        data: data,
      });
    } catch (error) {
      throw error;
    }
  },
  ShowDigitalDocumentDetails: async (data, token) => {
    try {
      https: return await Service.postWithAuthentication({
        url: `${config.BaseURL}/api/UninetOutPutControllercs/ShowDigitalDocumentDetails`,
        token,
        data: data,
      });
    } catch (error) {
      throw error;
    }
  },
  refreshToken: async (data) => {
    try {
      return await Service.post(`${config.BaseURL}/api/Login/RefreshToken`, {
        data,
      });
    } catch (error) {
      throw error;
    }
  },
};
export default Api;
