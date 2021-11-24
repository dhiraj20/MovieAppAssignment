import React from 'react';
import Header from '../../common/header/Header';
import UpcomingMovies from '../UpcomingMovies/UpcomingMovies';
import RunningMovies from '../RunningMovie/RunningMovie';

export default function Home(props) {
  return (
    <div>
      <Header baseUrl={props.baseUrl} />
      <UpcomingMovies baseUrl={props.baseUrl} />
      <RunningMovies baseUrl={props.baseUrl} />
    </div>
  );
}
