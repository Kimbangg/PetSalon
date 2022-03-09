import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';

const Header = ({ isLoading, handleSubmitInputs, buttonType }) => {
  const history = useHistory();
  const { pathname: currentPath } = useLocation();

  const goBack = () => {
    const prevPath = history.location.state || { from: '/' };
    const { from: prevPathName } = prevPath;

    const isFromNotAllowedPath =
      prevPathName === '/signin' || prevPathName === '/signup';

    if (isFromNotAllowedPath) {
      return;
    }

    history.push(prevPathName, { from: currentPath });
  };

  const { PUBLIC_URL } = process.env;
  const logoImage = `${PUBLIC_URL}/images/logo.png`;

  if (buttonType === 'finish') {
    return (
      <PageHeader>
        <ArrowBackIosIcon onClick={goBack} />
        <LogoImage src={logoImage} alt="로고" />
        <button type="button" onClick={handleSubmitInputs} disabled={isLoading}>
          완료
        </button>
      </PageHeader>
    );
  }

  if (buttonType === 'upload') {
    return (
      <PageHeader>
        <ArrowBackIosIcon onClick={goBack} />
        <LogoImage src={logoImage} alt="로고" />
        <button type="button" onClick={handleSubmitInputs} disabled={isLoading}>
          올리기
        </button>
      </PageHeader>
    );
  }

  if (buttonType === 'edit') {
    return (
      <PageHeader>
        <ArrowBackIosIcon onClick={goBack} />
        <LogoImage src={logoImage} alt="로고" />
        <button type="button" onClick={handleSubmitInputs} disabled={isLoading}>
          수정
        </button>
      </PageHeader>
    );
  }

  if (buttonType === '') {
    return (
      <PageHeader>
        <ArrowBackIosIcon onClick={() => history.goBack()} />
        <LogoImage src={logoImage} alt="로고" />
        <SettingsIcon onClick={() => history.push('/setting')} />
      </PageHeader>
    );
  }
};

export default Header;

Header.defaultProps = {
  buttonType: '',
  isLoading: false,
  handleSubmitInputs: () => {},
};

Header.propTypes = {
  buttonType: PropTypes.string,
  isLoading: PropTypes.bool,
  handleSubmitInputs: PropTypes.func,
};

const PageHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #c4c4c4;
  color: #89cff0;
  height: 2.625rem;
  left: 0;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  position: absolute;
  top: 0;
  width: 100%;
  align-content: center;

  svg {
    cursor: pointer;

    :hover {
      color: #f5c63e;
    }
  }

  button {
    color: #89cff0;
    font-weight: bold;
  }
`;

const LogoImage = styled.img`
  position: absolute;
  width: 2.2rem;
  height: 2.2rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
