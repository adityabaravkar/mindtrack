import React from 'react';
import logo from '../../assets/images/Slpitwise_logo.svg';
import '../../App.css';
import { Link } from 'react-router-dom';

function loginHeader() {
  return (
    <div className="header_common">
      <div class="d-flex container flex_container">
        <Link to="/">
          <img id="common-logo" src={logo} alt="logo" />
        </Link>
        {/* <a href="/">
          <img id="common-logo" src={logo} alt="logo" />
        </a> */}
        <div class="login_links">
          <Link to="/login" className="btn btn-mint">
            Log in
          </Link>
          {/* <a class="btn btn-mint" href="/login">
            Log in
          </a> */}
          or
          <Link to="/signup" className="btn btn-orange">
            Sign up
          </Link>
          {/* <a class="btn btn-orange" href="/signup">
            Sign up
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default loginHeader;
