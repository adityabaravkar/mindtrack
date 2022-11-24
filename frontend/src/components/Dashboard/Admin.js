import React from "react";
import { Route, Switch } from "react-router-dom";

import AdminNavbar from "../Navbars/AdminNavbar";
import Sidebar from "../Sidebar/Sidebar";

import routes from "../../routes.js";

import sidebarImage from "../../assets/img/sidebar-3.jpg";

function Admin() {
  const [image] = React.useState(sidebarImage);
  const [color] = React.useState("black");
  const [hasImage] = React.useState(true);
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      console.log("custom: ", prop.layout);
      if (prop.layout === "/therapist") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
