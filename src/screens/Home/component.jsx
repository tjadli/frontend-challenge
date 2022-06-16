import React from 'react';
import PropTypes from 'prop-types';

import { Form, Card, Button } from 'react-bootstrap';

function HomeComponent({
  name, email, password, handleFormData, handleNext,
}) {
  return (
    <div>
      <Card style={{ marginTop: 100 }}>
        <Card.Body>
          <Card.Title>Sign Up</Card.Title>
          <Form onSubmit={handleNext}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                style={{ border: name.hasError ? '2px solid red' : '' }}
                name="name"
                defaultValue={name.value}
                type="text"
                placeholder="name"
                onChange={handleFormData}
              />
              {name.hasError ? (
                <Form.Text style={{ color: 'red' }}>
                  This is a required field
                </Form.Text>
              ) : (
                ''
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                style={{ border: email.hasError ? '2px solid red' : '' }}
                name="email"
                defaultValue={email.value}
                type="text"
                placeholder="Email"
                onChange={handleFormData}
              />
              {email.hasError ? (
                <Form.Text style={{ color: 'red' }}>
                  This is a required field
                </Form.Text>
              ) : (
                ''
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                style={{ border: password.hasError ? '2px solid red' : '' }}
                name="password"
                defaultValue={password.value}
                type="password"
                placeholder="Password"
                onChange={handleFormData}
              />
              {password.hasError ? (
                <Form.Text style={{ color: 'red' }}>
                  This is a required field
                </Form.Text>
              ) : (
                ''
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Next
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>

  );
}

HomeComponent.propTypes = {
  handleNext: PropTypes.func.isRequired,
  handleFormData: PropTypes.func.isRequired,
  name: PropTypes.shape({
    value: PropTypes.string,
    hasError: PropTypes.bool,
  }).isRequired,
  password: PropTypes.shape({
    value: PropTypes.string,
    hasError: PropTypes.bool,
  }).isRequired,
  email: PropTypes.shape({
    value: PropTypes.string,
    hasError: PropTypes.bool,
  }).isRequired,
};
export default HomeComponent;
