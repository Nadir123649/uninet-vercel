import React, { createContext, useState } from "react";
export const AuthUserContext = createContext();
const AuthState = (props) => {
    const [encryptedUser,setEncryptedUser] = useState('')
    const [businessType, setBusinessType] = useState("")

  return (
    <AuthUserContext.Provider value={{ encryptedUser, setEncryptedUser,setBusinessType ,businessType}}>
      {props.children}
    </AuthUserContext.Provider>
  );
};
export default AuthState;