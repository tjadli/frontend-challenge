import React from 'react';
import PropTypes from 'prop-types';

export default function Checkmark({ width, height }) {
  const scale = Math.min(height, width) / 20;
  return (
    <svg width={width} height={height} viewBox="0 0 15 10" transform={`scale(${scale})`}>
      <path
        fill="#fff"
        d="M14.7747 0.210499C15.0751 0.491165 15.0751 0.946214 14.7747 1.22688L5.38462 10L0.225303 5.17967C-0.0751008 4.89901 -0.0751008 4.44396 0.225303 4.16329C0.525706 3.88263 1.01276 3.88263 1.31316 4.16329L5.38462 7.96724L13.6868 0.210499C13.9872 -0.0701664 14.4743 -0.0701664 14.7747 0.210499Z"
      />
    </svg>
  );
}

Checkmark.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

Checkmark.defaultProps = {
  width: 24,
  height: 24,
};
