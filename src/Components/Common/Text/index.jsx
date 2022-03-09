import './Text.css';
import React from 'react';
import PropTypes from 'prop-types';

const Text = ({ children, size, strong, color, ...props }) => {
  const fontStyle = {
    fontWeight: strong ? '700' : undefined,
    fontSize: typeof size === 'number' ? size : undefined,
    color,
  };

  return (
    <div
      className={typeof size === 'string' ? `Text--size-${size}` : undefined}
      style={{ ...props, ...fontStyle }}
    >
      {children}
    </div>
  );
};

export default Text;

Text.defaultProps = {
  size: 'normal',
  strong: false,
  children: '',
  color: 'black',
};

Text.propTypes = {
  size: PropTypes.string,
  strong: PropTypes.bool,
  children: PropTypes.string,
  color: PropTypes.string,
};
