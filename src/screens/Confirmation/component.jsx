import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Spinner } from 'react-bootstrap';

function ConfirmationComponent({
  data, loading, handleSubmit, handleBack,
}) {
  return (
    <>
      <Card.Title>Confirmation</Card.Title>
      <ul>
        <li>
          <strong>Name : </strong>
          {data.name.value}
        </li>
        <li>
          <strong>Email : </strong>
          {data.email.value}
        </li>
        <li>
          <strong>Password : </strong>
          {data.password.isHashed ? '*'.repeat(data.password.value.length) : data.password.value}
        </li>
        <li>
          <strong>color : </strong>
          {data.color.value}
        </li>
        <li>
          <strong>Terms and conditions : </strong>
          {data.terms.value ? 'AGREED' : 'REJECTED'}
        </li>
      </ul>

      <Button variant="outline-secondary" onClick={handleBack}>
        Back
      </Button>
      {' '}
      <Button variant="outline-success " onClick={handleSubmit} disabled={loading}>
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
    </>

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
