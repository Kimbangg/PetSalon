import React, { useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { useParams, useHistory } from 'react-router-dom';
import { Header, BottomNav, Editor } from '@/Components/Common';
import { getPostDetails, updatePost } from '@/apis/post';
import useForm from '@/hooks/useForm';
import { POST_ALERT_MSG } from '@/utils/constants';

const EditPostPage = () => {
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
  const { postId } = useParams();

  const getPostDetailsAsync = useCallback(async () => {
    const postDetailsData = await getPostDetails({ postId });
    setDetails(postDetailsData);
  }, [postId]);

  useEffect(() => {
    try {
      getPostDetailsAsync();
    } catch (error) {
      alert(POST_ALERT_MSG.TRY_AGAIN);
    }
  }, [postId]);

  const onSubmit = async values => {
    try {
      const text = values.text || details.title;
      const image = values.image || details.image;
      const updatedData = await updatePost({ postId, text, image });
      const updatedPostId = updatedData['_id'];
      history.push(`/post/${updatedPostId}`);
    } catch (error) {
      alert(POST_ALERT_MSG.TRY_AGAIN);
    }
  };

  const {
    isLoading,
    formData,
    handleTextChange,
    handleImageUpload,
    handleSubmit,
  } = useForm({
    initialValues: {},
    onSubmit,
  });

  return (
    <Wrapper>
      <Header
        handleSubmitInputs={handleSubmit}
        buttonType="edit"
        disabled={isLoading}
      />
      <Editor
        handleTextChange={handleTextChange}
        handleImageUpload={handleImageUpload}
        uploadedImage={formData.image || { url: details.image }}
        content={details.title}
      />
      <BottomNav />
    </Wrapper>
  );
};

export default EditPostPage;

const Wrapper = styled.div`
  height: 100%;
  padding: 4.8rem 0.75rem 4.9rem 0.75rem;
`;
