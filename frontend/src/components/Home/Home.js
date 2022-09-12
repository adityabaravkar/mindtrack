import React, { Component } from "react";
import "../../App.css";
import HomeHeader from "./Home_header";
import HomeBody from "./Home_body";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import { QueryGetUser } from "../../queries/queries";
import { Redirect } from "react-router";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      getAppsStatus: false,
      firstName: "",
      email: "",
      status: "",
      groupList: [],
      result: {},
      avatar: "",
      red: "",
    };
  }

  render() {
    let redirectVar = null;
    console.log("Response", this.props.data.getUser);
    let result = this.props.data.getUser;
    if (result && this.state.getAppsStatus === false) {
      this.setState({
        firstName: result.firstName,
        email: result.email,
        groupList: result.groupList,
        avatar: result.avatarImage,
        getAppsStatus: true,
      });
    }
    if (!localStorage.getItem("token")) {
      // console.log("redirecting");
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div class="dashboard-body">
        {redirectVar}
        <HomeHeader props={this.state} />
        <HomeBody props={this.state} />
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
)(Home);
