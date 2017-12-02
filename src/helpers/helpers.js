import React from 'react';

export const dashify = strEmail => {
  const rgxPatt = /[._@]+/g;
  return strEmail.replace(rgxPatt, '-');
};

export const nl2br = str => {
  return str.split('\n').map((item, key) => {
    return (
      <span key={key}>{ item }<br /></span>
    );
  });
};
