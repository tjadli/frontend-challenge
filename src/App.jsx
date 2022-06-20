import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Styled from 'styled-components';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import NavigationContainer from './Navigation';
import configureStore from './store';

function App() {
  const { store } = configureStore();

  return (

    <Wrapper>
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <BrowserRouter>
              <Provider store={store}>
                <NavigationContainer />
              </Provider>
            </BrowserRouter>
          </Col>
        </Row>
      </Container>
    </Wrapper>

  );
}

const Wrapper = Styled.div`
  background-color: #ebeff2;
  min-height: 100vh;
`;
export default App;
