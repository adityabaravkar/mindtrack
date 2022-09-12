import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./LandingPage/Landing_page.js";
import Login from "./Login/Login";
import SignUp from "./Signup/Signup.js";
import Home from "./Home/Home.js";
import Profile from "./ProfilePage/ProfilePage.js";
import AddGroup from "./AddGroup/AddGroup.js";
import ViewGroup from "./ViewGroup/ViewGroup.js";
import RecentActivity from "./RecentActivity/RecentActivity.js";
import AddExpense from "./ViewGroup/Addexpense.js";

//Create a Main Component
class Main extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/add_group" component={AddGroup} />
          <Route exact path="/view_group" component={ViewGroup} />
          {/* <Route exact path="/recent_activity" component={RecentActivity} /> */}
          <Route exact path="/add_bill" component={AddExpense} />
          <Route exact path="/" component={LandingPage} />
        </BrowserRouter>
      </div>
    );
  }
}
//Export The Main Component
export default Main;
