/* eslint-disable no-unused-vars */
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HiddenHeading from '@/Components/Common/HiddenHeading';

const PostPreview = ({ postid, content, image, fullName }) => (
  <Article>
    <HiddenHeading level={4}>미리보기</HiddenHeading>
    <Link to={`/post/${postid}`}>
      <ContentWrapper>
        <ImageWrapper>
          <Image src={image} alt="미리보기 이미지" />
        </ImageWrapper>
        <TextWrapper>
          <UserName>{fullName}</UserName>
          <Paragraph>{content}</Paragraph>
        </TextWrapper>
      </ContentWrapper>
    </Link>
  </Article>
);

export default PostPreview;

PostPreview.defaultProps = {
  postid: '',
  content: '',
  image: '',
  fullName: '',
};

PostPreview.propTypes = {
  postid: PropTypes.string,
  content: PropTypes.string,
  image: PropTypes.string,
  fullName: PropTypes.string,
};

const Article = styled.article`
  background-color: #fff;
  border-radius: 1rem;
  box-sizing: border-box; /* temp */
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.24));
  padding: 1.25rem 1.25rem;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ImageWrapper = styled.div`
  border-radius: 1rem;
  height: 6rem;
  width: 6rem;
  margin-bottom: 0.3rem;
  border: 2px solid #f5f5f5;
  margin-right: 1rem;
`;

const Image = styled.img`
  border-radius: 1rem;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  position: relative;
`;

const UserName = styled.div`
  position: absolute;
  left: 0;
  text-align: center;
  letter-spacing: 0.1rem;
  font-size: 0.75rem;
  font-weight: bold;
  color: #e9bd15;
`;

const Paragraph = styled.p`
  display: flex;
  align-items: center;
  line-height: 1rem;
  height: 5rem;
  width: 100%;
  font-size: 0.9rem;
  word-break: break-all;
  text-align: center;
`;
