import './styles/App.css'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/Theme'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
const API_KEY = process.env.REACT_APP_API_KEY

function App() {
  const [movies, setMovies] = useState([])

  getMovies = async () => {
    res = await Axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
  }

  useEffect(()=> {
    getMovies()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      </div>
    </ThemeProvider>
  );
}

export default App
