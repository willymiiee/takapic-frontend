import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SigninContainer from './Signin/SigninContainer';

class oldHeader extends Component {
  render() {
    return (
      <div>
        <header id="header-container">
          {/*<!-- Header -->*/}
          <div id="header">
            <div className="container">
              {/*<!-- Left Side Content -->*/}
              <div className="left-side">
                {/*<!-- Logo -->*/}
                <div id="logo">
                  <Link to="/">
                    <img src="images/takapic-logo/symbol 300px.png" alt="" />
                    <img src="images/takapic-logo/logo 600px.png" alt="" />
                  </Link>
                </div>

                {/*<!-- Mobile Navigation -->*/}
                <div className="menu-responsive">
                  <i className="fa fa-reorder menu-trigger" />
                </div>

                {/*<!-- Main Navigation -->*/}
                <nav id="navigation" className="style-1">
                  <ul id="responsive">
                    <li>
                      <a>Become Our Photographer</a>
                    </li>

                    <li>
                      <a>Help</a>
                    </li>
                    {!this.props.user && (
                      <li>
                        <a
                          className="sign-in popup-with-zoom-anim"
                          href="#sign-in-dialog"
                        >
                          Sign In
                        </a>
                      </li>
                    )}
                  </ul>
                </nav>
                <div className="clearfix" />
                {/*<!-- Main Navigation / End -->*/}
              </div>
              {/*<!-- Left Side Content / End -->*/}

              {/*<!-- Sign In Popup -->*/}
              {!this.props.user && (
                <div id="sign-in-dialog" className="zoom-anim-dialog mfp-hide">
                  <SigninContainer />
                </div>
              )}
              {/*<!-- Sign In Popup / End -->*/}
            </div>
          </div>
          {/*<!-- Header / End -->*/}
        </header>
        <div className="clearfix" />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Header);
