import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { AuthorProfile, HiddenHeading } from '@/Components/Common';
import calcElapsedTime from '@/utils/calcElapsedTime';

const Comment = ({
  comment,
  id,
  userId,
  image,
  fullName,
  createdAt,
  onClick,
}) => {
  const elapsedTime = useMemo(
    () => calcElapsedTime({ createdAt }),
    [createdAt],
  );

  return (
    <Article>
      <HiddenHeading level={3}>댓글</HiddenHeading>
      <ArticleHeader>
        <AuthorProfile
          imageSize="1.5rem"
          nameFontSize="0.75rem"
          timeFontSize="0.5rem"
          wholeSize="small"
          image={image}
          userId={userId}
          fullName={fullName}
          elapsedTime={elapsedTime}
        />
      </ArticleHeader>
      <Paragraph>
        {comment}
        <DeleteButton id={id} onClick={onClick}>
          삭제
        </DeleteButton>
      </Paragraph>
    </Article>
  );
};

export default Comment;

Comment.defaultProps = {
  id: '',
  comment: '',
  userId: '',
  image: '',
  fullName: '',
  createdAt: '',
  onClick: () => {},
};

Comment.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  comment: PropTypes.string,
  userId: PropTypes.string,
  fullName: PropTypes.string,
  createdAt: PropTypes.string,
  onClick: PropTypes.func,
};

const Article = styled.article`
  background-color: #f5f5f5;
  border-radius: 1rem;
  box-sizing: border-box; /* temp */
  filter: drop-shadow(0 0.125rem 0.25rem rgba(0, 0, 0, 0.24));
  font-size: 0.75rem;
  margin: 0.5rem 0;
  padding: 0.75rem;
  width: 100%;
`;

const ArticleHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Paragraph = styled.p`
  margin: 0;
  padding-top: 0.75rem;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: 0;
  color: #c4c4c4;
  font-size: 0.75rem;
  font-weight: bold;
`;
