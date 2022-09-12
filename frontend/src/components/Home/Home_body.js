import React, { Component } from "react";
import cookie from "react-cookies";
import { Redirect } from "react-router-dom";
import LeftSidebar from "./Left_sidebar.js";
import CenterColumn from "./Center_column.js";
import "../../App.css";
import axios from "axios";

class HomeBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      otherAmount: "",
      totalMembers: "",
      groupId: "",
      owned: "",
      youOwe: "",
      totalAmount: "",
      otherUsers: {},
      red: "",
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  // componentWillMount() {
  //   let redirectVar = null;

  //   if (!localStorage.getItem('token')) {
  //     // localStorage.setItem('auth', this.state.authFlag);
  //     redirectVar = <Redirect to="/login" />;
  //     // this.componentDidMount();
  //   }
  // }
  async componentDidMount() {
    // const userId = localStorage.getItem("userId");
    // const data = {
    //   _id: userId,
    // };
    // axios.defaults.withCredentials = true;
    // this.props.getUser(data, (res) => {
    //   console.log(res.status);
    //   console.log("-------------", res.data.groupList);
    //   if (res.status === 200) {
    //     this.setState({
    //       result: res.data,
    //     });
    //   }
    //   let groups = this.state.result.groupList;
    //   console.log("grouplist", groups);
    //   let totalGet = 0;
    //   let totalPay = 0;
    //   for (let i = 0; i < groups.length; i++) {
    //     let totalMembers = groups[i].groupId.userList.length;
    //     let userGet = 0;
    //     let userPay = 0;
    //     // let totalSum = 0;
    //     let expenses = groups[i].groupId.expenseList;
    //     for (let j = 0; j < expenses.length; j++) {
    //       if (expenses[j].userExpense === userId) {
    //         userGet += expenses[j].amount - expenses[j].amount / totalMembers;
    //       } else {
    //         userPay += expenses[j].amount / totalMembers;
    //       }
    //     }
    //     totalGet += userGet;
    //     totalPay += userPay;
    //   }
    //   totalGet = Math.round(totalGet * 100) / 100;
    //   totalPay = Math.round(totalPay * 100) / 100;
    //   let totalAmount = totalGet - totalPay;
    //   totalAmount = Math.round(totalAmount * 100) / 100;
    //   console.log("total get", totalGet);
    //   console.log("total pay", totalPay);
    //   this.setState({
    //     youOwe: totalPay,
    //     owned: totalGet,
    //     totalAmount: totalAmount,
    //   });
    // });
    // let members = this.state.totalMembers + 1;
    // let own = this.state.amount / members;
    // let owned = this.state.amount - own;
    // let otherAmount = this.state.otherAmount / members;
    // let total = owned - otherAmount;
    // owned = Math.round(owned * 100) / 100;
    // otherAmount = Math.round(otherAmount * 100) / 100;
    // total = Math.round(total * 100) / 100;
    // this.setState({
    //   owned: owned,
    //   youOwe: otherAmount,
    //   totalAmount: total,
    // });
  }

  handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // <Redirect to="/home" />;
    this.setState({
      red: <Redirect to="/login" />,
    });
    // this.componentDidMount();
  };

  render() {
    // console.log("--00--", this.props.props);
    let red = this.state.red;
    // console.log("red", red);
    return (
      <div id="center_container">
        {red}
        <div id="center_bars">
          <LeftSidebar props={this.props.props} />
          <CenterColumn props={this.state} />
        </div>
      </div>
    );
  }
}

export default HomeBody;
