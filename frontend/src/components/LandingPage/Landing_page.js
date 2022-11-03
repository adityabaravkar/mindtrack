import logo from "../../MyLogo.png";
import backgroundImg from "../../Landing_background.png";
import "../../App.css";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import cookie from "react-cookies";

class App extends Component {
  render() {
    let redirectVar = null;

    if (cookie.load("cookie")) {
      redirectVar = <Redirect to="/home" />;
    } else {
      redirectVar = "";
    }
    return (
      <div
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100vw",
          height: "100vh",
        }}
      >
        {redirectVar}
        <div className="container mx-auto">
          <header class="d-flex align-items-center justify-content-between px-3 py-4 mx-auto">
            <Link to="/" className="d-flex align-items-center">
              <img className="logoImg" src={logo} alt="logo" />
            </Link>
            <div id="guest" class="d-flex align-items-center">
              <div class=" position-relative">
                <Link
                  to="/login"
                  className="btn-light px-3 py-2 rounded shadow font-weight text-decoration-none mx-3"
                >
                  Log in
                </Link>
              </div>
              {"      "}
              <Link
                to="/signup"
                className="btn-dark text-white px-3 py-2 rounded shadow font-weight text-decoration-none"
              >
                Sign up
              </Link>
            </div>
          </header>
        </div>
      </div>
    );
  }
}

export default App;
