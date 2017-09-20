import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import get from 'lodash/get';
import withAuth from 'hoc/withAuth';

class Header extends Component {
  render() {
    const { auth, user } = this.props;

    return (
      <div id="nav">
        <div className="container">
          <Link to="/" id="nav-logo">
            <img src="/images/takapic-logo/CL h small.png" alt="" />
          </Link>
          <div id="nav-menu">
            <i className="fa fa-bars" />
            <div>
              <Link
                to={
                  user ? (
                    '/become-our-photographer/welcome-1'
                  ) : (
                    '/photographer-registration/s1'
                  )
                }
              >
                Become Our Photographer
              </Link>
              <Link to="/how-it-works">How It Works</Link>
              <Link to="/help">Help</Link>
              {user ? (
                <Link to="/profile">
                  {get(user, 'user_metadata.name', user.name)}
                </Link>
              ) : null}
              {user ? (
                <a onClick={auth.logout}> (Sign Out)</a>
              ) : (
                <a onClick={auth.login}>Sign In</a>
              )}
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

export default compose(
  withAuth,
  connect(state => ({
    user: state.user,
  }))
)(Header);
