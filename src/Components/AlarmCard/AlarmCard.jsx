import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import ClearIcon from '@mui/icons-material/Clear';

const AlarmCard = ({ children }) => (
  <Wrapper>
    <CardContent>{children}</CardContent>
    <button type="button">
      <CardDeleteIcon />
    </button>
  </Wrapper>
);

export default AlarmCard;

AlarmCard.defaultProps = {
  children: '',
};

AlarmCard.propTypes = {
  children: PropTypes.string,
};

const Wrapper = styled.div`
  background-color: #f5f5f5;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 #0000003d;
  height: 5.625rem;
  position: relative;
  width: 100%;
  margin: 1rem 0;
`;

const CardContent = styled.div`
  font-size: 0.75rem;
  height: 100%;
  padding: 25px 34px 25px 8px;
  width: 100%;
`;

const CardDeleteIcon = styled(ClearIcon)`
  color: #979797;
  cursor: pointer;
  height: 1.125rem;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  width: 1.125rem;
`;
