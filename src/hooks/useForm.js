import { useState } from 'react';
import { API_CONNECT } from '@/utils/constants';

const useForm = ({ initialValues, onSubmit, onDelete }) => {
  const [formData, setFormData] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const readImageFileAsUrl = ({ name, files }) => {
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      setFormData({
        ...formData,
        [name]: {
          file: files[0],
          url: reader.result,
        },
      });
    };
  };

  const handleImageUpload = e => {
    const { name, files } = e.target;
    readImageFileAsUrl({ name, files });
  };

  const handleClick = async e => {
    setIsLoading(true);
    e.preventDefault();

    await onDelete(e);
    setIsLoading(false);
  };

  const handleSubmit = async e => {
    setIsLoading(true);
    e.preventDefault();

    await onSubmit(formData);

    if (formData.comment) {
      setFormData({
        ...formData,
        comment: '',
      });
    }
    setIsLoading(false);
  };

  const handleSubmitInputs = async e => {
    setIsLoading(true);
    e.preventDefault();

    const { userInfoResponse, imageResponse } = await onSubmit(formData);

    const imageResult = imageResponse.status < 400;
    const userInfoResult = userInfoResponse.status < 400;

    if (userInfoResult && imageResult) {
      alert(API_CONNECT.SUCCESS);
    } else if (!imageResult) {
      alert(API_CONNECT.IMAGE_MUST_UPLOAD);
    } else {
      alert(API_CONNECT.TRY_AGAIN);
    }
    setIsLoading(false);
  };

  return {
    formData,
    setFormData,
    isLoading,
    handleTextChange,
    handleImageUpload,
    handleSubmit,
    handleSubmitInputs,
    handleClick,
  };
};

export default useForm;
