import React, { Component } from "react";
import "../../App.css";
import HomeHeader from "../Home/Home_header.js";
import LeftSidebar from "../Home/Left_sidebar.js";
import ActivityBody from "./ActivityBody.js";
import axios from "axios";
import { Redirect } from "react-router";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      firstName: "",
      email: "",
      status: "",
      groupList: [],
      result: {},
      avatar: "",
      red: "",
      phoneNumber: "",
    };
  }

  async componentDidMount() {
    const userId = localStorage.getItem("userId");
    const data = {
      _id: userId,
    };

    axios.defaults.withCredentials = true;
    this.props.getUser(data, (res) => {
      console.log(res.status);
      console.log("-------------", res.data.groupList);
      if (res.status === 200) {
        this.setState({
          userId: userId,
          result: res.data.result,
          firstName: res.data.firstName,
          email: res.data.email,
          groupList: res.data.groupList,
          avatar: res.data.avatarImage,
          status: res.data.status,
          phoneNumber: res.data.phoneNumber,
        });
      }
    });
  }
  render() {
    let redirectVar = null;

    if (!localStorage.getItem("token")) {
      // localStorage.setItem('auth', this.state.authFlag);
      redirectVar = <Redirect to="/login" />;
      // this.componentDidMount();
    }
    return (
      <div class="dashboard-body">
        {redirectVar}
        <HomeHeader props={this.state} />
        <div id="center_container">
          <div id="center_bars">
            <LeftSidebar props={this.state} />
            <ActivityBody props={this.state} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
