import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Spinner } from 'react-bootstrap';

function ConfirmationComponent({
  data, loading, handleSubmit, handleBack,
}) {
  return (
    <Card style={{ marginTop: 100, textAlign: 'left' }}>
      <Card.Body>
        <Card.Title>Confirmation</Card.Title>

        <p>
          <strong>Name : </strong>
          {data.name.value}
        </p>
        <p>
          <strong>Email : </strong>
          {data.email.value}
        </p>
        <p>
          <strong>Password : </strong>
          {data.password.isHashed ? '*'.repeat(data.password.value.length) : data.password.value}
        </p>
        <p>
          <strong>color : </strong>
          {data.color.value}
        </p>
        <p>
          <strong>Terms and conditions : </strong>
          {' '}
          {data.terms.value ? 'AGREED' : 'REJECTED'}
        </p>
        <Button variant="secondary" onClick={handleBack}>
          Back
        </Button>
        {' '}
        <Button variant="primary " onClick={handleSubmit} disabled={loading}>
          {loading
            ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {' '}
                Submiting...
              </>
            ) : 'Submit'}

        </Button>
      </Card.Body>
    </Card>
  );
}

ConfirmationComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    isHashed: PropTypes.bool,
  })).isRequired,
};

export default ConfirmationComponent;
