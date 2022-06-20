import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Card, Button } from 'react-bootstrap';

export default function SuccessComponent({ handleReset }) {
  return (
    <>
      <Card.Title>Success!</Card.Title>
      <Alert variant="success">
        You should receive a confirmation email soon
      </Alert>
      <Button variant="outline-secondary" onClick={handleReset}>
        Restart
      </Button>
    </>
  );
}

SuccessComponent.propTypes = {
  handleReset: PropTypes.func.isRequired,
};
