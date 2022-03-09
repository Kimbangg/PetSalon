import React from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { Header, Button, Input, Text } from '@/Components/Common';
import useUserInput from '@/hooks/useUserInput';
import {
  validateUserName,
  validatePassword,
  validateEmail,
  VALIDATION_ERR_MSG,
} from '@/utils/validation';

import { postSignupInfo } from '@/apis/auth';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordChecker: '',
};

const SignupPage = () => {
  const history = useHistory();
  const {
    errors,
    userInputs,
    emailState,
    handleEmail,
    handleChange,
    handleSubmit,
  } = useUserInput({
    history,
    initialState,
    onSubmit: async ({ email, username, password }) => {
      const result = await postSignupInfo({ email, username, password });
      return result;
    },
    validate: ({ username, email, password, passwordChecker }) => {
      const newErrors = {};

      if (!validateUserName(username)) {
        newErrors.username = VALIDATION_ERR_MSG.INVALID_USER_NAME;
      }

      if (!validateEmail(email)) {
        newErrors.email = VALIDATION_ERR_MSG.INVALID_EMAIL;
      }

      if (!validatePassword(password)) {
        newErrors.password = VALIDATION_ERR_MSG.INVALID_PW;
      }

      if (password !== passwordChecker) {
        newErrors.passwordChecker = VALIDATION_ERR_MSG.INVALID_CONFIRM;
      }

      return newErrors;
    },
  });

  const { isAuth } = emailState;
  const { username, email, password, passwordChecker } = userInputs;
  const isDisabled = !!Object.keys(errors).length;

  return (
    <Wrapper>
      <Header />
      <InnerWrapper>
        <Text size="large" strong>
          회원가입
        </Text>
        <form>
          <InputsWrapper>
            <Input
              id="username"
              placeholder="이름을 입력해 주세요"
              top="2.2rem"
              value={username}
              type="text"
              onChange={handleChange}
              autoComplete="off"
            >
              이름
            </Input>
            {username && errors.username && (
              <ErrorSpan>{errors.username}</ErrorSpan>
            )}
            <EachInputWrapper>
              <Input
                id="email"
                placeholder="이메일을 입력해 주세요"
                top="2.2rem"
                value={email}
                type="email"
                onChange={handleChange}
              >
                이메일
              </Input>
              {isAuth ? (
                <StyledButton type="button" disabled>
                  완료 🎉
                </StyledButton>
              ) : (
                <StyledButton
                  type="button"
                  disabled={!!errors.email}
                  onClick={() => handleEmail(userInputs.email)}
                >
                  인증
                </StyledButton>
              )}
            </EachInputWrapper>
            <Input
              id="password"
              placeholder="특수 문자를 포함한 8글자 이상"
              top="2.2rem"
              value={password}
              type="password"
              onChange={handleChange}
            >
              비밀번호
            </Input>
            {password && errors.password && (
              <ErrorSpan>{errors.password}</ErrorSpan>
            )}
            <Input
              id="passwordChecker"
              placeholder="다시 한 번 입력해 주세요"
              top="2.2rem"
              value={passwordChecker}
              type="password"
              onChange={handleChange}
            >
              비밀번호 확인
            </Input>
            {passwordChecker && errors.passwordChecker && (
              <ErrorSpan>{errors.passwordChecker}</ErrorSpan>
            )}
          </InputsWrapper>
          <ButtonWrapper>
            <Button onClick={handleSubmit} isDisabled={isDisabled}>
              완료
            </Button>
          </ButtonWrapper>
        </form>
      </InnerWrapper>
    </Wrapper>
  );
};

export default SignupPage;

const Wrapper = styled.div``;

const InnerWrapper = styled.div`
  padding-top: 3.625rem;
  text-align: center;
  .Text--size-large {
    margin-top: 1.5rem;
  }
`;

const InputsWrapper = styled.div`
  margin: 0 1.25rem;
`;

const EachInputWrapper = styled.div`
  display: flex;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.75rem;
  padding: 0 1rem;
`;

const StyledButton = styled.button`
  margin-top: 3.75rem;
  margin-left: 0.75rem;
  background-color: #89cff0;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  width: 5rem;
  border-radius: 1rem;
  height: 3rem;
  cursor: pointer;

  &:disabled {
    background: #777;
  }
`;

const ErrorSpan = styled.p`
  width: 100%;
  text-align: center;
  color: #b00020;
  padding-top: 10px;
`;
