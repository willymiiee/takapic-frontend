import axios from 'axios';
import queryString from "query-string";

export const tellThemThatWasSuccessOrFailed = (whatsup) => {
  return dispatch => {
    dispatch({
      type: 'PROFILE_MANAGER_TELL_THEM_THAT_WAS_SUCCESS_OR_FAILED',
      payload: whatsup
    });
  };
};

export const fetchPhotographerServiceInformation = (uid) => {
  return dispatch => {
    dispatch({ type: 'FETCH_PHOTOGRAPHER_SERVICE_INFORMATION_LOADING' });
    axios
      .get(`${process.env.REACT_APP_API_HOSTNAME}/api/photographers/${uid}`)
      .then(response => {
        dispatch({
          type: 'FETCH_PHOTOGRAPHER_SERVICE_INFORMATION_SUCCESS',
          payload: response.data.data,
        });
      })
      .catch(error => {
        console.log(error.message);
      });
  };
};

export const resetPhotographerServiceInformationData = () => {
  return dispatch => {
    dispatch({ type: 'FETCH_PHOTOGRAPHER_SERVICE_INFORMATION_DATA_RESET' })
  };
};

export const fetchPhotographerListings = searchInfo => {
  return dispatch => {
    let { destination, date } = queryString.parse(searchInfo);
    const queryParams = `filter[destination]=${destination}&filter[date]=${date}`;

    dispatch({ type: 'FETCH_PHOTOGRAPHERS_LISTING_START' });

    axios
      .get(`${process.env.REACT_APP_API_HOSTNAME}/api/photographers/?${queryParams}`)
      .then(response => {
        dispatch({
          type: 'FETCH_PHOTOGRAPHERS_LISTING_SUCCESS',
          payload: response.data.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const resetListings = () => {
  return dispatch => {
    dispatch({ type: 'EMPTY_PHOTOGRAPHER_LISTINGS' });
  };
};
