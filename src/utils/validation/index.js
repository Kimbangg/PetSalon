/* eslint-disable no-useless-escape */
const USER_NAME_REGEX = /^[가-힣]+$/;

const EMAIL_REGEX = /^\S+@\S+\.(\S{2,})+/;

const PW_MIN_LEN = 10;

// 비밀번호는 대문자,소문자,숫자, 문자 문자 중 2종류이상의 조합으로 10자 이상으로 이루어져있어야 합니다
const PW_REGEX_RULE = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]).{10,}$/;

export const VALIDATION_ERR_MSG = {
  INVALID_USER_NAME: '이름을 바르게 입력해 주세요',
  INVALID_EMAIL: '올바른 이메일 형식이 아닙니다',
  EMPTY_EMAIL: '이메일을 입력해 주세요',
  EMPTY_PW: '비밀번호를 입력해 주세요',
  INVALID_NAME: '이름을 작성해 주세요',
  INVALID_PW: '대소문자, 숫자, 기호를 조합하여 10자 이상 사용하세요',
  INVALID_CONFIRM: '비밀번호가 서로 다릅니다',
};

export const VALIDATION_ALERT_MSG = {
  NEED_EMAIL_AUTH: '이메일 인증을 해주세요',
  DUPLICATED_EMAIL: '이미 존재하는 이메일입니다.',
  WELL_FORMED_EMAIL: '사용 하셔도 좋습니다',
  FAIL_SIGN_UP: '회원가입에 실패 하였습니다.',
  FAIL_SIGN_IN: '이메일 또는 비밀번호를 확인해주세요.',
};

export const validateUserName = username => USER_NAME_REGEX.test(username);

export const validateEmail = email => EMAIL_REGEX.test(email);

export const validatePassword = password =>
  password.length >= PW_MIN_LEN && PW_REGEX_RULE.test(password);
