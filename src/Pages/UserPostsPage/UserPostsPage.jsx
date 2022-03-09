import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { Header, BottomNav, AuthorProfile } from '@/Components/Common';
import { Post } from '@/Components/Post';
import { getUserInfo } from '@/apis/userInfo';
import { getUserPosts, deletePost } from '@/apis/post';
import { getCookie } from '@/apis/token';

const UserPostsPage = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userPosts, setUserPosts] = useState([]);

  const getUserInfoAsync = useCallback(async () => {
    const { fullName, image } = await getUserInfo({ _id: userId });
    setUserName(fullName);
    setUserImage(image);
  }, [userId]);

  const getUserPostsAsync = useCallback(async () => {
    const userPostsData = await getUserPosts({ userId });
    setUserPosts(userPostsData);
  }, [userId]);

  const handleDeleteClick = async e => {
    const { dataset } = e.target.closest('article');
    const { author: AuthorId } = dataset;
    const { post: postId } = dataset;
    const currentUserId = getCookie('_id');
    if (window.confirm('해당 게시글을 삭제하시겠습니꺄?')) {
      if (currentUserId !== AuthorId) {
        alert('내 게시글만 삭제할 수 있습니다.');
        return;
      }
      await deletePost(postId);
      getUserPostsAsync();
    }
  };

  useEffect(() => {
    try {
      getUserInfoAsync();
      getUserPostsAsync();
    } catch (error) {
      alert('다시 시도해 주세요.');
    }
  }, [userId]);

  return (
    <Wrapper>
      <Header />
      <AuthorProfile
        imageSize="3rem"
        nameFontSize="1rem"
        timeFontSize="0.75rem"
        wholeSize="large"
        userId={userId}
        fullName={userName}
        image={userImage}
      />
      {userPosts &&
        userPosts.map(({ _id, author, image, title, likes, comments }) => (
          <Post
            key={_id}
            postid={_id}
            userId={author['_id']}
            image={image}
            content={title}
            likes={likes}
            comments={comments}
            handleDeleteClick={handleDeleteClick}
          />
        ))}
      <BottomNav />
    </Wrapper>
  );
};

export default UserPostsPage;

const Wrapper = styled.div`
  padding: 4.25rem 0.75rem 4.5rem 0.75rem;
`;
