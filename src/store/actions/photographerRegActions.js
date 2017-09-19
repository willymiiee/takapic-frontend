/*export const sendPhotographerRegistration = async (data) => {
  const userData = {
    client_id: 'zbQbMQuebPNi45I71U08vvdpcjHIeSbk',
    email: data.email,
    password: data.password,
    user_medata: {
      complete_name: data.complete_name
    }
  };

  const headersSettings = new Headers({
    'Content-Type': 'application/json'
  });

  const requestOptions = {
    method: 'POST',
    headers: headersSettings,
    mode: 'cors',
    body: JSON.stringify(userData)
  };

  try {
    const result = await fetch('https://takapic.au.auth0.com/dbconnections/signup', requestOptions);
    const something1 = await result.json();
    return something1;
  } catch (e) {
    return new Error(e.message);
  }
};*/

export const nextStepHandle = currentStepState => ({
  type: 'POPULATE_PHOTOGRAPHER_ACCOUNT_DATA',
  payload: currentStepState,
});

/*export const submitPhotographerRegistration = data => {
  return dispatch => {
    dispatch({type: 'PHOTOGRAPHER_REGISTRATION_DATA_SUBMIT_LOADING'});
    sendPhotographerRegistration(data)
      .then(result => {
        dispatch({
          type: 'PHOTOGRAPHER_REGISTRATION_DATA_SUBMIT_SUCCESS',
          payload: result
        });
      },error => {
        dispatch({
          type: 'PHOTOGRAPHER_REGISTRATION_DATA_SUBMIT_ERROR',
          payload: error
        });
      });
  }
};*/
