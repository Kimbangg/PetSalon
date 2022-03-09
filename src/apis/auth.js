/* eslint-disable no-console */
/* eslint no-useless-catch: "error" */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */

import axios from 'axios';

const { REACT_APP_API_END_POINT } = process.env;

export const postLoginInfo = async ({ email, password }) => {
  const loginInfo = JSON.stringify({
    email,
    password,
  });

  try {
    const result = await axios({
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      method: 'post',
      url: `${REACT_APP_API_END_POINT}/login`,
      data: loginInfo,
    });

    if (result.status >= 400) {
      throw new Error('API 호출에 실패 하였습니다.');
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postLogout = async () => {
  try {
    const result = await axios({
      method: 'post',
      url: `${REACT_APP_API_END_POINT}/logout`,
    });

    if (result.status >= 400) {
      throw new Error('로그아웃에 실패 하였습니다.');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUsersInfo = async () => {
  try {
    const result = await axios({
      method: 'get',
      url: `${REACT_APP_API_END_POINT}/users/get-users`,
    });

    if (result.status >= 400) {
      throw new Error('API 호출에 실패 하였습니다.');
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postSignupInfo = async ({ email, username, password }) => {
  const userInfo = JSON.stringify({
    email,
    fullName: username,
    password,
  });

  try {
    const result = await axios({
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      method: 'post',
      url: `${REACT_APP_API_END_POINT}/signup`,
      data: userInfo,
    });

    if (result.status >= 400) {
      throw new Error('API 호출에 실패 하였습니다.');
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
