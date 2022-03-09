/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import React from 'react';

const Input = ({
  id,
  children,
  top,
  placeholder,
  type,
  name,
  value,
  autoComplete,
  onChange,
  inputColor,
}) => (
  <InputContainer top={top}>
    <LabelWrapper>
      <label htmlFor={id}>{children}</label>
    </LabelWrapper>
    <StyledInput
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      autocomplete={autoComplete}
      inputColor={inputColor}
    />
  </InputContainer>
);

export default Input;

Input.defaultProps = {
  top: '0',
  children: '',
  placeholder: '',
  type: 'text',
  name: '',
  onChange: () => {},
  autoComplete: 'on',
  inputColor: 'black',
};

Input.propTypes = {
  top: PropTypes.string,
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  placeholder: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  autoComplete: PropTypes.string,
  value: PropTypes.string,
  inputColor: PropTypes.string,
};

const InputContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: ${({ top }) => top};
  width: 100%;
`;

const StyledInput = styled.input`
  background-color: #f5f5f5;
  border: 0;
  border-radius: 1rem;
  display: block;
  color: ${({ inputColor }) => inputColor};
  font-size: 1rem;
  height: 3rem;
  margin-top: 0.125rem;
  outline: 0;
  padding: 0.25rem 0.5rem;
  width: 100%;
  display: ${({ type }) => (type === 'file' ? 'none' : 'inline-block')};
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: left;
  padding-bottom: 0.5rem;
  padding-left: 0.25rem;
  width: 100%;
`;
