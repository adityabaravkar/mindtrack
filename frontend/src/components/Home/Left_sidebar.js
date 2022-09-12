import React, { Component } from "react";
import axios from "axios";
import "../../App.css";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import { Redirect } from "react-router";
import * as compose from "lodash.flowright";
import { QueryGetUser } from "../../queries/queries";
import { addGroupAcceptMutation } from "../../mutation/mutation";

class LeftSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupId: "",
      result: {},
      status: "",
      red: "",
      groupStatus: "approved",
    };
    this.handleAccept = this.handleAccept.bind(this);
  }

  handleAccept = async (e) => {
    await this.setState({
      groupId: e.target.name,
    });
    // console.log("==========", this.state.groupId);
    let mutationResponse = await this.props.addGroupAcceptMutation({
      variables: {
        _id: localStorage.getItem("userId"),
        groupId: this.state.groupId,
        status: this.state.groupStatus,
      },
    });
    let result = mutationResponse.data.addGroupAccept;
    // console.log("result", result);

    if (result) {
      // console.log("Response", result);
      if (result.status === "200") {
        this.setState({
          status: "SUCCESS",
          red: <Redirect to="/home" />,
        });
      }
    }
  };

  render() {
    // console.log("1234", this.props.props);
    return (
      <div id="left_sidebar">
        {this.state.red}
        <div id="view_links">
          <Link to="/home" id="dashboard_link" className="open">
            <span></span> Dashboard
          </Link>
          <Link to="/recent_activity" id="notifications_link" class="unread">
            Recent activity
          </Link>

          <div class="expense_filter_links">
            <div class="tags">
              <div class="header">
                Groups
                <Link to="/add_group">Add</Link>
              </div>
              {this.props.props.groupList.length > 0
                ? this.props.props.groupList.map((value) =>
                    value.status === "approved" ? (
                      <Link
                        to={{
                          pathname: "/view_group",
                          state: {
                            groupId: value.groupId._id,
                            groupName: value.groupId.groupName,
                          },
                        }}
                      >
                        <a
                          href="#"
                          data-filterable="true"
                          data-search-string="apt 443"
                          data-active="true"
                          id={value.groupId._id}
                        >
                          {value.groupId.groupName}
                        </a>
                      </Link>
                    ) : (
                      ""
                    )
                  )
                : ""}
            </div>

            <div class="tags">
              <div class="header">Group Invites</div>
              {this.props.props.groupList.length > 0
                ? this.props.props.groupList.map((value) =>
                    value.status === "invited" ? (
                      <div>
                        <a
                          href="/view_group"
                          data-filterable="true"
                          data-search-string="apt 443"
                          data-active="true"
                          className="inviteGroups"
                        >
                          {value.groupId.groupName}
                        </a>
                        <button
                          className="acceptInvite"
                          id={value.groupId._id}
                          name={value.groupId._id}
                          value={value.groupId._id}
                          onClick={this.handleAccept}
                        >
                          +Accept
                        </button>
                      </div>
                    ) : (
                      ""
                    )
                  )
                : ""}
            </div>
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
  }),
  graphql(addGroupAcceptMutation, {
    name: "addGroupAcceptMutation",
    options: {
      refetchQueries: [
        {
          query: QueryGetUser,
          variables: { _id: localStorage.getItem("userId") },
        },
      ],
    },
  })
)(LeftSidebar);
