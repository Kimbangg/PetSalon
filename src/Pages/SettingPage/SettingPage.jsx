import React from 'react';
import styled from '@emotion/styled';
import { Link, useHistory } from 'react-router-dom';
import { Header, Button, Text } from '@/Components/Common';
import { postLogout } from '@/apis/auth';
import { LogoutJwt, getId } from '@/apis/token';

const handleInput = async () => {
  await postLogout();
  LogoutJwt();
  window.location.replace('/');
};

const Setting = () => {
  const history = useHistory();
  const _id = getId();

  return (
    <Wrapper>
      <Header />
      <InnerWrapper>
        <Article>
          <Text size="normal">내 정보</Text>
          <Link to={`/posts/${_id}`}>
            <SpanWrapper>
              <StyledSpan>내 게시물</StyledSpan>
            </SpanWrapper>
          </Link>
          <Link to="/edit/info">
            <SpanWrapper>
              <StyledSpan>프로필 변경</StyledSpan>
            </SpanWrapper>
          </Link>
        </Article>
        <Article>
          <Text size="normal">고객 문의</Text>
          <SpanWrapper>
            <StyledSpan>문의 메일 보내기</StyledSpan>
          </SpanWrapper>
        </Article>
        <Article>
          <Text size="normal">앱 정보</Text>
          <SpanWrapper>
            <StyledSpan>버전 정보</StyledSpan>
            <StyledSpan>이용 약관</StyledSpan>
            <StyledSpan>개인정보 취급 방침</StyledSpan>
            <StyledSpan>오픈소스 이용 약관</StyledSpan>
          </SpanWrapper>
        </Article>
        <Button
          backgroundColor="#fff"
          color="black"
          onClick={() => handleInput(history)}
        >
          로그아웃
        </Button>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Setting;

const Wrapper = styled.div``;

const InnerWrapper = styled.div`
  padding-top: 4rem;
`;

const Article = styled.div`
  margin: 1.5rem 0;

  .Text--size-normal {
    padding-left: 1rem;
  }
`;

const SpanWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  margin-left: 1.5rem;
  margin-top: 0.5rem;
  width: 80%;
`;

const StyledSpan = styled.span`
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  height: 3.25rem;
  width: 100%;
`;
