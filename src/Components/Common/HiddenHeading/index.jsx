import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const HiddenHeading = ({ children, level }) => (
  <Heading as={`h${level}`}>{children}</Heading>
);

export default HiddenHeading;

const Heading = styled.h1`
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
`;

HiddenHeading.defaultProps = {
  children: '',
  level: 1,
};

HiddenHeading.propTypes = {
  children: PropTypes.string,
  level: PropTypes.number,
};
