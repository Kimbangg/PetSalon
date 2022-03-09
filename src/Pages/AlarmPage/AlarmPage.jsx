import React from 'react';
import styled from '@emotion/styled';
import { AlarmCard } from '@/Components/AlarmCard';
import { BottomNav } from '@/Components/Common';

const AlarmPage = () => (
  <Wrapper>
    <Title>알림</Title>
    <CardContainer>
      <AlarmCard>하이님이 게시글을 좋아합니다.</AlarmCard>
      <AlarmCard>요한짱님이 댓글을 남겼습니다.</AlarmCard>
      <AlarmCard>쫑구리님이 게시글을 좋아합니다.</AlarmCard>
      <AlarmCard>쫑이님이 게시글을 좋아합니다.</AlarmCard>
      <AlarmCard>김빵님이 게시글을 좋아합니다.</AlarmCard>
      <AlarmCard>사누님이 댓글을 남겼습니다.</AlarmCard>
      <AlarmCard>송송님이 게시글을 좋아합니다.</AlarmCard>
    </CardContainer>
    <CardContainer>
      <AlarmCard>요한짱님이 댓글을 남겼습니다.</AlarmCard>
    </CardContainer>
    <CardContainer>
      <AlarmCard>쫑구리님이 게시글을 좋아합니다.</AlarmCard>
    </CardContainer>
    <CardContainer>
      <AlarmCard>쫑이님이 게시글을 좋아합니다.</AlarmCard>
    </CardContainer>
    <CardContainer>
      <AlarmCard>김빵님이 게시글을 좋아합니다.</AlarmCard>
    </CardContainer>
    <CardContainer>
      <AlarmCard>사누님이 댓글을 남겼습니다.</AlarmCard>
    </CardContainer>
    <CardContainer>
      <AlarmCard>송송님이 게시글을 좋아합니다.</AlarmCard>
    </CardContainer>
    <BottomNav />
  </Wrapper>
);

const Wrapper = styled.div`
  padding: 0 2rem;
`;

const Title = styled.div`
  font-size: 1.125rem;
  left: 2rem;
  line-height: 1.3125rem;
  text-align: left;
  top: 2rem;
  margin-top: 2rem;
`;

const CardContainer = styled.div`
  margin-top: 2rem;
`;

export default AlarmPage;
