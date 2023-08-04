import React from "react";
import MainRoute from "./routes";
import "./assets/css/index.css";
import AuthState from "./context"
const App = () => {
  return (
    <div>
      <AuthState>
      <MainRoute />
      </AuthState>
    </div>
  )
  
  
};

export default App;
