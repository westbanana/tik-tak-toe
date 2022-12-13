import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { useDispatch } from 'react-redux';

import Game from './components/Game';
import Menu from './components/Menu';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'SET_GAME_TYPE', payload: 0 });
  }, []);
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
