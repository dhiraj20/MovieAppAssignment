import React, {useEffect, useState} from "react";
import Header from "../../common/header/Header";
import './Detals.css'
import Typography from '@material-ui/core/Typography';
import {ImageList, ImageListItem, ImageListItemBar, Link, makeStyles} from "@material-ui/core";
import YouTube from 'react-youtube';
import Rating from '@material-ui/lab/Rating';
import {useHistory} from "react-router-dom";

export default function Details(props) {

    const baseUrl = props.baseUrl;
    const [movie, setMovie] = useState({});
    const [value, setValue] = React.useState(0);
    let history = useHistory();
    const useStyles = makeStyles((theme) => ({
        root: {
            marginLeft: '24px',
            marginTop: '8px',
            marginBottom: '0px',
            height: '24px',
            cursor: 'pointer',
            width: '120px'
        },
    }));

    // Youtube screen size
    const opts = {
        height: '500px',
        width: '100%',
    };

    const classes = useStyles();

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            async function fetchMyAPI() {
                let response = await fetch(`${baseUrl}movies/${props.match.params.id}`);
                response = await response.json()
                setMovie(response);
            }

            fetchMyAPI();
        }
        return () => {
            setMovie({})
            mounted = false;
        };
    }, [])

    function getFullName(fname, lname) {
        return <span>{`${fname} ${lname}`}</span>
    }

    function onReady(event) {
        event.target.pauseVideo();
    }

    function getUrlId(url) {
        return url.split('=')[1];
    }

    const backToHome = () => history.push('/');

    return (
        <div>
            <Header showBookShowBtn='true'/>
            <Typography className={classes.root} onClick={backToHome}>&#60; Back to Home</Typography>
            {
                movie && <div className="detailscontainer">

                    {/*left part*/}
                    <div className="left">
                        <ImageList rowHeight={350}>
                            <ImageListItem key={movie.poster_url} className="listitem">
                                <img
                                    src={movie.poster_url}
                                    srcSet={movie.poster_url}
                                    alt={movie.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        </ImageList>
                    </div>

                    {/*middle part*/}
                    <div className="middle">
                        <Typography variant="h5" component="h2">{movie.title}</Typography>
                        <Typography><span className="boldtext">Genre: </span>{movie.genres && (
                            movie.genres.join(',')
                        )}</Typography>
                        <Typography><span className="boldtext">Duration: </span>{movie.duration}</Typography>
                        <Typography><span className="boldtext">Release Date: </span>{movie.release_date}</Typography>
                        <Typography><span className="boldtext">Rating: </span>{movie.rating}</Typography>
                        <Typography className="mt16"><span className="boldtext">Plot: </span>
                            <Link href={movie.wiki_url}>(Wiki Link)</Link> {movie.storyline}
                        </Typography>
                        <Typography className="mt16"><span className="boldtext">Trailer: </span></Typography>
                        {
                            movie.trailer_url &&
                            <YouTube videoId={getUrlId(movie.trailer_url)} opts={opts} onReady={onReady}/>
                        }
                    </div>

                    {/*right part*/}
                    <div className="right">
                        <Typography><span className="boldtext">Rate this movie:</span></Typography>
                        <Rating
                            name="simple-controlled"
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                        <Typography className="mt16"><span className="boldtext">Artists:</span></Typography>
                        <div className="artists">
                            {movie.artists && (
                                <ImageList cols={2}>
                                    {movie.artists.map(movie => (
                                        <ImageListItem key={movie.profile_url} className="imageitem">
                                            <img
                                                src={movie.profile_url}
                                                srcSet={movie.profile_url}
                                                alt={movie.title}
                                                loading="lazy"
                                            />
                                            <ImageListItemBar
                                                title={getFullName(movie.first_name, movie.last_name)}
                                            />
                                        </ImageListItem>
                                    ))}
                                </ImageList>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}