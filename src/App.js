import React, { useState } from "react";
import MainRoute from "./routes";
import "./assets/css/index.css";
import AuthState from "./context"
const App = () => {
 const [encryptedUser,setEncryptedUser] = useState('')
  return (
    <div>
      <AuthState>
      <MainRoute />
      </AuthState>
    </div>
  )
  
  
};

export default App;
