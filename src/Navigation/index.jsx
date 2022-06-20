import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Card } from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import Home from '../screens/Home';
import MoreInfo from '../screens/MoreInfo';
import Confirmation from '../screens/Confirmation';
import Success from '../screens/Success';
import Error from '../screens/Error';
import { loadColors } from '../actions/colors.actions';
import RouteWrapper from './RouteWrapper';
import Progress from '../components/progress';

export default function NavigationRoutes() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadColors());
  }, []);
  return (
    <Card style={{ marginTop: 100 }}>
      <Progress />
      <Card.Body>

        <Routes>
          <Route
            exact
            path=""
            element={<Home step={0} />}
            render={() => (
              <Home />
            )}
          />
          <Route
            exact
            path="more-info"
            element={(
              <RouteWrapper step={1}>
                <MoreInfo />
              </RouteWrapper>
                  )}
          />
          <Route
            exact
            path="confirmation"
            element={(
              <RouteWrapper step={2}>
                <Confirmation />
              </RouteWrapper>
                )}
          />
          <Route
            exact
            path="success"
            element={(
              <RouteWrapper step={3}>
                <Success />
              </RouteWrapper>
              )}
          />
          <Route
            exact
            path="error"
            element={(
              <RouteWrapper step={3}>
                <Error />
              </RouteWrapper>
                )}
          />
        </Routes>

      </Card.Body>
    </Card>

  );
}
