import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Card, Button } from 'react-bootstrap';

export default function SuccessComponent({ handleReset }) {
  return (

    <Card style={{ marginTop: 100, textAlign: 'left' }}>
      <Card.Body>
        <Alert variant="success">
          You should receive a confirmation email soon
        </Alert>
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary" onClick={handleReset}>
          Restart
        </Button>
      </Card.Footer>
    </Card>
  );
}

SuccessComponent.propTypes = {
  handleReset: PropTypes.func.isRequired,
};
