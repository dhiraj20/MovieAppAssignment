import React, {useEffect, useState} from 'react';
import './UpcomingMovies.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {ImageList, ImageListItem, ImageListItemBar} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'row',
        width: '400px',
        overflow: 'auto',
        backgroundColor: theme.palette.background.paper,
    },
    control: {
        padding: theme.spacing(2),
    },
}));


export default function UpcomingMovies(props) {
    const baseUrl = props.baseUrl;
    const classes = useStyles();
    const [movies, setMovies] = useState([]);


    useEffect(() => {
        let mounted = true;
        if (mounted) {
            fetch(`${baseUrl}movies`)
                .then(response => response.json())
                .then(data => {
                    setMovies(data.movies);
                });
        }
        return () => {
            setMovies([])
            mounted = false;
        };
    }, [])

    return (
        <div>
            <div className="upcomingmovieheader">Upcoming Movies</div>
            <div className="upcomingmoviecontainer">
                <ImageList  cols={6} rowHeight={250} className="flexscroll">
                    {movies.map(movie => (
                        <ImageListItem key={movie.poster_url}>
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

        </div>
    )
}