import React, { Component } from "react";
import logo from "../../assets/images/login-body-logo.svg";
import { Redirect } from "react-router";
import { graphql } from "react-apollo";
import { SignupMutation } from "../../mutation/mutation";
import "../../App.css";

class SignUp extends Component {
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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("in here", this.state);
    let mutationResponse = await this.props.SignupMutation({
      variables: {
        firstName: this.state.firstName,
        email: this.state.email,
        password: this.state.password,
      },
    });
    let result = mutationResponse.data.userSignup;
    console.log("result", result);
    if (result) {
      console.log("Response", result);
      if (result.status === "200") {
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("userName", result.userName);
        localStorage.setItem("userEmail", result.userEmail);
        localStorage.setItem("token", result.token);
        this.setState({
          response: result.message,
          status: "Success",
          red: <Redirect to="/home"></Redirect>,
        });
      } else {
        this.setState({
          status: "Error",
          response: result.message,
        });
      }
    }
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
      <div class="d-flex container flex_container login-body">
        {remove}
        {redirectVar}
        <img width="200" height="200" class="login_logo" src={logo} alt="xyz" />
        <div class="login-sidebar">
          <div class="sidebar-header">Introduce yourself</div>
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
                Hi there! My name is
              </label>
              <div class="input">
                <input
                  tabindex="1"
                  class="inputBox_signup form-control"
                  type="text"
                  name="firstName"
                  id="firstName"
                  onChange={this.firstNameChangeHandler}
                  required
                />
              </div>
            </div>

            <div class="secondary_fields">
              <div class="mb-1 label-style-signup">
                Here’s my <strong>email address</strong>:
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

              <div class="mb-1 label-style-signup">
                And here’s my <strong>password</strong>:
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

            <input
              type="submit"
              name="commit"
              value="Sign me up!"
              class="btn btn-large btn-orange btn-signup mt-2"
              data-disable-with="Sign me up!"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default graphql(SignupMutation, { name: "SignupMutation" })(SignUp);
