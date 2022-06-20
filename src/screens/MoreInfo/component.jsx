import React from 'react';
import PropTypes from 'prop-types';

import {
  Form, Card, Button, FloatingLabel,
} from 'react-bootstrap';

export default function MoreInfoComponent({
  handleSubmit, handlePrevious, handleFormData, color, terms, colors,
}) {
  return (
    <>
      <Card.Title>Additional Info</Card.Title>
      <Form onSubmit={handleSubmit}>
        <FloatingLabel className="mb-3" label="Favorite Color" controlId="color">
          <Form.Select
            style={{ border: color.hasError ? '2px solid red' : '' }}
            name="color"
            id="color"
            placeholder="Select your favorite color"
            onChange={handleFormData}
            defaultValue={color.value}
            aria-describedby="colorErrorBlock"
          >
            <option value="">Select your favorite color</option>
            {colors.map((clr) => (
              <option key={`${clr}`}>{clr}</option>
            ))}

          </Form.Select>
          {color.hasError ? (
            <Form.Text id="colorErrorBlock" style={{ color: 'red' }}>
              This is a required field
            </Form.Text>
          ) : (
            ''
          )}
        </FloatingLabel>

        <FloatingLabel className="mb-3">
          <Form.Check type="checkbox" aria-describedby="termsErrorBlock">
            <Form.Check.Input isInvalid={terms.hasError} type="checkbox" name="terms" checked={terms.value ?? 'checked'} onChange={handleFormData} />
            <Form.Check.Label htmlFor="terms">
              {'I Agree to '}
              <a href="/">Terms and conditions</a>
            </Form.Check.Label>

          </Form.Check>

          {terms.hasError ? (
            <Form.Text style={{ color: 'red' }} id="termsErrorBlock">
              You have to accept the terms and conditions
            </Form.Text>
          ) : ''}
        </FloatingLabel>
        <>
          <Button variant="outline-secondary" onClick={handlePrevious}>
            Back
          </Button>
          {' '}
          <Button variant="outline-success" type="submit">
            Next
          </Button>
        </>

      </Form>

    </>
  );
}

MoreInfoComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleFormData: PropTypes.func.isRequired,
  color: PropTypes.shape({
    value: PropTypes.string,
    hasError: PropTypes.bool,
  }).isRequired,
  terms: PropTypes.shape({
    value: PropTypes.bool,
    hasError: PropTypes.bool,
  }).isRequired,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};
