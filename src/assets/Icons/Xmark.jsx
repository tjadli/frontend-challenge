import React from 'react';
import PropTypes from 'prop-types';

export default function Xmark({ width, height, color }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M24 0.71001L23.3 0.0100098L12 11.3L0.71001 0.0100098L0.0100098 0.71001L11.3 12L0.0100098 23.3L0.71001 24L12 12.71L23.3 24L24 23.3L12.71 12L24 0.71001Z"
        fill={color}
      />
    </svg>
  );
}

Xmark.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,

};

Xmark.defaultProps = {
  width: 24,
  height: 24,
  color: '#fff',
};
