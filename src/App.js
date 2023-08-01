import React, { useEffect } from "react";
import MainRoute from "./routes";
import "./assets/css/index.css";
 import { gapi } from "gapi-script";
 import { config } from "./configs";
const App = () => {

  useEffect(()=>{
    function start(){
      gapi.auth2.init({
        clientId: config.GoogleClientID,
        scope: ""
      })
    }
    gapi.load('client:auth2', start)
  })
  return <MainRoute />;
};

export default App;
