export const SET_USER_INFO = "SET_USER_INFO";
export const CLEAR_USER = "CLEAR_USER";

export const setUserInfo = (userInfo) => ({
  type: SET_USER_INFO,
  payload: userInfo,
});

export const cleanUser = () => ({
  type: CLEAR_USER,
  payload: null,
});
