import React from 'react';
import {
  Routes, Route,
} from 'react-router-dom';

import Home from '../screens/Home';
import MoreInfo from '../screens/MoreInfo';
import Confirmation from '../screens/Confirmation';
import Success2 from '../screens/Success';
import Error from '../screens/Error';

export default function NavigationRoutes() {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="more-info" element={<MoreInfo />} />
      <Route path="confirmation" element={<Confirmation />} />
      <Route path="success" element={<Success2 />} />
      <Route path="error" element={<Error />} />
    </Routes>

  );
}
