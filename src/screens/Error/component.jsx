import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Card, Button } from 'react-bootstrap';

export default function ErrorComponent({ handleReset }) {
  return (
    <>
      <Card.Title>Error</Card.Title>
      <Alert variant="danger">
        Uh oh, Something went wrong, please try again later
      </Alert>
      <Button variant="outline-secondary" onClick={handleReset}>
        Reset Form
      </Button>
    </>

  );
}

ErrorComponent.propTypes = {
  handleReset: PropTypes.func.isRequired,
};
