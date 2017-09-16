import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import SigninContainer from "components/Signin/SigninContainer";
import { logOutUser } from "../services/user";
import { Modal } from "react-bootstrap";
import withAuth from "hoc/withAuth";

class Header extends Component {
  render() {
    const signInButton = this.props.user ? (
      <a onClick={this.props.auth.logout}>Sign Out</a>
    ) : (
      <a onClick={this.props.auth.login}>Sign In</a>
    );

    return (
      <div id="nav">
        <div className="container">
          <Link to="/" id="nav-logo">
            <img src="/images/takapic-logo/CL h small.png" alt="" />
          </Link>
          <div id="nav-menu">
            <i className="fa fa-bars" />
            <div>
              <Link to="/photographer-registration/s1">
                Become Our Photographer
              </Link>
              <Link to="/how-it-works">How It Works</Link>
              <Link to="/help">Help</Link>
              {signInButton}
            </div>
          </div>
          <div id="nav-search" className="search-toggle">
            <i className="fa fa-search" />
            <input type="text" placeholder="Anywhere, Anytime" />
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Header);
