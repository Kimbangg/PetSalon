/* eslint-disable no-console */
import axios from 'axios';

const { REACT_APP_API_END_POINT } = process.env;

export const searchAll = async ({ keyword }) => {
  try {
    const result = await axios({
      method: 'get',
      url: `${REACT_APP_API_END_POINT}/search/all/${keyword}`,
    });

    if (result.status >= 400) {
      throw new Error('API 호출에 실패 했습니다.');
    }

    return result.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
