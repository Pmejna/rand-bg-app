import React, { useState, useContext } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createTheme, CssBaseline} from "@mui/material";
import './App.css';
import Home from './pages/Home';
import { ThemeProvider } from '@emotion/react';
import Navigation from './components/Navigation/Navigation';
import { ColorModeContextProvider } from './context/ColorModeContext';

export const App: React.FC = (): JSX.Element => {

  return(
    <ColorModeContextProvider>
      <CssBaseline />
      <Navigation>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route></Route>
            <Route></Route>
          </Routes>
        </BrowserRouter>
      </Navigation>
    </ColorModeContextProvider>
    )
}

export default App;
