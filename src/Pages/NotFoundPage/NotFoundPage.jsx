import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Wrapper>
    <Header>Page Not Found</Header>
    <Error>404</Error>
    <HomeLink to="/">🏡 홈으로 돌아가기</HomeLink>
  </Wrapper>
);
export default NotFound;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: #c4c4c4;
  margin-bottom: 0.5rem;
`;

const Error = styled.h1`
  font-size: 6rem;
  color: #89cff0;
  font-weight: bold;
  margin-bottom: 4rem;
`;

const HomeLink = styled(Link)`
  color: #555555;
  font-size: 1.2rem;
  font-weight: bold;
`;
