import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import dateFns, { startOfToday } from "date-fns";
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";

import LogIn from "./components/auth/LogIn";
import SignUp from "./components/auth/SignUp";

import CurrentDateProvider from "./contexts/CurrentDateContext";

class App extends Component {
  render() {
    const today = startOfToday();

    return (
      <CurrentDateProvider>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <Redirect to={`/${dateFns.format(today, "MM-DD-YYYY")}`} />
                )}
              />

              <Route path="/login" component={LogIn} />
              <Route path="/signup" component={SignUp} />

              <Route path="/:date" component={Dashboard} />
            </Switch>
          </div>
        </BrowserRouter>
      </CurrentDateProvider>
    );
  }
}

export default App;
