import React from "react";
import { Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin";
import Login from "views/Login";
import SignUp from "views/SignUp";
import SignUpConfirm from "views/SignUpConfirm";

const App = () => 

    <Switch>
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Route path="/login" component={Login} />
      <Route exact path="/" component={Login} />
      <Route path="/sign_up" component={SignUp} />
      <Route path="/test" component={SignUpConfirm} />
      <Route path="/sign_up_confirm" component={SignUpConfirm} />
    </Switch>
 
export default App