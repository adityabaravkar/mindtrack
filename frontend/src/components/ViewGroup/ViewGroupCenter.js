import React, { Component } from "react";
import "../../App.css";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { graphql } from "react-apollo";
import * as compose from "lodash.flowright";
import { QueryGetGroup } from "../../queries/queries";

class ViewGroupCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseList: [],
      expenseId: "",
      status: "",
      groupName: "",
      groupId: "",
      result: {},
      red: "",
      comment: "",
      getAppsStatus: false,
    };
    this.settleUpGroup = this.settleUpGroup.bind(this);
    this.leaveGroup = this.leaveGroup.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async settleUpGroup() {
    console.log("inside settle up");
    let data = {
      _id: localStorage.getItem("userId"),
      groupId: this.state.groupId,
    };
    axios.defaults.withCredentials = true;
    this.props.settleUpGroup(data, (res) => {
      this.setState({
        status: res.status,
      });
      alert("You are settled Up");
      console.log("0-0-0-0-0-0-0-0--0", res);
    });
  }

  async leaveGroup() {
    let data = {
      _id: localStorage.getItem("userId"),
      groupId: this.state.groupId,
    };
    axios.defaults.withCredentials = true;
    this.props.leaveGroup(data, (res) => {
      if (res.status === 200) {
        this.setState({
          status: res.status,
          red: <Redirect to="/home"></Redirect>,
        });
        console.log("0-0-0-0-0-0-0-0--0", res);
      } else {
        console.log("invalid");
        alert("Cannot leave the group. Settle Up First");
      }
    });
  }

  handleChange = (e) => {
    console.log("000000---------00000000", e.target.placeholder);
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log("--=-=-=-=-=--=", this.state);
  };

  handleComment = (e) => {
    e.preventDefault();
    const data = {
      commentDescription: this.state.comment,
      expenseId: document
        .getElementById("expenseId")
        .getAttribute("data-value"),
    };
    axios.defaults.withCredentials = true;
    console.log("dataaaaaaaaaaaa", data);
    this.props.addComment(data, (res) => {
      this.setState({
        status: res.status,
      });
      console.log("0-0-0-0-0-0-0-0--0", res);
    });
  };

  async componentDidMount() {
    console.log("viewGrp", this.props);
    await this.setState({
      groupId: this.props.props.viewGroupId,
      groupName: this.props.props.viewGroupName,
    });
    console.log(
      "oooooooooooooooooooooooooooooooooooooooooo",
      this.state.groupId,
      this.state.groupName
    );
    // const data = {
    //   _id: this.state.groupId,
    // };
    // axios.defaults.withCredentials = true;
    // this.props.getGroup(data, (res) => {
    //   console.log(res.status);
    //   console.log("-------------group data", res.data);
    //   if (res.status === 200) {
    //     this.setState({
    //       expenseList: res.data.expenseList,
    //       result: res.data.result,
    //     });
    //   }
    // });
  }

  render() {
    console.log("aaaaa", this.state);
    console.log("--1", this.props.data.getGroup);
    let result = this.props.data.getGroup;
    if (result && this.state.getAppsStatus === false) {
      this.setState({
        expenseList: result.expenseList,
        getAppsStatus: true,
      });
    }
    return (
      <div>
        {this.state.red}
        <div id="center_column">
          <div class="topbar group group-actions">
            <img
              src="https://s3.amazonaws.com/splitwise/uploads/group/default_avatars/avatar-blue47-house-50px.png"
              alt="img"
            />
            <h1>{this.state.groupName}</h1>
            <div class="actions">
              <div class="btn-group">
                <Link
                  to={{
                    pathname: "/add_bill",
                    state: {
                      groupId: this.state.groupId,
                      groupName: this.state.groupName,
                    },
                  }}
                >
                  <a
                    class="btn btn-large btn-orange"
                    data-toggle="modal"
                    href="#"
                  >
                    Add an expense
                  </a>
                </Link>
              </div>
              <button
                class="btn btn-large btn-mint"
                data-toggle="modal"
                onClick={this.settleUpGroup}
              >
                Settle up
              </button>
              <button
                class="btn btn-large btn-danger"
                data-toggle="modal"
                href="##"
                onClick={this.leaveGroup}
              >
                Leave
              </button>
            </div>
          </div>
          <div id="expenses">
            <div id="expenses_list">
              {/* <div class="month-divider">
                <span>March 2021</span>
              </div> */}
              {this.state.expenseList.length > 0 ? (
                this.state.expenseList.map((value) => (
                  // eslint-disable-next-line no-restricted-globals
                  <form>
                    <div class="expense">
                      <div class="summary">
                        <div class="expense summary uninvolved">
                          <div id="expenseId" data-value={value._id} hidden>
                            {value._id}
                          </div>
                          <div class="main-block">
                            <img
                              src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                              class="receipt"
                              alt="img"
                            />
                            <div class="header">
                              <span
                                value={value._id}
                                id="expenseName"
                                class="description"
                              >
                                <a>{value.expenseDescription}</a>
                              </span>
                            </div>
                          </div>
                          <div class="cost">
                            {value.userExpenseName}
                            <br />
                            <span class="number">{value.amount}</span>
                          </div>
                          {/* <hr></hr> */}
                          {/* <div class="main-block">
                            <div class="header">Comments</div>
                            <hr></hr>
                          </div> */}
                          {/* {value.commentList.length > 0 ? (
                            value.commentList.map((value) => (
                              // eslint-disable-next-line no-restricted-globals
                              <div class="main-block">
                                {value.commentDescription}
                              </div>
                            ))
                          ) : (
                            <a></a>
                          )} */}

                          {/* <div class="add_comment m-3">
                            <textarea
                              placeholder="Add a comment"
                              name="comment"
                              data={value._id}
                              cols="40"
                              rows="2"
                              onChange={this.handleChange}
                            ></textarea>
                            <br />
                            <button
                              type="button"
                              class="btn btn-small btn-orange"
                              onClick={this.handleComment}
                            >
                              Post
                            </button>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </form>
                ))
              ) : (
                <a></a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(QueryGetGroup, {
    options: {
      variables: { _id: localStorage.getItem("groupId") },
    },
  })
)(ViewGroupCenter);
