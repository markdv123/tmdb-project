import './styles/App.css'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/Theme'
import React, { useState, useEffect } from 'react'
import {
  Grid,
  AppBar,
  Toolbar,
  Icon,
  Typography,
  Card,
  CardContent,
  TextField,
  Button
} from '@material-ui/core'
import Axios from 'axios'
const API_KEY = process.env.REACT_APP_API_KEY

function App() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [searched, setSearched] = useState(false)
  const [result, setResult] = useState([])

  const getMovies = async () => {
    try {
      const res = await Axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
      setMovies(...movies, res.data.results)
      console.log(res.data.results)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  const handleChange = ({target}) => {
    setSearch(target.value)
  }

  const searchMovie = async () => {
    try {
      const res = await Axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`)
      setResult(res.data.results)
      setSearched(true)
    } catch (error) {
      throw error
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static">
          <Toolbar style={{margin: '0 auto'}}>
            <Icon >videocam</Icon>
            <Typography variant="h6" style={{margin: '5px'}}>
              TMBD Quick Search
            </Typography>
            <Icon >videocam</Icon>
          </Toolbar>
        </AppBar>
        <p>Quick access to TMDB's vast database of movie info! View the top trending films on the left, or search for a specific movie on the right. Click on any film poster for more information!</p>
        <Grid container>
          <Grid item xs={6}>
            <h1>Popular Films:</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
              {movies.length ? (
                movies.map((movie, i) => (
                  <div key={i} style={{ margin: '5px' }}>
                    <Card style={{ width: '200px', height: '280px' }}>
                      <CardContent>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                        <p style={{ color: 'white' }}>{movie.title}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))
              ) : (<p>loading</p>)}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px'}}>
              <TextField id="outlined-basic" label="Search" variant="outlined" style={{marginRight: '10px'}} value={search} onChange={(e)=> handleChange(e)}/>
              <Button variant="contained" color="primary" onClick={searchMovie}>Search</Button>
            </div>
            {searched ? result.length ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
                {result.map((movie, i) => (
                  <div key={i} style={{ margin: '5px' }}>
                    <Card style={{ width: '200px', height: '280px' }}>
                      <CardContent>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                        <p style={{ color: 'white' }}>{movie.title}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
            </div>
            ) : (<p>No Results</p>) : null}
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App
