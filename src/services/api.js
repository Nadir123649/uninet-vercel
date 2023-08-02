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
  SignUpUser: async(data) =>{
    try{
    return await Service.post(`${config.BaseURL}/api/Register/Register`, {
      data
    })
    }catch(error){
      throw error;
    }
  },
  SignUPWithOtp : async (data) =>{
    try{
       return await Service.post(`${config.BaseURL}/api/Register/RegisterWithOtp`,{
        data
       })
    }catch(error){
      throw error;
    }
  }
};
export default Api;
