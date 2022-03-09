import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { Header, Input, Button } from '@/Components/Common';
import useLoginInput from '@/hooks/useLoginInput';
import { postLoginInfo } from '@/apis/auth';
import { VALIDATION_ERR_MSG, validateEmail } from '@/utils/validation';

const initialState = {
  email: '',
  password: '',
};

const SigninPage = () => {
  const { PUBLIC_URL } = process.env;
  const MainLogoImage = `${PUBLIC_URL}/mainLogo.png`;

  const { errors, handleChange, handleSubmit } = useLoginInput({
    initialState,
    onSubmit: async ({ email, password }) => {
      try {
        const response = await postLoginInfo({ email, password });

        return response;
      } catch (error) {
        return error;
      }
    },
    validate: ({ email, password }) => {
      const newErrors = {};

      if (!validateEmail(email)) {
        newErrors.email = VALIDATION_ERR_MSG.INVALID_EMAIL;
      }

      if (!email.length) {
        newErrors.email = VALIDATION_ERR_MSG.EMPTY_EMAIL;
      }

      if (!password) {
        newErrors.password = VALIDATION_ERR_MSG.EMPTY_PW;
      }

      return newErrors;
    },
  });

  return (
    <Wrapper>
      <Header />
      <InnerWrapper>
        <LogoWrapper>
          <MainLogo src={MainLogoImage} alt="로고" />
        </LogoWrapper>
        <InputsWrapper>
          <Input id="email" type="email" onChange={handleChange}>
            이메일
          </Input>
          {errors.email && <ErrorSpan>{errors.email}</ErrorSpan>}
          <Input
            id="password"
            top="1rem"
            type="password"
            onChange={handleChange}
          >
            비밀번호
          </Input>
          {errors.password && <ErrorSpan>{errors.password}</ErrorSpan>}
        </InputsWrapper>
        <ButtonWrapper>
          <Button onClick={handleSubmit}>완료</Button>
        </ButtonWrapper>
        <EntireSpanWrapper>
          <SpanWrapper>
            <Link to="/edit/password">
              <StyledSpan>비밀번호 재설정</StyledSpan>
            </Link>
          </SpanWrapper>
          <SpanWrapper>
            <Link to="/signup">
              <StyledSpan>회원가입</StyledSpan>
            </Link>
          </SpanWrapper>
        </EntireSpanWrapper>
      </InnerWrapper>
    </Wrapper>
  );
};

export default SigninPage;

const Wrapper = styled.div``;

const InnerWrapper = styled.div`
  padding-top: 3.5rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const MainLogo = styled.img`
  display: flex;
  height: 7.5rem;
  margin-top: 3.25rem;
  width: 7.5rem;
`;

const InputsWrapper = styled.div`
  margin: 3.25rem 1.25rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 1rem;
`;

const ErrorSpan = styled.p`
  width: 100%;
  text-align: center;
  color: #b00020;
  padding-top: 10px;
`;

const EntireSpanWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.75rem;
  padding-left: 1rem;
`;

const SpanWrapper = styled.div``;

const StyledSpan = styled.span`
  color: black;
  padding-right: 2rem;
  cursor: pointer;
`;
