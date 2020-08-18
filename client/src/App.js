import React from "react";
import "./styles/App.css";
import Auth from "./components/auth";
import Home from "./components/home";
import PrivateRoute from "./utils/privateroutes";
import PublicRoute from "./utils/publicroutes";
import { BrowserRouter, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <PublicRoute exact path='/' component={Auth} />
          <PrivateRoute path='/home' component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
