import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { BrowserRouter } from 'react-router-dom';
import NavigationContainer from './Navigation';

import FormContextProvider from './context/FormContext';

function App() {
  return (

    <div className="App">
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }} className="custom-margin">
            <BrowserRouter>
              <FormContextProvider>
                <NavigationContainer />
              </FormContextProvider>
            </BrowserRouter>
          </Col>
        </Row>
      </Container>
    </div>

  );
}

export default App;
