import React from 'react';
import styled from '@emotion/styled';
import { Button, Input, Text, Header } from '@/Components/Common';
import useResetPassword from '@/hooks/useResetPassword';
import { validatePassword, VALIDATION_ERR_MSG } from '@/utils/validation';
import { putWithJwt } from '@/apis/token';

const initialState = {
  password: '',
  passwordChecker: '',
};

const ResetPassword = () => {
  const { errors, userInputs, handleChange, handleSubmit } = useResetPassword({
    initialState,
    onSubmit: async ({ password }) => {
      try {
        const url = '/settings/update-password';
        const data = {
          password,
        };
        const res = await putWithJwt({ url, data });
        return res;
      } catch (error) {
        return error;
      }
    },
    validate: ({ password, passwordChecker }) => {
      const newErrors = {};

      if (!validatePassword(password)) {
        newErrors.password = VALIDATION_ERR_MSG.INVALID_PW;
      }

      if (password !== passwordChecker) {
        newErrors.passwordChecker = VALIDATION_ERR_MSG.INVALID_CONFIRM;
      }

      return newErrors;
    },
  });

  const { password, passwordChecker } = userInputs;

  const isDisabled = !!Object.keys(errors).length;

  return (
    <Wrapper>
      <Header />
      <InnerWrapper>
        <Text size="large" strong>
          비밀번호를 재설정 해주세요
        </Text>
        <form>
          <InputsWrapper>
            <Input
              id="password"
              type="password"
              placeholder="새로운 비밀번호를 입력해 주세요"
              top="2rem"
              onChange={handleChange}
            >
              비밀번호
            </Input>
            {password && errors.password && (
              <ErrorSpan>{errors.password}</ErrorSpan>
            )}
            <Input
              id="passwordChecker"
              type="password"
              placeholder="비밀번호를 다시 한 번 입력해 주세요."
              top="2rem"
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
              비밀번호 재설정
            </Button>
          </ButtonWrapper>
        </form>
      </InnerWrapper>
    </Wrapper>
  );
};
export default ResetPassword;

const Wrapper = styled.div``;

const InnerWrapper = styled.div`
  text-align: center;
  padding-top: 3.625rem;

  .Text--size-large {
    margin-top: 3.75rem;
  }
`;

const InputsWrapper = styled.div`
  margin: 4.5rem 1.25rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.75rem;
  padding: 0 1rem;
`;

const ErrorSpan = styled.p`
  width: 100%;
  text-align: center;
  color: #b00020;
  padding-top: 10px;
`;
