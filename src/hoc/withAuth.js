import React from 'react';
import auth from 'services/auth';

export default WrappedComponent => props => (
  <WrappedComponent {...props} auth={auth} />
);
