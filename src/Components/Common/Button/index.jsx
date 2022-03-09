import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import React from 'react';

const Button = ({
  children,
  type,
  color,
  marginTop,
  backgroundColor,
  onClick,
  isDisabled,
}) => (
  <StyledButton
    marginTop={marginTop}
    type={type}
    color={color}
    backgroundColor={backgroundColor}
    onClick={onClick}
    disabled={isDisabled}
  >
    {children}
  </StyledButton>
);

export default Button;

Button.defaultProps = {
  children: '',
  marginTop: '0',
  type: 'button',
  color: '#ffffff',
  backgroundColor: '#89CFF0',
  onClick: () => {},
  isDisabled: false,
};

Button.propTypes = {
  children: PropTypes.string,
  marginTop: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
};

const StyledButton = styled.button`
  margin-top: ${({ marginTop }) => marginTop};
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: 0;
  border-radius: 1rem;
  color: ${({ color }) => color};
  cursor: pointer;
  font-size: 1rem;
  height: 3rem;
  outline: 0;
  padding: 0.25rem 0.5rem;
  width: 100%;
  cursor: pointer;

  &:disabled {
    background: #777;
  }
`;
