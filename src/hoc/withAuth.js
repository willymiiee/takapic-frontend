import React from "react";
import Auth from "services/auth";

const auth = new Auth();

export default WrappedComponent => props => (
  <WrappedComponent {...props} auth={auth} />
);
