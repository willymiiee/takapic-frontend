import React from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import { NavLink } from 'react-router-dom';

const UserAccountPanel = (props) => {
  const menus = {
    "photographer": [
      {
        title: 'Reservations',
        path: '/me/reservations'
      },
      {
        title: 'Profile Manager',
        path: '/me/edit/photographer'
      },
      {
        title: 'Photo Album',
        path: '/me/albums'
      },
      {
        title: 'Cash Out',
        path: '/me/cashout'
      }
    ],
    "traveller": [
      {
        title: 'Reservations',
        path: '/me/reservations'
      },
      {
        title: 'Photo Album',
        path: '/me/albums'
      }
    ]
  };

  const userType = get(props, 'user.userMetadata.userType', null);

  return (
    <div>
      <div className="nm-pd-btm-30"/>
      <div className="container">
        <nav className="user-account-panel-menubar">
          <ul className="smooth-card padding-0 m-horizontal-scroll">
            {
              userType && menus.hasOwnProperty(userType) && menus[userType].map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    activeClassName="user-account-panel-menubar-item-active"
                  >
                    { item.title }
                  </NavLink>
                </li>
              ))
            }
          </ul>
        </nav>
      </div>

      <div className="container">
        <div className="m-noshadow feature-container smooth-card radius-0 m-padding-0" style={{paddingBottom:'50px'}}>
          { props.children }
        </div>
      </div>
    </div>
  );
};
export default connect(
  state => ({ user: state.userAuth })
)(UserAccountPanel);
