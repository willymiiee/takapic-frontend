import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SigninContainer from 'components/Signin/SigninContainer';
import { logOutUser } from '../services/user';
import { Modal } from 'react-bootstrap';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    logOutUser()
      .then(function(data) {
        console.log(data);
      })
      .catch(error => console.log(error));
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    let signInButton = null;
    if (this.props.user) {
      signInButton = <a onClick={this.logOut}>Sign Out</a>;
    } else {
      signInButton = <a onClick={this.openModal}>Sign In</a>;
    }

    return (
      <div id="nav">
        <div className="container">
          <Link to="/" id="nav-logo">
            <img src="/images/takapic-logo/CL h small.png" alt="" />
          </Link>
          <div id="nav-menu">
            <i className="fa fa-bars" />
            <div>
              <Link to="/become-our-photographer/welcome-1">
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
          {!this.props.user && (
            <Modal show={this.state.showModal} onHide={this.closeModal}>
              <Modal.Header closeButton />
              <Modal.Body>
                <SigninContainer />
              </Modal.Body>
            </Modal>
          )}
        </div>
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
