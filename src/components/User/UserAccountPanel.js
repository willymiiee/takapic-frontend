import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { USER_PHOTOGRAPHER } from "../../services/userTypes";

const UserAccountPanel = (props) => {
  return (
    <div>
      <div className="padding-bottom-30"/>
      <div className="container">
        <nav className="user-account-panel-menubar">
          <ul>
            <li>
              <NavLink
                to="/me/reservations"
                activeClassName="user-account-panel-menubar-item-active"
              >
                Reservations
              </NavLink>
            </li>

            <li>
              <NavLink
                to={props.userType === USER_PHOTOGRAPHER ? '/me/edit/photographer' : '/me/reservations'}
              >
                Profile manager
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/me/reservations"
              >
                Photo album
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/me/reservations"
              >
                Cash out
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container">
        <div className="feature-container">
          { props.children }
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({ userType: state.userAuth.userMetadata.userType })
)(UserAccountPanel);
