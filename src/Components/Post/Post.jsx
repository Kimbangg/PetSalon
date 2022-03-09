import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { Link, useHistory } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { HiddenHeading } from '@/Components/Common';
import { getCookie } from '@/apis/token';
import { POST_AUTH_ALERT_MSG } from '@/utils/constants';

const Post = ({
  postid,
  image,
  content,
  likes,
  comments,
  userId,
  onLikeClick,
  isLiked,
  handleDeleteClick,
}) => {
  const history = useHistory();
  const { PUBLIC_URL } = process.env;
  const defaultPostImage = image || `${PUBLIC_URL}/images/defaultPost.png`;

  const handleClick = async () => {
    if ((await getCookie('_id')) !== userId) {
      alert(POST_AUTH_ALERT_MSG.NO_AUTH);
      return;
    }
    history.push(`/edit/${postid}`);
  };

  return (
    <Article data-author={userId} data-post={postid}>
      <HiddenHeading level={2}>포스트</HiddenHeading>
      <Link to={`/post/${postid}`}>
        <ImageWrapper>
          <Image src={image || defaultPostImage} alt="업로드 이미지" />
        </ImageWrapper>
      </Link>
      <Paragraph>
        {content}
        <StyledDeleteIcon onClick={handleDeleteClick} />
        <button type="button" onClick={handleClick}>
          <StyledEditIcon />
        </button>
      </Paragraph>
      <ButtonContainer>
        <LikeButton id={postid} onClick={onLikeClick}>
          {isLiked ? <StyledFavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        </LikeButton>
        <LikeCounter>{likes.length}</LikeCounter>
        <CommentButton>
          <CommentOutlinedIcon />
        </CommentButton>
        <CommentCounter>{comments.length}</CommentCounter>
      </ButtonContainer>
    </Article>
  );
};

export default Post;

Post.defaultProps = {
  postid: '',
  image: '',
  content: '',
  likes: [],
  comments: [],
  onLikeClick: () => {},
  isLiked: false,
  handleDeleteClick: () => {},
};

Post.propTypes = {
  postid: PropTypes.string,
  image: PropTypes.string,
  content: PropTypes.string,
  likes: PropTypes.array,
  comments: PropTypes.array,
  userId: PropTypes.string.isRequired,
  onLikeClick: PropTypes.func,
  isLiked: PropTypes.bool,
  handleDeleteClick: PropTypes.func,
};

const Article = styled.article`
  background-color: #fff;
  border-radius: 1rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.24));
  font-size: 0.75rem;
  margin: 0.5rem 0;
  width: 100%;
  margin-bottom: 1rem;
`;

const ImageWrapper = styled.div`
  border-radius: 1rem 1rem 0 0;
  height: 20.25rem;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const Image = styled.img`
  height: auto;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
`;

const Paragraph = styled.p`
  margin: 0;
  padding: 0.75rem;
  position: relative;
`;

const ButtonContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 0 0.75rem 0.75rem 0.75rem;
`;

const LikeButton = styled.button`
  background-color: transparent;
  border: 0;
  padding: 0;
`;

const LikeCounter = styled.span`
  margin: 0 0.3rem;
`;

const CommentButton = styled.button`
  background-color: transparent;
  border: 0;
  padding: 0;
`;

const CommentCounter = styled.span`
  margin: 0 0.3rem;
`;

const StyledEditIcon = styled(EditIcon)`
  color: #c4c4c4;
  position: absolute;
  top: 1rem;
  right: 2.5rem;
`;

const StyledFavoriteIcon = styled(FavoriteIcon)`
  color: red;
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  color: #c4c4c4;
  position: absolute;
  top: 1rem;
  right: 0.5rem;
`;
