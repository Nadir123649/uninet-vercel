import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PublicRoutes } from "./public";

export default function MainRoute() {
  return (
    
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
  );
}
