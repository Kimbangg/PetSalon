import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { PostPreview } from '@/Components/PostPreview';
import { Header, BottomNav } from '@/Components/Common';
import { getChannelPosts } from '@/apis/post';
import { API_CONNECT } from '@/utils/constants';

const MainPage = () => {
  const [channelPosts, setChannelPosts] = useState([]);
  const { PUBLIC_URL } = process.env;
  const defaultPostImage = `${PUBLIC_URL}/images/defaultPost.png`;

  const getChannelPostsAsync = async () => {
    const channelPostsData = await getChannelPosts({ limit: 10 });
    setChannelPosts(channelPostsData);
  };

  useEffect(() => {
    try {
      getChannelPostsAsync();
    } catch (error) {
      alert(API_CONNECT.FAIL);
    }
  }, []);

  return (
    <Wrapper>
      <Header />
      <Article>
        <Heading>
          귀여운 강아지 <br /> 사진을 <br /> 공유해 주세요!
        </Heading>
        <Link to="/write">
          <Button>사진 자랑하기</Button>
        </Link>
      </Article>
      <Text>리얼후기</Text>
      {channelPosts.map(({ _id, title, image, author }) => (
        <PostPreview
          key={_id}
          postid={_id}
          content={title}
          image={image || defaultPostImage}
          fullName={author.fullName}
        />
      ))}
      <BottomNav />
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled.div`
  padding: 5.5rem 2rem 4.5rem 2rem;
`;

const Article = styled.article`
  background-color: #89cff0;
  border-radius: 1rem;
  box-sizing: border-box; /* temp */
  display: flex;
  filter: drop-shadow(0 0.125rem 0.25rem rgba(0, 0, 0, 0.24));
  font-size: 1.25rem;
  height: 17.75rem;
  padding: 2rem;
  position: relative;
  padding-top: 12.5rem;
`;

const Heading = styled.h2`
  color: #fff;
  font-size: 1.5rem;
  line-height: 2.5rem;
  margin: 0;
  position: absolute;
  top: 15%;
`;

const Button = styled.div`
  background: #fff;
  border: 0;
  border-radius: 1rem;
  box-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
  color: #89cff0;
  font-size: 1.25rem;
  font-weight: bold;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  line-height: 2rem; /* temp */
  justify-content: center;
`;

const Text = styled.div`
  font-size: 1.125rem;
  margin: 2.5rem 0 1.5rem 0;
  text-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
`;
