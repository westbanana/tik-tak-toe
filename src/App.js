import React from 'react';
import { Route, Routes } from 'react-router';

import Game from './components/Game';
import Menu from './components/Menu';

const App = () => {
  console.log(123);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Menu />
        }
      />
      <Route
        path="/game"
        element={
          <Game />
        }
      />
    </Routes>
  );
};

export default App;
