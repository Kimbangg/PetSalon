/* eslint-disable no-console */
import axios from 'axios';
import { instance, getCookie } from './token';

const { REACT_APP_API_END_POINT } = process.env;

export const getUserInfo = async ({ _id }) => {
  try {
    const result = await axios({
      method: 'get',
      url: `${REACT_APP_API_END_POINT}/users/${_id}`,
    });

    if (result.status >= 400) {
      throw new Error('API 호출에 실패 했습니다.');
    }

    return result.data;
  } catch (error) {
    return error;
  }
};

export const putUserInfo = async ({ userInfo }) => {
  try {
    instance.defaults.headers.common.Authorization = getCookie('Authorization');

    const result = await axios({
      headers: {
        Authorization: `bearer ${instance.defaults.headers.common.Authorization}`,
      },
      method: 'put',
      url: `${REACT_APP_API_END_POINT}/settings/update-user`,
      data: userInfo,
    });

    if (result.status >= 400) {
      throw new Error('API 호출에 실패 하였습니다.');
    }

    return result;
  } catch (error) {
    return error;
  }
};

export const postImageData = async ({ file }) => {
  const postFormData = new FormData();
  postFormData.append('isCover', false);
  postFormData.append('image', file);

  try {
    instance.defaults.headers.common.Authorization = getCookie('Authorization');
    const result = await axios({
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${instance.defaults.headers.common.Authorization}`,
      },
      method: 'post',
      url: `${REACT_APP_API_END_POINT}/users/upload-photo`,
      data: postFormData,
    });

    if (result.status >= 400) {
      throw new Error('API 호출에 실패 하였습니다.');
    }

    return result;
  } catch (error) {
    return error;
  }
};
