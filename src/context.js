import React, { createContext, useState } from "react";
export const AuthUserContext = createContext();
const AuthState = (props) => {
  const [encryptedUser, setEncryptedUser] = useState("");
  const [businessId, setBusinessId] = useState("");

  return (
    <AuthUserContext.Provider
      value={{ encryptedUser, setEncryptedUser, setBusinessId, businessId }}
    >
      {props.children}
    </AuthUserContext.Provider>
  );
};
export default AuthState;
