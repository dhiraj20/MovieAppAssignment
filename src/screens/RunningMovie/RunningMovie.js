import React, { useEffect, useState } from 'react';
import './RunningMovie.css';
import {
  Checkbox,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 240,
    maxWidth: 240,
    marginTop: '16px',
    margin: theme.spacing(1),
  },
  title: {
    fontSize: 16,
    color: theme.palette.primary.light,
  },
  card: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: '470px',
  },
}));

const multiSelectStyle = makeStyles((theme) => ({
  formControl: {
    minWidth: '100%',
    maxWidth: '100%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

export default function RunningMovies(props) {
  const classes = useStyles();
  const multiSelect = multiSelectStyle();
  let history = useHistory();
  const baseUrl = props.baseUrl;

  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState([]);
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [start_date, setStartDate] = useState([]);
  const [end_date, setEndDate] = useState([]);
  const [personName, setPersonName] = useState([]);
  const [artistsList, setArtistsList] = useState([]);

  async function getMovies() {
    let response = await fetch(`${baseUrl}/movies?page=1&limit=200`);
    response = await response.json();
    let runningMovie = response.movies.filter(
      (movie) => movie.status === 'RELEASED'
    );
    setMovies(runningMovie);
  }

  async function getGenres() {
    let response = await fetch(`${baseUrl}/genres`);
    response = await response.json();
    setGenres(response.genres);
  }

  async function getArtists() {
    let response = await fetch(`${baseUrl}/artists?page=1&limit=20`);
    response = await response.json();
    setArtists(response.artists);
  }

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getMovies();
      getGenres();
      getArtists();
    }
    return () => {
      setMovies([]);
      setGenres([]);
      setArtistsList([]);
      mounted = false;
    };
  }, []);

  const handleRoute = (id) => history.push(`/movie/${id}`);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleChangeArtists = (event) => {
    setArtistsList(event.target.value);
  };

  return (
    <div className="runningmoviecontainer">
      <div className="left">
        <ImageList cols={4} rowHeight={350}>
          {movies.map((movie) => (
            <ImageListItem
              key={movie.poster_url}
              className="imageitem"
              onClick={handleRoute.bind(this, movie.id)}
            >
              <img
                src={movie.poster_url}
                srcSet={movie.poster_url}
                alt={movie.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={movie.title}
                subtitle={<span>Release Date: {movie.release_date}</span>}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
      <div className="right">
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <div className={classes.title}>FIND MOVIE BY:</div>
            <form className="form">
              <div className="form-control">
                <FormControl className={multiSelect.formControl}>
                  <InputLabel htmlFor="moviename">Movie Name</InputLabel>
                  <Input
                    id="moviename"
                    name="title"
                    aria-describedby="title"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    defaultValue={title}
                  />
                </FormControl>
              </div>
              <div className="form-control">
                <FormControl className={multiSelect.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label">
                    Genres
                  </InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {genres &&
                      genres.map((data) => (
                        <MenuItem key={data.genre} value={data.genre}>
                          <Checkbox
                            checked={personName.indexOf(data.genre) > -1}
                          />
                          <ListItemText primary={data.genre} />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div className="form-control">
                <FormControl className={multiSelect.formControl}>
                  <InputLabel id="demo-mutiple-checkbox-label">
                    Artists
                  </InputLabel>
                  <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={artistsList}
                    onChange={handleChangeArtists}
                    input={<Input />}
                    renderValue={(selected) =>
                      selected
                        .map((data) => `${data.first_name} ${data.last_name}`)
                        .join(', ')
                    }
                    MenuProps={MenuProps}
                  >
                    {artists &&
                      artists.map((data) => (
                        <MenuItem key={data.id} value={data}>
                          <Checkbox
                            checked={artistsList.some(
                              (artist) => artist.id === data.id
                            )}
                          />
                          <ListItemText
                            primary={`${data.first_name} ${data.last_name}`}
                          />
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
              <div className="form-control">
                <InputLabel
                  className="date-text"
                  htmlFor="start_date"
                  required={true}
                  shrink={true}
                >
                  Release Date Start
                </InputLabel>
                <FormControl className={multiSelect.formControl}>
                  <TextField id="start_date" type="date" />
                </FormControl>
              </div>
              <div className="form-control">
                <InputLabel
                  className="date-text"
                  htmlFor="end_date"
                  required={true}
                  shrink={true}
                >
                  Release Date End
                </InputLabel>
                <FormControl className={multiSelect.formControl}>
                  <TextField id="end_date" type="date" />
                </FormControl>
              </div>
              <div className="form-control">
                <Button
                  variant="contained"
                  color="primary"
                  className={multiSelect.formControl}
                >
                  APPLY
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
