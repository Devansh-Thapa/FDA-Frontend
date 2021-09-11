import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";
import "../style/navbar.css";
const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return "active";
  } else {
    return "";
  }
};

const Nav = ({ history }) => {
  return (
    <div>
      {/* <nav className="navbar sticky-top navbar-expand-sm bg-secondary">
       */}
      <nav className="navbar sticky-top navbar-expand-sm">
        <ul className="navbar-nav">
          {isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link className={`nav-link ${currentTab(history, "/")}`} to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${currentTab(
                    history,
                    "/donationHistory"
                  )}`}
                  to="/donationHistory"
                >
                  Donation history
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  // style={currentTab(history, "/admin/dashboard")}
                  className="nav-link"
                  to="/admin/dashboard"
                >
                  My Dashboard
                </Link>
              </li>
            </Fragment>
          )}
          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  // style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/signup"
                >
                  Signup
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  // style={currentTab(history, "/signin")}
                  className="nav-link"
                  to="/signin"
                >
                  Signin
                </Link>
              </li>
            </Fragment>
          )}
        </ul>
        <ul className="navbar-nav ml-auto">
          {isAuthenticated() && (
            <li className="nav-item">
              <span
                className="nav-link text-warning signout"
                onClick={() => {
                  signout(() => {
                    history.push("/");
                  });
                }}
              >
                Signout
              </span>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default withRouter(Nav);
