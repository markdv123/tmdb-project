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
  Button,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core'
import Axios from 'axios'
const API_KEY = process.env.REACT_APP_API_KEY

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
})

function App() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [searched, setSearched] = useState(false)
  const [result, setResult] = useState([])
  const [mov, setMov] = useState({})
  const [open, setOpen] = useState(false)
  const [favs, setFavs] = useState([])

  const getMovies = async () => {
    try {
      const res = await Axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
      setMovies(...movies, res.data.results)
      console.log(res.data.results)
    } catch (error) {
      throw error
    }
  }

  const getFavs = async () => {
    try {
      let favorites = []
      let res = await Axios.get(`https://api.themoviedb.org/3/movie/448491?api_key=${API_KEY}`)
      favorites.push(res.data)
      res = await Axios.get(`https://api.themoviedb.org/3/movie/129?api_key=${API_KEY}`)
      favorites.push(res.data)
      res = await Axios.get(`https://api.themoviedb.org/3/movie/14836?api_key=${API_KEY}`)
      favorites.push(res.data)
      res = await Axios.get(`https://api.themoviedb.org/3/movie/50456?api_key=${API_KEY}`)
      favorites.push(res.data)
      res = await Axios.get(`https://api.themoviedb.org/3/movie/1924?api_key=${API_KEY}`)
      favorites.push(res.data)
      res = await Axios.get(`https://api.themoviedb.org/3/movie/128?api_key=${API_KEY}`)
      favorites.push(res.data)
      res = await Axios.get(`https://api.themoviedb.org/3/movie/11544?api_key=${API_KEY}`)
      favorites.push(res.data)
      res = await Axios.get(`https://api.themoviedb.org/3/movie/350?api_key=${API_KEY}`)
      favorites.push(res.data)
      res = await Axios.get(`https://api.themoviedb.org/3/movie/237791?api_key=${API_KEY}`)
      favorites.push(res.data)
      res = await Axios.get(`https://api.themoviedb.org/3/movie/8835?api_key=${API_KEY}`)
      favorites.push(res.data)
      res = await Axios.get(`https://api.themoviedb.org/3/movie/49026?api_key=${API_KEY}`)
      favorites.push(res.data)
      res = await Axios.get(`https://api.themoviedb.org/3/movie/630?api_key=${API_KEY}`)
      favorites.push(res.data)
      res = await Axios.get(`https://api.themoviedb.org/3/movie/37797?api_key=${API_KEY}`)
      favorites.push(res.data)
      res = await Axios.get(`https://api.themoviedb.org/3/movie/37735?api_key=${API_KEY}`)
      favorites.push(res.data)
      res = await Axios.get(`https://api.themoviedb.org/3/movie/593691?api_key=${API_KEY}`)
      favorites.push(res.data)
      res = await Axios.get(`https://api.themoviedb.org/3/movie/300668?api_key=${API_KEY}`)
      favorites.push(res.data)
      setFavs(favorites)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getMovies()
    getFavs()
  }, [])

  const handleChange = ({ target }) => {
    setSearch(target.value)
  }

  const searchMovie = async () => {
    try {
      const res = await Axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`)
      setResult(res.data.results)
      console.log(res.data.results)
      setSearched(true)
    } catch (error) {
      throw error
    }
  }

  const handleClickOpen = (movie) => {
    setMov(movie)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static">
          <Toolbar style={{ margin: '0 auto' }}>
            <Icon >videocam</Icon>
            <Typography variant="h6" style={{ margin: '5px' }}>
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
                    <Card style={{ width: '200px', height: '280px' }} onClick={() => { handleClickOpen(movie) }}>
                      <CardContent>
                        <img className="cardImg" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                        <p style={{ color: 'white' }}>{movie.title}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))
              ) : (<p>loading</p>)}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15px' }}>
              <TextField id="outlined-basic" label="Search" variant="outlined" style={{ marginRight: '10px' }} value={search} onChange={(e) => handleChange(e)} />
              <Button variant="contained" color="primary" onClick={searchMovie}>Search</Button>
            </div>
            {searched ? result.length ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
                {result.map((movie, i) => (
                  <div key={i} style={{ margin: '5px' }}>
                    <Card style={{ width: '200px', height: '280px' }} onClick={() => { handleClickOpen(movie) }}>
                      <CardContent>
                        <img className="cardImg" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                        <p style={{ color: 'white' }}>{movie.title}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (<p>No Results</p>) : favs.length ? (
              <div>
                <h4>Mark's Favs</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
                  {favs.map((movie, i) => (
                    <div key={i} style={{ margin: '5px' }}>
                      <Card style={{ width: '200px', height: '280px' }} onClick={() => { handleClickOpen(movie) }}>
                        <CardContent>
                          <img className="cardImg" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                          <p style={{ color: 'white' }}>{movie.title}</p>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            ) : (<p>loading</p>)}
          </Grid>
        </Grid>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          {mov.title ? (
            <div style={{ textAlign: 'center', color: 'white' }}>
              <DialogTitle id="alert-dialog-slide-title">{mov.title}</DialogTitle>
              <DialogContent>
                <img src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`} />
                <p>Release Date: {mov.release_date}</p>
                <p>Original Language: {mov.original_language}</p>
                <p>{mov.overview}</p>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">Close</Button>
              </DialogActions>
            </div>
          ) : null}
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

export default App
