import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import axios from "axios";
import { Redirect } from "react-router";
import avatar from "../../assets/images/avatar-orange.png";
import { graphql } from "react-apollo";
import { updateUserMutation } from "../../mutation/mutation";

class ProfileBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showName: true,
      showEmail: true,
      showNumber: true,
      profilePicUrl: this.props.props.avatar,
      firstName: this.props.props.firstName,
      email: this.props.props.email,
      phoneNumber: this.props.props.phoneNumber,
      userId: "",
      red: "",
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.changeHandlerImg = this.changeHandlerImg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeHandlerImg = this.changeHandlerImg.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    this.setState({
      red: <Redirect to="/login"></Redirect>,
    });
  };

  changeHandlerImg = (e) => {
    this.setState({
      profilePicUrl: e.target.files[0].name,
    });
    console.log("profile pic data", this.state.profilePicUrl);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  changeHandlerImg = (e) => {
    // console.log('image', e.target.files);
    this.setState({
      profilePicUrl: e.target.files[0].name,
    });
    console.log("profile pic data", this.state.profilePicUrl);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("this.pro", this.state.profilePicUrl);

    if (this.state.firstName === "") {
      const firstName = localStorage.getItem("userName");
      this.setState({
        firstName: firstName,
      });
    }
    if (this.state.email === "") {
      const email = localStorage.getItem("userEmail");
      console.log(email);
      this.setState({
        email: email,
      });
    }

    console.log("###################################", this.props.props);
    console.log("-------------------------", this.state);

    let mutationResponse = await this.props.updateUserMutation({
      variables: {
        _id: localStorage.getItem("userId"),
        firstName:
          this.state.firstName !== ""
            ? this.state.firstName
            : this.props.props.firstName,
        email:
          this.state.email !== "" ? this.state.email : this.props.props.email,
        phoneNumber:
          this.state.phoneNumber !== ""
            ? this.state.phoneNumber
            : this.props.props.phoneNumber,
        avatarImage:
          this.state.profilePicUrl !== ""
            ? this.state.profilePicUrl
            : this.props.props.avatar,
      },
    });
    let result = mutationResponse.data.updateUser;
    console.log("result", result);
    if (result) {
      console.log("Response", result);
      if (result.status === "200") {
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
    let red = this.state.red;
    console.log("State", this.state);
    console.log("###################################", this.props.props);

    return (
      <div id="fat_rabbit">
        {red}
        <div className="wrapper">
          <div class="toppad">&nbsp;</div>
          <div class="container">
            <div class="row mt-3 mb-2">
              <div class="span8 col-sm">
                <h1>Your account</h1>
              </div>
            </div>

            <form
              class="form-stacked"
              id="edit_user_27355282"
              onSubmit={this.handleSubmit}
            >
              <div className="container">
                <div className="row">
                  <div class="span3">
                    {this.props.props.avatar ? (
                      <img
                        class="picture-frame"
                        src={
                          "http://localhost:3001/uploads/" +
                          this.props.props.avatar
                        }
                        alt="frame"
                      />
                    ) : (
                      <img class="picture-frame" src={avatar} alt="demo"></img>
                    )}
                    <div>
                      <div className="change-avatar">Change your avatar</div>
                      <input
                        id="user_avatar"
                        name="profilePicUrl"
                        size="10"
                        type="file"
                        onChange={this.changeHandlerImg}
                      />
                    </div>
                  </div>

                  <div class="span3 wide-fields">
                    <div class="clearfix">
                      <label for="user_name">Your name</label>
                      {this.state.showName ? (
                        <div class="input static name">
                          <strong>{this.props.props.firstName}</strong>
                          &nbsp;
                          <a
                            href="#"
                            onClick={() => {
                              this.setState({ showName: !this.state.showName });
                            }}
                          >
                            Edit
                          </a>
                        </div>
                      ) : (
                        <div class="input dynamic name">
                          <input
                            autocomplete="off"
                            type="text"
                            placeholder={this.props.props.firstName}
                            name="firstName"
                            id="firstName"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      )}
                    </div>

                    <div class="clearfix">
                      <label for="user_email">Your email address</label>
                      {this.state.showEmail ? (
                        <div class="input static email">
                          <strong>{this.props.props.email}</strong>
                          &nbsp;
                          <a
                            href="#"
                            onClick={() => {
                              this.setState({
                                showEmail: !this.state.showEmail,
                              });
                            }}
                          >
                            <i class="icon-pencil"></i> Edit
                          </a>
                        </div>
                      ) : (
                        <div class="input dynamic name">
                          <input
                            autocomplete="off"
                            type="email"
                            placeholder={this.props.props.email}
                            name="email"
                            id="email"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      )}
                    </div>

                    <div class="clearfix">
                      <label for="user_phone">Your phone number</label>
                      {this.state.showNumber ? (
                        <div class="input static phone">
                          <strong>{this.props.props.phoneNumber}</strong>
                          &nbsp;
                          <a
                            href="##"
                            onClick={() => {
                              this.setState({
                                showNumber: !this.state.showNumber,
                              });
                            }}
                          >
                            <i class="icon-pencil"></i> Edit
                          </a>
                        </div>
                      ) : (
                        <div class="input dynamic name">
                          <input
                            autocomplete="off"
                            type="phoneNumber"
                            placeholder={this.props.props.phoneNumber}
                            name="phoneNumber"
                            id="phoneNumber"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div class="span3 col-sm">
                    <div class="clearfix">
                      <label for="user_default_currency">
                        Your default currency
                      </label>
                      <div className="new-exp-text">(for new expenses)</div>
                      <div class="input">
                        <select
                          class="modernized"
                          name="user[default_currency]"
                          id="user_default_currency"
                        >
                          <option value="INR">BHD</option>
                          <option value="INR">CAD</option>
                          <option value="INR">EUR</option>
                          <option value="INR">GBP</option>
                          <option value="INR">KWD</option>
                          <option selected="selected" value="USD">
                            USD ($)
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="clearfix">
                      <label for="user_time_zone">Your time zone</label>
                      <div class="input">
                        <select
                          class="modernized"
                          name="user[time_zone]"
                          id="user_time_zone"
                        >
                          <option selected="selected" value="Chennai">
                            (GMT+05:30) Chennai
                          </option>
                          <option
                            selected="selected"
                            value="Pacific Time (US &amp; Canada)"
                          >
                            (GMT-08:00) Pacific Time (US &amp; Canada)
                          </option>
                        </select>
                      </div>
                    </div>

                    <div class="clearfix">
                      <label for="user_locale">Language</label>
                      <div class="input">
                        <select
                          class="modernized"
                          name="user[locale]"
                          id="user_locale"
                        >
                          <option selected="selected" value="en">
                            English
                          </option>
                          <option value="de">Deutsch</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="offset9 span3 columns text-center">
                  &nbsp;
                  <input
                    type="submit"
                    name="commit"
                    value="Save"
                    class="btn btn-large btn-orange"
                    data-disable-with="Save"
                  />
                </div>
              </div>
            </form>
            <Link to="/login" onClick={this.handleLogout}>
              <input
                type="submit"
                name="submit"
                value="Log out"
                class="btn btn-orange btn-large primary submit-button"
              />
            </Link>
          </div>
          <div class="bottompad">&nbsp;</div>
        </div>
      </div>
    );
  }
}

export default graphql(updateUserMutation, { name: "updateUserMutation" })(
  ProfileBody
);
