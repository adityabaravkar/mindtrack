import React from 'react';
import logo from '../../assets/images/Slpitwise_logo.svg';
import '../../App.css';
import avatar from '../../assets/images/avatar-orange.png';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProfileHeader(props) {
  return (
    <div className="header_common navbar position-fixed p-0">
      <div class="d-flex container flex_container">
        <a href="/">
          <img id="common-logo" src={logo} alt="logo" />
        </a>
        <ul class="nav pull-right">
          <li>
            <Link className="profile-home" to="/home">
              Home
            </Link>
          </li>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="dropdown">
              <Link to="/profile" class="dropdown-toggle1">
                {props.props.avatar ? (
                  <img
                    className="avatar-img"
                    src={'http://localhost:3001/uploads/' + props.props.avatar}
                    // src="D:/Git/Code/splitwise-react-sql/frontend/src/assets/images/users/brad.jpg"
                    // src={'../../assets/images/users/' + props.props.avatar}
                    alt="avatar"
                  />
                ) : (
                  <img src></img>
                )}
                {/* <img className="avatar-img" src={'../../assets/images/users/{image}'} alt="avatar" /> */}
                {props.props.firstName}
              </Link>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* <li class="dropdown">
            <a href="/profile" class="dropdown-toggle" data-toggle="dropdown">
              <img className="avatar-img" src={avatar} alt="avatar" />
              {props.props.firstName}
              <b class="caret"></b>
            </a>

            <ul class="dropdown-menu pull-right">
              <li>
                <a href="/account/settings">Your account</a>
              </li>
              <li>
                <a href="/groups/new">Create a group</a>
              </li>
              <li>
                <a href="/calculators">Fairness calculators</a>
              </li>

              <li>
                <a rel="nofollow" data-method="post" href="/logout">
                  Log out
                </a>
              </li>
            </ul>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default ProfileHeader;
