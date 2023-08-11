import React, { createContext, useState } from "react";
export const AuthUserContext = createContext();
const AuthState = (props) => {
    const [encryptedUser,setEncryptedUser] = useState('')
    

  return (
    <AuthUserContext.Provider value={{ encryptedUser, setEncryptedUser}}>
      {props.children}
    </AuthUserContext.Provider>
  );
};
export default AuthState;