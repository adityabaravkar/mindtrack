import React, { Component } from "react";
import logo from "../../assets/images/login-body-logo.svg";
import { Redirect } from "react-router";
import "../../App.css";
import { graphql } from "react-apollo";
import { LoginMutation } from "../../mutation/mutation";

class loginBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      authFlag: false,
      error: "",
      red: "",
    };
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {}

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
    // console.log("in here", this.state);
    let mutationResponse = await this.props.LoginMutation({
      variables: {
        email: this.state.email,
        password: this.state.password,
      },
    });
    let result = mutationResponse.data.userLogin;
    console.log("result", result);
    if (result) {
      // console.log("Response", result);
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
    let error = this.state.error;
    let redirectVar = this.state.red;

    if (localStorage.getItem("token")) {
      redirectVar = <Redirect to="/home" />;
    } else {
      redirectVar = "";
    }

    return (
      <div class="d-flex container flex_container login-body">
        {error}
        {redirectVar}

        {/* {this.state.error} */}
        <img width="200" height="200" class="login_logo" src={logo} alt="xyz" />
        <div class="login-sidebar">
          <div class="sidebar-header mb-2">Welcome to Splitwise</div>

          <form
            class="form-stacked"
            id="new_user_session"
            onSubmit={this.handleSubmit}
          >
            <div class="clearfix">
              <label for="user_session_email" class="mb-1 label-style">
                Email address
              </label>
              <div class="input">
                <input
                  autocapitalize="off"
                  class="inputBox"
                  type="email"
                  name="email"
                  id="email"
                  onChange={this.emailChangeHandler}
                  required
                />
              </div>
            </div>
            <div class="clearfix">
              <label for="user_session_password" class="mb-1 label-style">
                Password
              </label>
              <div class="input">
                <input
                  class="inputBox"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.passwordChangeHandler}
                  required
                />
              </div>
            </div>

            <input
              type="submit"
              name="commit"
              value="Log in"
              class="btn btn-orange btn-large primary submit-button"
              data-disable-with="Log in!"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default graphql(LoginMutation, { name: "LoginMutation" })(loginBody);
