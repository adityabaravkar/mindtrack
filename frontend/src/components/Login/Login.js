import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "../../App.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      email: "",
      password: "",
      status: "",
      authFlag: "",
      response: "",
      err: "",
      red: "",
    };
    this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
  }

  firstNameChangeHandler = (e) => {
    this.setState({
      firstName: e.target.value,
    });
  };

  emailChangeHandler = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  passwordChangeHandler = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  render() {
    let redirectVar = this.state.red;

    if (localStorage.getItem("token")) {
      redirectVar = <Redirect to="/home" />;
    } else {
      redirectVar = "";
    }
    let remove = null;
    if (this.state.status === "") remove = "";
    else if (this.state.status === "Success") {
      remove = <Redirect to="/home" />;
    } else if (this.state.status === "Error") {
      remove = (
        <div class="alert alert-danger" role="alert">
          User with Name: {this.state.firstName} already present.
        </div>
      );
    }
    return (
      <div
        style={{
          backgroundColor: "#6ABBD7",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {remove}
        {redirectVar}
        <div class="login-sidebar">
          <div class="sidebar-header mb-5">Welcome to MindTrack</div>
          <form
            class="form-stacked"
            id="new_user_session"
            onSubmit={this.handleSubmit}
          >
            <div class="secondary_fields">
              <div class="mb-1 label-style-signup-font">
                Enter your <strong>Email address</strong>
                <br />
                <input
                  tabindex="2"
                  type="email"
                  class="inputBox_signup form-control"
                  name="email"
                  id="email"
                  onChange={this.emailChangeHandler}
                  required
                ></input>
              </div>

              <div class="mb-1 label-style-signup-font">
                Enter your <strong>Password</strong>
                <br />
                <input
                  tabindex="3"
                  type="password"
                  name="password"
                  class="inputBox_signup form-control"
                  id="password"
                  onChange={this.passwordChangeHandler}
                  required
                />
              </div>
            </div>
            <div className="text-center">
              <input
                type="submit"
                name="commit"
                value="Log in"
                class="btn-dark btn-large btn-signup mt-5"
                data-disable-with="Log in"
              />
              <div className="mt-3">
                New to MindTrack? <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
