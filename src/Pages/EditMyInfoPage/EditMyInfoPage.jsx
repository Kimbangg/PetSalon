import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import useForm from '@/hooks/useForm';
import {
  Input as ProfileImageInput,
  Header,
  BottomNav,
  Input as EditInfoInput,
} from '@/Components/Common';
import { getId } from '@/apis/token';
import { getUserInfo, putUserInfo, postImageData } from '@/apis/userInfo';
import { getUsersInfo } from '@/apis/auth';

const EditMyInfoPage = () => {
  const [isDuplicatedName, setIsDuplicatedName] = useState('');
  const history = useHistory();

  const { PUBLIC_URL } = process.env;
  const defaultProfileImage = `${PUBLIC_URL}/images/defaultProfile.jpeg`;

  const {
    formData,
    isLoading,
    setFormData,
    handleTextChange,
    handleImageUpload,
    handleSubmitInputs,
  } = useForm({
    initialValues: {
      userName: '',
      petName: '',
      image: {
        url: '',
        file: '',
      },
    },
    onSubmit: async ({ userName, petName, image }) => {
      try {
        const userInfo = {
          fullName: userName,
          username: petName,
        };

        const userInfoResponse = await putUserInfo({ userInfo });
        const imageResponse = await postImageData(image);

        return { userInfoResponse, imageResponse };
      } catch (error) {
        return error;
      }
    },
  });

  const setUserInfo = async () => {
    const _id = getId('_id');
    const { fullName, username, image } = await getUserInfo({ _id });

    setFormData({
      ...formData,
      userName: fullName,
      petName: username,
      image: {
        url: image,
      },
    });
  };

  useEffect(() => {
    setUserInfo();
  }, []);

  const handleCheckButton = async () => {
    const usersInfoData = await getUsersInfo();
    const duplicatedNameList = usersInfoData.filter(
      userInfoData => userInfoData.username === formData.petName,
    );

    if (duplicatedNameList.length > 0) {
      setIsDuplicatedName(true);
    } else {
      setIsDuplicatedName(false);
    }
  };

  const informDuplicateState = isDuplicated => {
    const hasNotChecked = isDuplicated === '';

    if (hasNotChecked) {
      return '';
    }

    if (isDuplicated) {
      return (
        <InformSpan color="#b00020">동일한 닉네임이 존재합니다.</InformSpan>
      );
    }
    return <InformSpan color="#000000"> 사용 하셔도 좋습니다 🎉 </InformSpan>;
  };

  return (
    <Wrapper>
      <Header
        isLoading={isLoading}
        handleSubmitInputs={handleSubmitInputs}
        buttonType="finish"
      />
      <ProfileWrapper>
        <ProfileImage src={formData.image.url || defaultProfileImage} />
        <ProfileImageInputWrapper>
          <ProfileImageInput
            id="upload"
            children="프로필 사진 변경"
            type="file"
            name="image"
            autoComplete="off"
            onChange={handleImageUpload}
            accept="image/*"
          />
        </ProfileImageInputWrapper>
      </ProfileWrapper>
      <EditInfoFormWrapper>
        <EditInfoForm>
          <EditInfoInput
            id="userName"
            name="userName"
            type="editMyInfo"
            value={formData.userName}
            onChange={handleTextChange}
            placeholder={formData.userName}
            inputColor="#808080"
            children="이름 ✍🏻"
          />
        </EditInfoForm>
        <EditInfoForm>
          <EditInfoInputWrapper>
            <EditInfoInput
              id="petName"
              name="petName"
              type="editMyInfo"
              value={formData.petName}
              onChange={handleTextChange}
              placeholder={formData.petName}
              inputColor="#808080"
              children="애완견/묘의 이름 😘"
            />
            <CheckButton type="button" onClick={handleCheckButton}>
              확인
            </CheckButton>
          </EditInfoInputWrapper>
          <InformSpanWrapper>
            {informDuplicateState(isDuplicatedName)}
          </InformSpanWrapper>
        </EditInfoForm>
        <Line />
        <ChangeButtonWrapper>
          <ChangeButton
            type="submit"
            onClick={() => history.push('/edit/password')}
          >
            비밀번호 변경하기
          </ChangeButton>
        </ChangeButtonWrapper>
      </EditInfoFormWrapper>
      <BottomNav />
    </Wrapper>
  );
};

export default EditMyInfoPage;

const Wrapper = styled.div`
  padding: 0 2rem;
`;

const ProfileWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 5.75rem;
  width: 100%;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  height: 7.5rem;
  width: 7.5rem;
  object-fit: cover;
`;

const ProfileImageInputWrapper = styled.div`
  padding-top: 1rem;
  font-size: 0.75rem;
  font-weight: bold;
  color: #89cff0;
`;

const EditInfoFormWrapper = styled.div`
  background: #f5f5f5;
  border-radius: 1rem;
  margin-top: 1.5rem;
  padding: 2rem;
  position: relative;
  width: 100%;
`;

const EditInfoForm = styled.form`
  display: flex;
  height: 2rem;
  margin-bottom: 4rem;
  flex-direction: column;
`;

const EditInfoInputWrapper = styled.div`
  display: flex;
`;

const CheckButton = styled.button`
  width: 40px;
  padding-top: 30px;
  cursor: pointer;
`;

const InformSpanWrapper = styled.div`
  text-align: center;
  font-size: 0.75rem;
`;

const InformSpan = styled.span`
  color: ${({ color }) => color};
`;

const Line = styled.hr`
  color: #c4c4c4;
  margin-top: 0.5rem;
  width: 100%;
`;

const ChangeButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 1rem;
`;

const ChangeButton = styled.button`
  color: #89cff0;
  cursor: pointer;
  font-weight: 700;
`;
