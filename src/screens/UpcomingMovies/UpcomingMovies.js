import React, { useEffect, useState } from 'react';
import './UpcomingMovies.css';
import { ImageList, ImageListItem, ImageListItemBar } from '@material-ui/core';

export default function UpcomingMovies(props) {
  const baseUrl = props.baseUrl;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      fetch(`${baseUrl}movies?page=1&limit=200`)
        .then((response) => response.json())
        .then((data) => {
          let upcomingMovie = data.movies.filter(
            (movie) => movie.status === 'PUBLISHED'
          );
          setMovies(upcomingMovie);
        });
    }
    return () => {
      setMovies([]);
      mounted = false;
    };
  }, []);

  return (
    <div>
      <div className="upcomingmovieheader">Upcoming Movies</div>
      <div className="upcomingmoviecontainer">
        <ImageList cols={6} rowHeight={246} className="flexscroll">
          {movies.map((movie) => (
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
  );
}
