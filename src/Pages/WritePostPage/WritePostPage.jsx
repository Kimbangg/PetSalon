import React from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { Editor, Header, BottomNav } from '@/Components/Common';
import useForm from '@/hooks/useForm';
import { createChannelPost } from '@/apis/post';
import { POST_ALERT_MSG } from '@/utils/constants';

const WritePostPage = () => {
  const history = useHistory();

  const onSubmit = async values => {
    try {
      const uploadedPostData = await createChannelPost(values);

      if (!uploadedPostData) {
        return;
      }

      const createdPostId = uploadedPostData['_id'];
      history.push(`/post/${createdPostId}`);
    } catch (error) {
      alert(POST_ALERT_MSG.TRY_AGAIN);
    }
  };

  const {
    formData,
    isLoading,
    handleTextChange,
    handleImageUpload,
    handleSubmit,
  } = useForm({
    initialValues: { text: '', image: {} },
    onSubmit,
  });

  return (
    <Wrapper>
      <Header
        handleSubmitInputs={handleSubmit}
        buttonType="upload"
        disabled={isLoading}
      />
      <Editor
        handleTextChange={handleTextChange}
        handleImageUpload={handleImageUpload}
        uploadedImage={formData.image}
      />
      <BottomNav />
    </Wrapper>
  );
};

export default WritePostPage;

const Wrapper = styled.div`
  height: 100%;
  padding: 4.8rem 0.75rem 4.9rem 0.75rem;
`;
