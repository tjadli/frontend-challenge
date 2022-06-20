import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RouteWrapper({ children, step }) {
  const maxStep = useSelector((state) => state.step);
  const location = useLocation();

  if (step > maxStep) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

RouteWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  step: PropTypes.number,
};

RouteWrapper.defaultProps = {
  step: 0,
};
