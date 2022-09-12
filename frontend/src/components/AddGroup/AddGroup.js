import React, { Component } from "react";
import "../../App.css";
import logo from "../../assets/images/add_logo.svg";
import { Redirect } from "react-router";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import { QueryGetUser, QueryGetOtherUser } from "../../queries/queries";
import { addGroupMutation } from "../../mutation/mutation";

class AddGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      email: "",
      groupName: "",
      getAppsStatus: false,
      allUsers: [],
      status: "",
      filteredUsers: "",
      inviteMembers: [],
      i: 4,
      memberField: [],
      red: "",
      error: "",
    };

    this.userSearchName = this.userSearchName.bind(this);
    this.userSearchEmail = this.userSearchEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.numberOfMembers = this.numberOfMembers.bind(this);
  }

  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    // let arr_name = [];
    let groupOwner = userId;
    let i = 0;
    let id = "group_field_" + i;
    let groupMember = document.getElementById(id).value;
    // arr_name.push(userId);

    // for (let i = 0; i < this.state.i; i++) {
    //   let id = "group_field_" + i;
    //   if (document.getElementById(id).value !== "Select Name")
    //     arr_name.push(document.getElementById(id).value);
    // }

    // console.log("arr_name", arr_name);

    let mutationResponse = await this.props.addGroupMutation({
      variables: {
        groupOwner: groupOwner,
        groupMember: groupMember,
        groupName: this.state.groupName,
      },
    });
    let result = mutationResponse.data.addGroup;
    console.log("result", result);

    if (result) {
      console.log("Response", result);
      if (result.status === "200") {
        this.setState({
          status: "SUCCESS",
          red: <Redirect to="/home" />,
        });
      } else {
        console.log("invalid");
        this.setState({
          error: <div className="alert alert-danger">Group already Exists</div>,
        });
      }
    }
  };

  userSearchName = (e) => {
    console.log("e", e);
    let filteredSearchUsers = this.state.allUsers;
    if (e.target.value) {
      this.setState({
        filteredUsers: filteredSearchUsers.filter((user) => {
          return user.firstname
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(e.target.value.replace(/\s+/g, "").toLowerCase());
        }),
      });
    }
  };

  userSearchEmail = (e) => {
    let filteredSearchUsers = this.state.allUsers;
    if (e.target.value) {
      this.setState({
        filteredUsers: filteredSearchUsers.filter((user) => {
          return user.email
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(e.target.value.replace(/\s+/g, "").toLowerCase());
        }),
      });
    }
  };

  numberOfMembers = (e) => {
    console.log("aaaa");
    let arr = [];

    let allUser = this.state.allUsers;
    console.log(".......", allUser);
    for (let i = 0; i < this.state.i; i++) {
      arr.push(
        <div class="fields">
          <div class="fields">
            <div class="group-member editable">
              <img
                class="faded"
                src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-grey1-50px.png"
                alt="img"
              />

              <span
                role="status"
                aria-live="polite"
                class="ui-helper-hidden-accessible"
              ></span>
              <select
                name={"group_field_" + i}
                id={"group_field_" + i}
                placeholder="Name"
              >
                <option>Select Name</option>
                {allUser.length > 0
                  ? allUser.map((user) => {
                      return <option value={user._id}>{user.firstName}</option>;
                    })
                  : null}
              </select>

              <a
                class="delete remove_nested_fields"
                href="javascript:void(0)"
                // onClick={this.removeMember(i)}
              >
                ×
              </a>
            </div>
          </div>
        </div>
      );
    }

    return arr;
  };

  render() {
    console.log(this.props);
    console.log("000000", this.state);
    console.log("--", this.props.QueryGetUser.getUser);
    let result = this.props.QueryGetUser.getUser;
    let otherUser = this.props.QueryGetOtherUser.getOtherUsers;
    if (result && this.state.getAppsStatus === false) {
      this.setState({
        firstName: result.firstName,
        email: result.email,
        groupList: result.groupList,
        allUsers: otherUser.UserObj,
        getAppsStatus: true,
      });
    }
    return (
      <div id="fat_rabbit">
        {this.state.red}
        <div class="wrapper">
          <div class="toppad">&nbsp;</div>
          <div class="flex_container blank_page clearfix">
            <a href="/">
              <img
                height="200"
                width="200"
                class="envelope"
                src={logo}
                alt="img"
              />
            </a>

            <div class="content-block">
              {this.state.error}
              <h2>Start a new group</h2>

              <form
                class="form-stacked"
                id="new_group"
                onSubmit={this.handleSubmit}
              >
                <div className="group-name">My group shall be called…</div>

                <input
                  tabindex="1"
                  placeholder="Funkytown"
                  autocomplete="off"
                  onChange={this.changeHandler}
                  type="text"
                  name="groupName"
                  id="group_name"
                  className="add_name"
                  required
                />

                <div class="secondary_fields">
                  <hr />

                  <div>
                    <div id="manual_entry">
                      <h2>Group members</h2>

                      <div class="fields">
                        <div class="group-member">
                          <div class="fields">
                            <img
                              src="https://s3.amazonaws.com/splitwise/uploads/user/default_avatars/avatar-orange14-50px.png"
                              alt="img"
                            />
                            {this.state.firstName} (<em>{this.state.email}</em>)
                          </div>
                        </div>
                      </div>
                      {this.numberOfMembers()}

                      <button class="btn">+ Add a person</button>
                    </div>
                  </div>
                </div>

                <input
                  type="submit"
                  name="commit"
                  value="Save"
                  class="btn btn-large btn-orange"
                  autocomplete="off"
                  data-disable-with="Save"
                />
                <div></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(QueryGetUser, {
    name: "QueryGetUser",
    options: {
      variables: { _id: localStorage.getItem("userId") },
    },
  }),
  graphql(QueryGetOtherUser, {
    name: "QueryGetOtherUser",
    options: {
      variables: { _id: localStorage.getItem("userId") },
    },
  }),
  graphql(addGroupMutation, {
    name: "addGroupMutation",
    options: {
      refetchQueries: [
        {
          query: QueryGetUser,
          variables: { _id: localStorage.getItem("userId") },
        },
      ],
    },
  })
)(AddGroup);
