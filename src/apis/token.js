/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable no-useless-escape */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
import axios from 'axios';

const { REACT_APP_API_END_POINT } = process.env;

export const instance = axios.create({});

export const setCookie = (name, value, options = {}) => {
  options = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )}`;

  for (const optionKey in options) {
    updatedCookie += `; ${optionKey}`;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  }

  document.cookie = updatedCookie;
};

const tokenizeValue = key =>
  `(?:^|; )${key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`;

const getTokenizedValueFromCookie = key =>
  document.cookie.match(new RegExp(tokenizeValue(key)));

export const getCookie = key => {
  const value = getTokenizedValueFromCookie(key);
  return value ? decodeURIComponent(value[1]) : null;
};

export const deleteCookie = name => {
  setCookie(name, '', {
    'max-age': -1,
  });
};

export const checkCookie = () => {
  if (getCookie('Authorization') === null) {
    return false;
  }
  return true;
};

export const setJwt = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  setCookie('Authorization', token);
};

export const setId = _id => {
  setCookie('_id', _id);
};

export const getId = () => getCookie('_id');

export const putWithJwt = async ({ url, data }) => {
  // TODO : Signin Page로 Redirect 하는 로직으로 변경
  if (!checkCookie('Authorization')) {
    return new Error('로그인 이후에 이용해 주세요.');
  }

  try {
    instance.defaults.headers.common.Authorization = getCookie('Authorization');

    const result = await axios({
      headers: {
        Authorization: `bearer ${instance.defaults.headers.common.Authorization}`,
      },
      method: 'put',
      url: `${REACT_APP_API_END_POINT}${url}`,
      data,
    });

    if (result.status >= 400) {
      throw new Error('API 호출에 실패 하였습니다.');
    }

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postWithJwt = async (url, data) => {
  if (!checkCookie('Authorization')) {
    return new Error('로그인 이후에 이용해 주세요.');
  }

  try {
    instance.defaults.headers.common.Authorization = getCookie('Authorization');
    const result = await axios({
      headers: {
        Authorization: `Bearer ${instance.defaults.headers.common.Authorization}`,
      },
      method: 'post',
      url: `${REACT_APP_API_END_POINT}${url}`,
      data,
    });

    if (result.status >= 400) {
      throw new Error('API 호출에 실패 하였습니다.');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getWithJwt = async url => {
  if (!checkCookie('Authorization')) {
    return new Error('로그인 이후에 이용해 주세요.');
  }

  try {
    instance.defaults.headers.common.Authorization = getCookie('Authorization');
    const result = await axios({
      headers: {
        Authorization: `Bearer ${instance.defaults.headers.common.Authorization}`,
      },
      method: 'put',
      url: `${REACT_APP_API_END_POINT}${url}`,
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

export const deleteWithJwt = async url => {
  if (!checkCookie('Authorization')) {
    return new Error('로그인 이후에 이용해 주세요.');
  }

  try {
    instance.defaults.headers.common.Authorization = getCookie('Authorization');
    const result = await axios({
      headers: {
        Authorization: `Bearer ${instance.defaults.headers.common.Authorization}`,
      },
      method: 'delete',
      url: `${REACT_APP_API_END_POINT}${url}`,
    });

    if (result.status >= 400) {
      throw new Error('API 호출에 실패 하였습니다.');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const LogoutJwt = () => {
  deleteCookie('Authorization');
  delete instance.defaults.headers.common.Authorization;
};
