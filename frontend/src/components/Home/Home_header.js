import React, { Component } from "react";
import logo from "../../assets/images/Slpitwise_logo.svg";
import "../../App.css";
// import avatar from '../../assets/images/users/michael.jpg';
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import cookie from "react-cookies";

class homeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      red: "",
      profilePicUrl: "",
    };
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout = () => {
    cookie.remove("cookie", { path: "/" });
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");

    this.setState({
      red: <Redirect to="/login"></Redirect>,
    });
  };
  render() {
    let red = this.state.red;
    // console.log("99--99", this.props.props);
    return (
      <div>
        {red}
        <div className="header_common navbar position-fixed p-0">
          <div class="d-flex container flex_container">
            <Link to="/">
              <img id="common-logo" src={logo} alt="logo" />
            </Link>
            <ul class="nav pull-right">
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic" className="dropdown">
                  <Link to="/profile" class="dropdown-toggle1">
                    {this.props.props.avatar ? (
                      <img
                        className="avatar-img"
                        src={
                          "http://localhost:3001/uploads/" +
                          this.props.props.avatar
                        }
                        // src={this.state.profilePicUrl}
                        alt="avatar"
                      />
                    ) : (
                      <img src></img>
                    )}
                    {this.props.props.firstName}
                  </Link>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default homeHeader;
