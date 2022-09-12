import React, { Component } from "react";
import "../../App.css";
import HomeHeader from "../Home/Home_header.js";
import LeftSidebar from "../Home/Left_sidebar.js";
import ViewGroupCenter from "./ViewGroupCenter.js";
import axios from "axios";
import { Redirect } from "react-router";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import { QueryGetUser } from "../../queries/queries";

class ViewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      email: "",
      status: "",
      groupList: [],
      result: {},
      avatar: "",
      groupId: "",
      groupName: "",
      viewGroupId: this.props.location.state
        ? this.props.location.state.groupId
        : "",
      viewGroupName: this.props.location.state
        ? this.props.location.state.groupName
        : "",
    };
  }

  render() {
    console.log("view group", this.state);
    localStorage.setItem("groupId", this.state.viewGroupId);
    localStorage.setItem("groupName", this.state.viewGroupName);
    let redirectVar = null;
    console.log("--", this.props.data.getUser);
    let result = this.props.data.getUser;
    if (result && this.state.getAppsStatus === false) {
      this.setState({
        userId: localStorage.getItem("userId"),
        firstName: localStorage.getItem("userId"),
        email: result.email,
        groupList: result.groupList,
        avatar: result.avatarImage,
        phoneNumber: result.phoneNumber,
        getAppsStatus: true,
      });
    }
    if (!localStorage.getItem("token")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div class="dashboard-body">
        {redirectVar}
        <HomeHeader props={this.state} />
        <div id="center_container">
          <div id="center_bars">
            <LeftSidebar props={this.state} />
            <ViewGroupCenter props={this.state} />
          </div>
        </div>
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
)(ViewGroup);
