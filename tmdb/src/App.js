import './styles/App.css'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/Theme'
import React, { useState, useEffect } from 'react'
function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      </div>
    </ThemeProvider>
  );
}

export default App
