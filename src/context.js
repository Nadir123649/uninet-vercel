import React, { createContext, useState } from "react";
export const AuthUserContext = createContext();
const AuthState = (props) => {
    const [encryptedUser,setEncryptedUser] = useState('')
    const [businessType, setBusinessType] = useState("")
    const [ishbrew,setIsHbrew] = useState(false)
  return (
    <AuthUserContext.Provider value={{ encryptedUser, setEncryptedUser,setBusinessType ,businessType, ishbrew, setIsHbrew}}>
      {props.children}
    </AuthUserContext.Provider>
  );
};
export default AuthState;