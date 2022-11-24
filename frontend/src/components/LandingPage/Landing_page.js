import logo from "../../MyLogo.png";
import backgroundImg from "../../Landing_background.png";
import "../../App.css";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import cookie from "react-cookies";
// import WordArt from "react-wordart";

class App extends Component {
  componentDidMount() {
    document.title = "MindTrack";
  }

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
        {/* <div className="w-50">
          <div>
            <WordArt
              text='"Mental health problems don’t define who you are. They are something
            you experience. You walk in the rain and you feel the rain, but you
            are not the rain." — Matt Haig'
              theme={`italicOutline`}
              fontSize={50}
            />
          </div>
        </div> */}
      </div>
    );
  }
}

export default App;
