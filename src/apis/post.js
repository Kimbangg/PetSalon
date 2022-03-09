/* eslint-disable no-console */
import axios from 'axios';
import { getCookie, checkCookie } from '@/apis/token';
import { POST_ALERT_MSG, POST_AUTH_ALERT_MSG } from '@/utils/constants';

export const instance = axios.create({});
const { REACT_APP_API_END_POINT, REACT_APP_CHANNEL_ID } = process.env;

export const createChannelPost = async ({ text, image }) => {
  const isImageNotExist = Object.keys(image).length === 0;

  if (isImageNotExist) {
    alert(POST_ALERT_MSG.NO_IMAGE);
    return;
  }

  const postFormData = new FormData();
  postFormData.append('title', text);
  postFormData.append('image', image.file);
  postFormData.append('channelId', REACT_APP_CHANNEL_ID);

  try {
    instance.defaults.headers.common.Authorization = getCookie('Authorization');
    const result = await axios({
      method: 'post',
      url: `${REACT_APP_API_END_POINT}/posts/create`,
      data: postFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${instance.defaults.headers.common.Authorization}`,
      },
    });

    if (result.status >= 400) {
      throw new Error(POST_AUTH_ALERT_MSG.TRY_AGAIN);
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getPostDetails = async ({ postId }) => {
  try {
    instance.defaults.headers.common.Authorization = getCookie('Authorization');
    const result = await axios({
      method: 'get',
      url: `${REACT_APP_API_END_POINT}/posts/${postId}`,
      headers: {
        Authorization: `Bearer ${instance.defaults.headers.common.Authorization}`,
      },
    });

    if (result.status >= 400) {
      throw new Error(POST_AUTH_ALERT_MSG.TRY_AGAIN);
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deletePost = async postId => {
  if (!checkCookie('Authorization')) {
    return new Error(POST_AUTH_ALERT_MSG.NO_AUTH);
  }
  try {
    instance.defaults.headers.common.Authorization = getCookie('Authorization');
    const result = await axios({
      method: 'delete',
      url: `${REACT_APP_API_END_POINT}/posts/delete`,
      data: {
        id: postId,
      },
      headers: {
        Authorization: `Bearer ${instance.defaults.headers.common.Authorization}`,
      },
    });

    if (result.status >= 400) {
      throw new Error(POST_AUTH_ALERT_MSG.TRY_AGAIN);
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePost = async ({ postId, text, image }) => {
  const postFormData = new FormData();
  postFormData.append('postId', postId);
  postFormData.append('title', text);
  postFormData.append('image', image.file);
  postFormData.append('channelId', REACT_APP_CHANNEL_ID);

  try {
    instance.defaults.headers.common.Authorization = getCookie('Authorization');
    const result = await axios({
      method: 'put',
      url: `${REACT_APP_API_END_POINT}/posts/update`,
      data: postFormData,
      headers: {
        Authorization: `Bearer ${instance.defaults.headers.common.Authorization}`,
      },
    });

    if (result.status >= 400) {
      throw new Error(POST_AUTH_ALERT_MSG.TRY_AGAIN);
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserPosts = async ({ userId }) => {
  try {
    const result = await axios({
      method: 'get',
      url: `${REACT_APP_API_END_POINT}/posts/author/${userId}`,
    });

    if (result.status >= 400) {
      throw new Error(POST_AUTH_ALERT_MSG.TRY_AGAIN);
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createComment = async ({ comment, postId }) => {
  try {
    instance.defaults.headers.common.Authorization = getCookie('Authorization');
    const result = await axios({
      method: 'post',
      url: `${REACT_APP_API_END_POINT}/comments/create`,
      headers: {
        Authorization: `Bearer ${instance.defaults.headers.common.Authorization}`,
      },
      data: {
        comment,
        postId,
      },
    });

    if (result.status >= 400) {
      throw new Error(POST_AUTH_ALERT_MSG.TRY_AGAIN);
    }

    const createdComment = result.data;
    return createdComment;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteComment = async id => {
  try {
    instance.defaults.headers.common.Authorization = getCookie('Authorization');
    const result = await axios({
      method: 'delete',
      url: `${REACT_APP_API_END_POINT}/comments/delete`,
      headers: {
        Authorization: `Bearer ${instance.defaults.headers.common.Authorization}`,
      },
      data: {
        id,
      },
    });

    if (result.status >= 400) {
      throw new Error(POST_AUTH_ALERT_MSG.TRY_AGAIN);
    }

    const deletedComment = result.data;
    return deletedComment;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createLike = async postId => {
  if (!checkCookie('Authorization')) {
    return new Error(POST_AUTH_ALERT_MSG.NO_AUTH);
  }

  try {
    instance.defaults.headers.common.Authorization = getCookie('Authorization');
    const result = await axios({
      method: 'post',
      url: `${REACT_APP_API_END_POINT}/likes/create`,
      headers: {
        Authorization: `Bearer ${instance.defaults.headers.common.Authorization}`,
      },
      data: {
        postId,
      },
    });
    if (result.status >= 400) {
      throw new Error(POST_AUTH_ALERT_MSG.TRY_AGAIN);
    }
    const createdLike = result.data;
    return createdLike;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteLike = async id => {
  if (!checkCookie('Authorization')) {
    return new Error(POST_AUTH_ALERT_MSG.NO_AUTH);
  }
  try {
    instance.defaults.headers.common.Authorization = getCookie('Authorization');
    const result = await axios({
      method: 'delete',
      url: `${REACT_APP_API_END_POINT}/likes/delete`,
      headers: {
        Authorization: `Bearer ${instance.defaults.headers.common.Authorization}`,
      },
      data: {
        id,
      },
    });

    if (result.status >= 400) {
      throw new Error(POST_AUTH_ALERT_MSG.TRY_AGAIN);
    }

    const deletedLike = result.data;
    return deletedLike;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getChannelPosts = async ({ limit }) => {
  try {
    const result = await axios({
      method: 'get',
      url: `${REACT_APP_API_END_POINT}/posts/channel/${REACT_APP_CHANNEL_ID}`,
      params: {
        limit,
      },
    });

    if (result.status >= 400) {
      throw new Error(POST_AUTH_ALERT_MSG.TRY_AGAIN);
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
