import React, { useState } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {createTheme, CssBaseline} from "@mui/material";
import './App.css';
import Home from './pages/Home';
import { ThemeProvider } from '@emotion/react';
import Navigation from './components/Navigation/Navigation';

export const App: React.FC = (): JSX.Element => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
    typography: {
      fontSize: 14
    }
  })
  return(
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
    )
}

export default App;
