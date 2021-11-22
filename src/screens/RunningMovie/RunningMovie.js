import React, {useEffect, useState} from 'react';
import './RunningMovie.css';
import {
    Checkbox,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    ListItemText,
    makeStyles,
    MenuItem,
    Select
} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 240,
        maxWidth: 240
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        color: theme.palette.primary.light
    },
    pos: {
        marginBottom: 12,
    },
}));


export default function RunningMovies(props) {

    const classes = useStyles();
    let history = useHistory();
    const baseUrl = props.baseUrl;

    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState([]);
    const [genre, setGenre] = useState([]);
    const [artists, setArtists] = useState([]);
    const [start_date, setStartDate] = useState([]);
    const [end_date, setEndDate] = useState([]);
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            fetch(`${baseUrl}/movies`)
                .then(response => response.json())
                .then(data => {
                    setMovies(data.movies)
                });
        }
        return () => {
            setMovies([])
           mounted = false;
        };
    }, [])

    const handleRoute = (id) => history.push(`/movie/${id}`);

    return (
        <div className="runningmoviecontainer">
            <div className="left">
                <ImageList cols={4} rowHeight={350}>
                    {movies.map(movie => (
                        <ImageListItem key={movie.poster_url} className="imageitem"
                                       onClick={handleRoute.bind(this, movie.id)}>
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
                        <div className={classes.title}>
                            FIND MOVIE BY:
                        </div>
                        <form className="form">
                            <div className="form-control">
                                <FormControl>
                                    <InputLabel htmlFor="moviename" required={true}>Movie Name</InputLabel>
                                    <Input id="moviename" name="title" aria-describedby="title" type="text"
                                           onChange={e => setTitle(e.target.value)} defaultValue={title}/>
                                </FormControl>
                            </div>
                            <div className="form-control">
                                <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                                    <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                                    <Select
                                        multiple
                                        value={genre}
                                        onChange={setGenre}
                                        input={<Input/>}
                                        renderValue={(selected) => selected.join(", ")}
                                    >
                                        <MenuItem>
                                            <Checkbox/>
                                            <ListItemText primary="name"/>
                                        </MenuItem>

                                    </Select>
                                </FormControl>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}