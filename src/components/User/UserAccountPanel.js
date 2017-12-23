import React from 'react';
import { NavLink } from 'react-router-dom';

const UserAccountPanel = (props) => {
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
              <a href="#">Profile manager</a>
            </li>

            <li>
              <a href="#">Photo album</a>
            </li>

            <li>
              <a href="#">Cash out</a>
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

export default UserAccountPanel;
