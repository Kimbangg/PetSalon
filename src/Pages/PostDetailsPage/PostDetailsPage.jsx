import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import { useParams, useHistory } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { AuthorProfile, Header, BottomNav } from '@/Components/Common';
import { Post } from '@/Components/Post';
import { Comment } from '@/Components/Comment';
import {
  getPostDetails,
  createComment,
  deleteComment,
  deletePost,
  createLike,
  deleteLike,
} from '@/apis/post';
import { getUserInfo } from '@/apis/userInfo';
import calcElapsedTime from '@/utils/calcElapsedTime';
import { checkCookie, getCookie } from '@/apis/token';
import useForm from '@/hooks/useForm';
import { POST_AUTH_ALERT_MSG } from '@/utils/constants/';

const PostDetailsPage = () => {
  const history = useHistory();
  const initialState = {
    likes: [],
    comments: [],
    _id: '',
    title: '',
    image: '',
    author: {
      _id: '',
      fullName: '',
    },
    createdAt: '',
  };
  const [details, setDetails] = useState(initialState);
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState('');
  const isAuthenticated = checkCookie();
  const { postId } = useParams();

  const getPostDetailsAsync = useCallback(async () => {
    const postDetailsData = await getPostDetails({ postId });
    setDetails(postDetailsData);
  }, [postId]);

  useEffect(() => {
    const setInitialLikedState = async () => {
      try {
        await getPostDetailsAsync();

        const checkUserHasLiked = async () => {
          const userId = getCookie('_id');

          if (!userId) {
            return;
          }

          const { likes: userLikeList } = await getUserInfo({ _id: userId });
          const userLikeIndex = userLikeList.findIndex(
            ({ post }) => post === postId,
          );
          const userHasLiked = userLikeIndex > -1;
          setLikeId(userHasLiked ? userLikeList[userLikeIndex]['_id'] : '');

          return userHasLiked;
        };

        const userHasLiked = await checkUserHasLiked();
        if (userHasLiked) {
          setIsLiked(true);
          return;
        }
        setIsLiked(false);
      } catch (error) {
        alert(POST_AUTH_ALERT_MSG.TRY_AGAIN);
      }
    };

    setInitialLikedState();
  }, [postId, isLiked]);

  const elapsedTime = useMemo(() => {
    const { createdAt } = details;
    return calcElapsedTime({ createdAt });
  }, [details]);

  const handleCommentSubmit = useCallback(
    async ({ comment }) => {
      const res = await createComment({
        comment,
        postId: details._id,
      });
      setDetails({
        ...details,
        comments: [...details.comments, res],
      });
    },
    [details.comments],
  );

  const handleDeleteButton = useCallback(
    async e => {
      const { id } = e.target;
      if (!isAuthenticated) {
        alert(POST_AUTH_ALERT_MSG.NO_AUTH);
        return;
      }

      const userId = getCookie('_id');

      if (!userId) {
        return;
      }

      const userComments = await getUserInfo({ _id: userId });
      if (userComments.comments.includes(id)) {
        deleteComment(id);
      } else {
        alert(POST_AUTH_ALERT_MSG.NO_MATCH_COMMENT_AUTHOR);
        return;
      }
      const newComments = details.comments.filter(item => item._id !== id);
      setDetails({
        ...details,
        comments: newComments,
      });
    },
    [details.comments],
  );

  const handleLikeClick = async () => {
    if (isLiked) {
      await deleteLike(likeId);
      setIsLiked(false);
      setLikeId('');
    } else {
      const { _id } = await createLike(postId);
      setIsLiked(true);
      setLikeId(_id);
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm(POST_AUTH_ALERT_MSG.CONFIRM_DELETE)) {
      if (getCookie('_id') !== details.author._id) {
        alert(POST_AUTH_ALERT_MSG.NO_MATCH_POST_AUTHOR);
        return;
      }
      await deletePost(postId);
      history.replace('/');
    }
  };

  const { handleSubmit, handleClick, handleTextChange, formData } = useForm({
    initialValues: '',
    onSubmit: handleCommentSubmit,
    onDelete: handleDeleteButton,
  });

  return (
    <Wrapper>
      <Header />
      <AuthorProfile
        imageSize="3rem"
        nameFontSize="1rem"
        timeFontSize="0.75rem"
        wholeSize="large"
        userId={details.author._id}
        fullName={details.author.fullName}
        image={details.author.image}
        elapsedTime={elapsedTime}
      />
      <Post
        postid={details._id}
        image={details.image}
        content={details.title}
        likes={details.likes}
        comments={details.comments}
        userId={details.author._id}
        handleDeleteClick={handleDeleteClick}
        onLikeClick={handleLikeClick}
        isLiked={isLiked}
      />
      {details.comments.map(({ _id, comment, author, createdAt }) => (
        <Comment
          key={_id}
          comment={comment}
          id={_id}
          isAuth={isAuthenticated}
          userId={author._id}
          image={author.image}
          fullName={author.fullName}
          createdAt={createdAt}
          onClick={handleClick}
        />
      ))}
      <CommentInput>
        <form onSubmit={handleSubmit}>
          <StyledInput
            onChange={handleTextChange}
            name="comment"
            value={formData.comment}
            disabled={!isAuthenticated}
            placeholder={
              !isAuthenticated
                ? '댓글을 작성하려면 로그인이 필요해요!'
                : '여기에 댓글을 작성할 수 있어요!'
            }
          />
          <button type="submit">
            <SubmitIcon />
          </button>
        </form>
      </CommentInput>
      <BottomNav />
    </Wrapper>
  );
};

export default PostDetailsPage;

const Wrapper = styled.div`
  padding: 4.25rem 0.75rem 4.5rem 0.75rem;
`;

const CommentInput = styled.div`
  margin-top: 1rem;
  width: 100%;
  height: 2rem;
  background-color: #f5f5f5;
  border-radius: 1rem;
  position: relative;
`;

const StyledInput = styled.input`
  background-color: #f5f5f5;
  border-radius: 1rem;
  display: block;
  font-size: 0.8rem;
  height: 3rem;
  padding: 0.25rem 0.5rem;
  width: 100%;
`;

const SubmitIcon = styled(ArrowForwardIosIcon)`
  color: #c4c4c4;
  position: absolute;
  right: 0.5rem;
  top: 0.8rem;
`;
