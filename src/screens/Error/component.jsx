import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Card, Button } from 'react-bootstrap';

export default function ErrorComponent({ handleReset }) {
  return (

    <Card style={{ marginTop: 100, textAlign: 'left' }}>
      <Card.Body>
        <Alert variant="danger">
          Uh oh, Something went wrong, please try again later
        </Alert>
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary" onClick={handleReset}>
          Reset Form
        </Button>
      </Card.Footer>
    </Card>
  );
}

ErrorComponent.propTypes = {
  handleReset: PropTypes.func.isRequired,
};
