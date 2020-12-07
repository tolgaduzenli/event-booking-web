import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppBar from './navigation/AppBar';
import CustomSwitch from './navigation/CustomSwitch';
import { useAuthContext } from './context/AuthContext';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <useAuthContext.Provider>
          <AppBar />
          <CustomSwitch />
        </useAuthContext.Provider>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
