import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { NavLink } from 'react-router-dom';
import { USER_PHOTOGRAPHER } from "../../services/userTypes";

const UserAccountPanel = (props) => {
  const userType = get(props, 'user.userMetadata.userType', null);
  return (
    <div>
      <div className="padding-bottom-30"/>
      <div className="container">
        <nav className="user-account-panel-menubar">
          <ul className="smooth-card padding-0">
            <li>
              <NavLink
                to="/me/reservations"
                activeClassName="user-account-panel-menubar-item-active"
              >
                Reservations
              </NavLink>
            </li>

            <li>
              {
                userType && (
                  <NavLink
                    to={userType === USER_PHOTOGRAPHER ? '/me/edit/photographer' : '/me/reservations'}
                  >
                    Profile manager
                  </NavLink>
                )
              }
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
        <div className="feature-container smooth-card radius-0">
          { props.children }
        </div>
      </div>
    </div>
  );
};

export default connect(
  state => ({ user: state.userAuth })
)(UserAccountPanel);
