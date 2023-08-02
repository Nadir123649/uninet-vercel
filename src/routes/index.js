import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PublicRoutes } from "./public";
import {AppContext } from "../context"
export default function MainRoute() {
  // const [encryptedUser,setEncryptedUser] = useState('')
  return (
    // <AppContext.Provider value={{encryptedUser,setEncryptedUser}}>
    <Router>
      <Switch>
        {PublicRoutes?.map((item, index) => (
          <Route
            key={index}
            exact
            path={item.path}
            component={item.component}
          />
        ))}
      </Switch>
    </Router>
    // </AppContext.Provider>
  );
}
