import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import { addExpenseMutation } from "../../mutation/mutation";

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseDescription: "",
      amount: "",
      result: {},
      groupName: this.props.location.state.groupName,
      groupId: this.props.location.state.groupId,
      red: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    console.log("state datataaaaaaaaaaaaaaaa", this.state);

    console.log("in here", this.state);
    let mutationResponse = await this.props.addExpenseMutation({
      variables: {
        _id: localStorage.getItem("userId"),
        userName: localStorage.getItem("userName"),
        groupId: this.state.groupId,
        expenseDescription: this.state.expenseDescription,
        amount: this.state.amount,
      },
    });
    let result = mutationResponse.data.addExpense;
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
    let redirectVar = null;

    if (!localStorage.getItem("token")) {
      redirectVar = <Redirect to="/login" />;
    }
    return (
      <div id="add_bill">
        {redirectVar}
        {this.state.red}
        <div class="relative-container">
          <div class="input-data"></div>
          <div class="main-window">
            <header>
              Add an expense
              <Link class="dismiss" to="/home" data-dismiss="modal">
                ×
              </Link>
            </header>
            <div class="with_field">
              <span class="with">
                With <strong>you</strong> and:{" "}
                <strong>{this.state.groupName}</strong>
              </span>
            </div>
            <div class="body">
              <div class="main_fields">
                <img
                  src="https://s3.amazonaws.com/splitwise/uploads/category/icon/square_v2/uncategorized/general@2x.png"
                  class="category"
                  alt="img"
                />
                <input
                  type="text"
                  class="description"
                  placeholder="Enter a description"
                  name="expenseDescription"
                  onChange={this.handleChange}
                />
                <div id="_size-changing-clone"></div>
                <div class="cost_container">
                  <span class="currency_code">$</span>
                  <input
                    type="number"
                    class="cost"
                    placeholder="0.00"
                    name="amount"
                    min="0"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <footer>
              <button
                class="btn btn-large btn-mint submit"
                onClick={this.handleSubmit}
              >
                Save
              </button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(addExpenseMutation, { name: "addExpenseMutation" })(
  AddExpense
);
