import React from 'react';
export default props => (
  <div
    {...props}
    className={[props.className, 'container'].filter(Boolean).join(' ')}
  />
);
