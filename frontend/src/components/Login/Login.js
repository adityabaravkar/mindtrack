import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "../../App.css";
import axios from "axios";
import { Authentication } from "../../services";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      role: "Patient",
      status: "",
      authFlag: "",
      response: "",
      err: "",
      red: "",
    };
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.roleChangeHandler = this.roleChangeHandler.bind(this);
  }

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

  roleChangeHandler = (e) => {
    console.log(e.target.value);
    this.setState({
      role: e.target.value,
      email: "",
      password: "",
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      email: this.state.email,
      password: this.state.password,
      role: this.state.isAdmin ? "therapist" : "patient",
    };
    axios
      .post("http://localhost:9000/login", requestBody)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data;
          Authentication.setAuthData(
            result.user.id,
            result.token,
            result.user.role
          );
          this.setState({
            response: result.message,
            status: "Success",
            red: <Redirect to="/patient"></Redirect>,
          });
        } else {
          this.setState({
            status: "Error",
            response: response.data.message,
          });
        }
      })
      .catch((error) => {
        this.setState({
          status: "Error",
          response: error.response.data.message,
        });
      });
  };

  render() {
    let redirectVar = this.state.red;

    if (localStorage.getItem("token")) {
      redirectVar = <Redirect to="/patient" />;
    } else {
      redirectVar = "";
    }
    let remove = null;
    if (this.state.status === "") remove = "";
    else if (this.state.status === "Success") {
      remove = <Redirect to="/patient" />;
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
            <div className="text-center">
              <h2 className="h3 mb-3 font-weight-normal signin">Sign in as</h2>
              <select
                className="rounded"
                onChange={this.roleChangeHandler}
                id="options"
              >
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>

            <br />
            <div class="secondary_fields">
              <div class="mb-1 label-style-signup-font">
                Enter your <strong>Email address</strong>
                <br />
                <input
                  tabindex="2"
                  type="email"
                  class="inputBox_signup form-control rounded"
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
                  class="inputBox_signup form-control rounded"
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
                New to MindTrack?{" "}
                <Link to="/signup" style={{ color: "blue" }}>
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
