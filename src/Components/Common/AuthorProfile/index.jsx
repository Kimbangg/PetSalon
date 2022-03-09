import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const AuthorProfile = ({
  imageSize,
  nameFontSize,
  timeFontSize,
  wholeSize,
  userId,
  fullName,
  image,
  elapsedTime,
}) => {
  const { PUBLIC_URL } = process.env;
  const defaultProfileImage = `${PUBLIC_URL}/images/defaultProfile.jpeg`;

  return (
    <Link to={`/posts/${userId}`}>
      <Wrapper>
        <Image
          imageSize={imageSize}
          wholeSize={wholeSize}
          src={image || defaultProfileImage}
          alt="프로필"
        />
        <TextWrapper wholeSize={wholeSize}>
          <Name nameFontSize={nameFontSize}>{fullName}</Name>
          <PostedAt timeFontSize={timeFontSize}>{elapsedTime}</PostedAt>
        </TextWrapper>
      </Wrapper>
    </Link>
  );
};

export default AuthorProfile;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
`;

const Image = styled.img`
  border-radius: 50%;
  height: ${({ imageSize }) => imageSize};
  margin-right: ${({ wholeSize }) =>
    wholeSize === 'small' ? '0.25rem' : '0.75rem'};
  width: ${({ imageSize }) => imageSize};
  border: 2px solid #f5f5f5;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  align-items: ${({ wholeSize }) =>
    wholeSize === 'small' ? 'center' : 'start'};
  display: flex;
  flex-direction: ${({ wholeSize }) =>
    wholeSize === 'small' ? 'row' : 'column'};
  justify-content: left;
`;

const Name = styled.span`
  font-size: ${({ nameFontSize }) => nameFontSize};
  margin-right: 0.5rem;
`;

const PostedAt = styled.span`
  font-size: ${({ timeFontSize }) => timeFontSize};
`;

AuthorProfile.defaultProps = {
  imageSize: '1.5rem',
  nameFontSize: '0.75rem',
  timeFontSize: '0.5rem',
  wholeSize: 'small',
  userId: '',
  fullName: '',
  image: '',
  elapsedTime: '',
};

AuthorProfile.propTypes = {
  imageSize: PropTypes.string,
  nameFontSize: PropTypes.string,
  timeFontSize: PropTypes.string,
  wholeSize: PropTypes.string,
  userId: PropTypes.string,
  fullName: PropTypes.string,
  image: PropTypes.string,
  elapsedTime: PropTypes.string,
};
