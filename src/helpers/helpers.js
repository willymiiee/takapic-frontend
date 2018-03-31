import React from 'react';
import Hashids from 'hashids';
import classnames from "classnames";

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

export const JsonToUrlEncoded = (element, key, list) => {
  let newList = list || [];
  if (typeof(element) === 'object'){
    for (let idx in element) {
      JsonToUrlEncoded(element[idx], key ? key + '['+idx+']' : idx, newList);
    }
  } else {
    newList.push(key+'='+encodeURIComponent(element));
  }
  return newList.join('&');
};

export const reactSelectNewOptionCreator = ({ label, labelKey, valueKey }) => {
  const show = !label;
  const option = {};
  option[valueKey] = label;
  option[labelKey] = label;
  option.className = classnames(
    'Select-create-option-placeholder',
    { 'react-select-hide-placeholder': show }
  );
  return option;
};

export const emailNotificationEndpoint = () => `${process.env.REACT_APP_API_HOSTNAME}/api/email-service/email-notifications`;
