import "../../App.css";
import LoginHeader from "./Login-_header.js";
import LoginBody from "./Main_body.js";
import { Component } from "react";
import { Redirect } from "react-router";
import cookie from "react-cookies";

class Login extends Component {
  render() {
    let redirectVar = null;

    if (cookie.load("cookie")) {
      // localStorage.setItem('auth', this.state.authFlag);
      redirectVar = <Redirect to="/home" />;
      // this.componentDidMount();
    } else {
      redirectVar = "";
    }
    return (
      <div>
        {redirectVar}
        <LoginHeader />
        <LoginBody />
      </div>
    );
  }
}

export default Login;
