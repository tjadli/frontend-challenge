import React from 'react';
import PropTypes from 'prop-types';

import {
  Form, Card, Button, FloatingLabel,
} from 'react-bootstrap';

function HomeComponent({
  name, email, password, handleFormData, handleNext,
}) {
  return (
    <>
      <Card.Title>Sign Up</Card.Title>
      <Form onSubmit={handleNext}>
        <FloatingLabel className="mb-3" controlId="name" label="Name">
          <Form.Control
            style={{ border: name.hasError ? '2px solid red' : '' }}
            name="name"
            defaultValue={name.value}
            type="text"
            placeholder="Name"
            onChange={handleFormData}
            aria-describedby="nameErrorBlock"
          />
          {name.hasError ? (
            <Form.Text id="nameErrorBlock" style={{ color: 'red' }}>
              This is a required field
            </Form.Text>
          ) : (
            ''
          )}
        </FloatingLabel>
        <FloatingLabel className="mb-3" controlId="email" label="Email">
          <Form.Control
            style={{ border: email.hasError ? '2px solid red' : '' }}
            name="email"
            defaultValue={email.value}
            type="text"
            placeholder="Email"
            onChange={handleFormData}
            aria-describedby="emailErrorBlock"
          />
          {email.hasError ? (
            <Form.Text id="emailErrorBlock" style={{ color: 'red' }}>
              This is a required field
            </Form.Text>
          ) : (
            ''
          )}
        </FloatingLabel>
        <FloatingLabel className="mb-3" controlId="password" label="Passowrd">
          <Form.Control
            style={{ border: password.hasError ? '2px solid red' : '' }}
            name="password"
            defaultValue={password.value}
            type="password"
            placeholder="Password"
            onChange={handleFormData}
            aria-describedby="passwordErrorBlock"
          />
          {password.hasError ? (
            <Form.Text id="passwordErrorBlock" style={{ color: 'red' }}>
              This is a required field
            </Form.Text>
          ) : (
            ''
          )}
        </FloatingLabel>
        <Button variant="outline-success" type="submit">
          Next
        </Button>
      </Form>

    </>

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
