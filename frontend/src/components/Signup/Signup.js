import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "../../App.css";
import axios from "axios";
import { Authentication } from "../../services";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      email: "",
      password: "",
      role: "patient",
      status: "",
      authFlag: "",
      response: "",
      err: "",
      red: "",
    };
    this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.userTypeChanged = this.userTypeChanged.bind(this);
  }

  componentDidMount() {
    document.title = "Signup";
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

  userTypeChanged = (e) => {
    this.setState({
      role: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const requestBody = {
      userName: this.state.firstName,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role,
    };
    axios
      .post("http://localhost:9000/signup", requestBody)
      .then((response) => {
        if (response.status === 200) {
          const result = response.data;
          Authentication.setAuthData(
            result.user.id,
            result.token,
            result.user.role
          );
          if (this.state.role === "patient") {
            this.setState({
              response: result.message,
              status: "Success",
              red: <Redirect to="/patient"></Redirect>,
            });
          } else if (this.state.role === "therapist") {
            this.setState({
              response: result.message,
              status: "Success",
              red: <Redirect to="/therapist"></Redirect>,
            });
          }
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
      remove = <Redirect to="/home" />;
    } else if (this.state.status === "Error") {
      remove = (
        <div class="alert alert-danger" role="alert">
          {this.state.response}
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
            <div class="clearfix">
              <label
                for="user_session_email"
                class="mb-1 label-style-signup-font"
              >
                Enter your <strong>Name</strong>
              </label>
              <div class="input">
                <input
                  tabindex="1"
                  class="inputBox_signup form-control rounded"
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={this.firstNameChangeHandler}
                  required
                />
              </div>
            </div>

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
                Create your <strong>Password</strong>
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
              <div class="mb-1 label-style-signup-font">
                Select your <strong>Role: </strong>
                <br />
                <select
                  className="mt-1 rounded"
                  name="userType"
                  onChange={this.userTypeChanged}
                >
                  <option value="patient">Patient</option>
                  <option value="therapist">Therapist</option>
                </select>
              </div>
            </div>
            <div className="text-center">
              <input
                type="submit"
                name="commit"
                value="Sign me up!"
                class="btn-dark btn-large btn-signup mt-5"
                data-disable-with="Sign me up!"
              />
              <div className="mt-3">
                Already a member?{" "}
                <Link to="/login" style={{ color: "blue" }}>
                  Log in
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
