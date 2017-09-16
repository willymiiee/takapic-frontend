import React from "react";
import t from "helper/t";
import Dropdown from "components/Dropdown";
import styled from "styled-components";
import get from "lodash/get";
import map from "lodash/fp/map";
import { connect } from "react-redux";
import api from "store/actions/api";

const avatarHeight = 42;

const ProfileDropdownToggle = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileDropdownUsername = styled.span`
  line-height: 42px;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  whites-space: nowrap;
  overflow: hidden;
  display: inline-block;
`;

const ProfileDropdownAvatar = styled.div`
  width: ${avatarHeight}px;
  height: ${avatarHeight}px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
`;

const ProfileDropdownInitial = styled.div`
  width: ${avatarHeight}px;
  height: ${avatarHeight}px;
  line-height: ${avatarHeight}px;
  background-color: #dfdfdf;
  border-radius: 50%;
  color: white;
  font-weight: bold;
`;

const getCurrentUser = props => get(props, "currentUser", {});

const ProfileDropdown = styled(props => (
  <Dropdown
    className={props.className}
    toggle={
      <ProfileDropdownToggle>
        <ProfileDropdownUsername>
          {String(getCurrentUser(props).username)
            .split(" ")
            .filter(Boolean)
            .join(" ")
            .trim() || getCurrentUser(props).email}
        </ProfileDropdownUsername>
        {getCurrentUser(props).avatar ? (
          <ProfileDropdownAvatar
            style={{
              backgroundImage: `url(${getCurrentUser(props).avatar})`
            }}
          />
        ) : (
          <ProfileDropdownInitial>
            {String(getCurrentUser(props).name)
              .split(" ")
              .filter(Boolean)
              .filter(String)
              .map(s => s[0])
              .map(s => s.toUpperCase())
              .join("")
              .trim() || String(getCurrentUser(props).email)[0]}
          </ProfileDropdownInitial>
        )}
      </ProfileDropdownToggle>
    }
  >
    {props.children}
  </Dropdown>
))`
  text-align: right;
  ul {
    text-align: left;
    padding: 0;
    margin: 0;
    > li {
      padding: 0;
      display: block;
      a {
        line-height: 42px;
        padding: 0 16px;
        display: block;
        overflow: hidden;
        text-decoration: none;
        color: inherit;
      }
    }
  }
`;
export default connect(
  state => ({
    currentUser: state.currentUser
  }),
  api
)(ProfileDropdown);
