import React, { Component } from "react";
import "../../App.css";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";
import axios from "axios";
import { Redirect } from "react-router";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import { QueryGetUser } from "../../queries/queries";

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
      getAppsStatus: false,
    };
  }

  // componentWillMount() {
  //   const userId = localStorage.getItem("userId");
  //   const data = {
  //     _id: userId,
  //   };

  //   axios.defaults.withCredentials = true;
  //   this.props.getUser(data, (res) => {
  //     console.log(res.status);
  //     console.log("-------------", res.data.groupList);
  //     if (res.status === 200) {
  //       this.setState({
  //         userId: userId,
  //         result: res.data.result,
  //         firstName: res.data.firstName,
  //         email: res.data.email,
  //         groupList: res.data.groupList,
  //         avatar: res.data.avatarImage,
  //         status: res.data.status,
  //         phoneNumber: res.data.phoneNumber,
  //       });
  //     }
  //   });
  // }

  render() {
    let redirectVar = null;
    console.log("--", this.props.data.getUser);
    let result = this.props.data.getUser;
    if (result && this.state.getAppsStatus === false) {
      this.setState({
        userId: localStorage.getItem("userId"),
        firstName: result.firstName,
        email: result.email,
        groupList: result.groupList,
        avatar: result.avatarImage,
        phoneNumber: result.phoneNumber,
        getAppsStatus: true,
      });
    }
    console.log("0", this.state);
    if (!localStorage.getItem("token")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div class="dashboard-body">
        {redirectVar}
        <ProfileHeader props={this.state} />
        <ProfileBody props={this.state} />
      </div>
    );
  }
}

export default compose(
  graphql(QueryGetUser, {
    options: {
      variables: { _id: localStorage.getItem("userId") },
    },
  })
)(ProfilePage);
