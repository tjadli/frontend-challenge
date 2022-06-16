import React from 'react';
import PropTypes from 'prop-types';

import { Form, Card, Button } from 'react-bootstrap';

export default function MoreInfoComponent({
  handleSubmit, handlePrevious, handleFormData, color, terms, colors,
}) {
  return (
    <div>
      <Card style={{ marginTop: 100 }}>
        <Card.Body>
          <Card.Title>Additional Info</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Favorite Color</Form.Label>
              <Form.Select
                style={{ border: color.hasError ? '2px solid red' : '' }}
                name="color"
                placeholder="Select your favorite color"
                onChange={handleFormData}
                defaultValue={color.value}
              >
                <option value="">Select your favorite color</option>
                {colors.map((clr) => (
                  <option key={`${clr}`}>{clr}</option>
                ))}

              </Form.Select>
              {color.hasError ? (
                <Form.Text style={{ color: 'red' }}>
                  This is a required field
                </Form.Text>
              ) : (
                ''
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check type="checkbox">
                <Form.Check.Input isInvalid={terms.hasError} type="checkbox" name="terms" checked={terms.value ?? 'checked'} onChange={handleFormData} />
                <Form.Check.Label name="terms">
                  {'I Agree to '}
                  {' '}
                  <a href="/">Terms and conditions</a>
                </Form.Check.Label>

              </Form.Check>

              {terms.hasError ? (
                <Form.Text style={{ color: 'red' }}>
                  You have to accept the terms and conditions
                </Form.Text>
              ) : ''}
            </Form.Group>
            <>
              <Button variant="secondary" onClick={handlePrevious}>
                Back
              </Button>
              {' '}
              <Button variant="primary" type="submit">
                Next
              </Button>
            </>

          </Form>
        </Card.Body>
      </Card>
    </div>
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
