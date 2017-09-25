export const userSignupByEmailPasswordService = async (
  email,
  password,
  displayName,
  userType
) => {
  const requestInit = {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      email,
      password,
      displayName,
      userType,
    }),
    mode: 'cors',
  };

  try {
    const response = await fetch(
      'http://localhost:8008/api/users',
      requestInit
    );
    const responseStatus = await response.status;
    const responseData = await response.json();
    if (responseStatus === 201) {
      return {
        status: 'OK',
        message: responseData.message,
        uid: responseData.uid,
      };
    }
    return { status: 'FAILED', message: responseData.message, uid: null };
  } catch (error) {
    return { status: 'FAILED', message: error.message, uid: null };
  }
};
