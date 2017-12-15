import React from 'react';
import Hashids from 'hashids';

export const generateReservationNumber = (userUID) => {
  const tsStr = Math.floor(Date.now()).toString(10);
  const last3NumberStr = tsStr.substr(-3, tsStr.length);
  const last3NumberArrList = last3NumberStr.split("").map(Number);
  const salt = userUID + tsStr;
  const hashidsObj = new Hashids(salt, 8, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890");
  return hashidsObj.encode(last3NumberArrList).toUpperCase();
};

export const nl2br = str => {
  return str.split('\n').map((item, key) => {
    return (
      <span key={key}>{ item }<br /></span>
    );
  });
};
