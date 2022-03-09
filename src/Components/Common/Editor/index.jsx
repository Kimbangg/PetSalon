import { React, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Input from '@/Components/Common/Input';

const Editor = ({
  handleTextChange,
  handleImageUpload,
  uploadedImage,
  content,
}) => {
  const [value, setValue] = useState(content);
  const { PUBLIC_URL } = process.env;
  const defaultProfileImage = `${PUBLIC_URL}/images/defaultProfile.jpeg`;

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleLocalTextChange = e => {
    handleTextChange(e);
    handleChange(e);
  };

  useEffect(() => {
    setValue(content);
  }, [content]);

  return (
    <Wrapper>
      <form>
        <Label htmlFor="post">포스트 작성</Label>
        <TextArea
          id="post"
          name="text"
          placeholder="내용을 입력해주세요."
          value={value}
          onChange={handleLocalTextChange}
        />

        <Input
          id="upload"
          children={<StyledCameraAltIcon />}
          type="file"
          name="image"
          autoComplete="off"
          onChange={handleImageUpload}
          accept="image/*"
        />
      </form>
      <UploadedPhoto
        src={uploadedImage.url || defaultProfileImage}
        alt="업로드 이미지"
      />
    </Wrapper>
  );
};

export default Editor;

Editor.defaultProps = {
  handleTextChange: () => {},
  handleImageUpload: () => {},
  uploadedImage: {},
  content: '',
};

Editor.propTypes = {
  handleTextChange: PropTypes.func,
  handleImageUpload: PropTypes.func,
  uploadedImage: PropTypes.object,
  content: PropTypes.string,
};

const Wrapper = styled.div`
  background-color: #f5f5f5;
  border-radius: 1rem;
  height: 9.8rem;
  position: relative;
  width: 100%;
  height: 100%;
`;

const Label = styled.label`
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
`;

const TextArea = styled.input`
  background-color: #f5f5f5;
  border: 0;
  border-radius: 1rem;
  font-size: 1rem;
  font-weight: 700;
  height: 100%;
  padding: 1rem;
  resize: none;
  width: 100%;

  &:focus {
    outline: 0;
  }
`;

const StyledCameraAltIcon = styled(CameraAltIcon)`
  bottom: 0.5rem;
  color: #c4c4c4;
  height: 1.5rem;
  position: absolute;
  right: 1rem;
  width: 1.5rem;
`;

const UploadedPhoto = styled.img`
  bottom: 1rem;
  border-radius: 0.5rem;
  height: 6.25rem;
  left: 1rem;
  position: absolute;
  width: 6.25rem;
  object-fit: cover;
`;
