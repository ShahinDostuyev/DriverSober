export const SET_USER_INFO = "SET_USER_INFO";
export const CLEAR_USER = "CLEAR_USER";
export const UPDATE_USER = 'UPDATE_USER';


export const setUserInfo = (userInfo) => ({
  type: SET_USER_INFO,
  payload: userInfo,
});

export const cleanUser = () => ({
  type: CLEAR_USER,
  payload: null,
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});
