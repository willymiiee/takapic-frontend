export const dashify = strEmail => {
  const rgxPatt = /[._@]+/g;
  return strEmail.replace(rgxPatt, '-');
};
