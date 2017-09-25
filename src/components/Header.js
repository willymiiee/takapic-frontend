import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loggingOut } from '../store/actions/userActions';

class Header extends Component {
  render() {
    const { user } = this.props;

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
                  user.data ? (
                    '/become-our-photographer/welcome-1'
                  ) : (
                    '/photographer-registration/s1'
                  )
                }
              >
                Become our photographer
              </Link>
              <Link to="/traveller-sign-up">Traveller sign up</Link>
              <Link to="/how-it-works">How it works</Link>
              <Link to="/help">Help</Link>
              {this.props.user.data ? (
                <Link to="/user/1">[ {this.props.user.data.displayName} ]</Link>
              ) : (
                <Link to="/sign-in">Sign in</Link>
              )}
              {this.props.user.data ? (
                <a onClick={this.props.logout}>Sign out</a>
              ) : null}
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

export default connect(
  state => ({
    user: state.userAuth,
  }),
  dispatch => ({
    logout: () => dispatch(loggingOut()),
  })
)(Header);
