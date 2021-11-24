import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './header.css';
import logo from '../../assets/logo.svg';
import Authenticate from '../../screens/authenticate/Authenticate';
import { useHistory } from 'react-router-dom';

export default function Header(props) {
  let history = useHistory();
  const accessKey = sessionStorage.getItem('access-token');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [accessToken, setAccessToken] = useState(accessKey);

  function login() {
    setIsOpen(true);
  }

  function logout() {
    sessionStorage.clear();
    setAccessToken(null);
  }

  function modalClose() {
    setIsOpen(false);
  }

  const bookShow = () => {
    if (accessToken) {
      history.push(`/bookshow/${props.id}`);
      return;
    }
    login();
  };

  return (
    <div className="header">
      <img className="logo imageRotateHorizontal" src={logo} alt="logo" />
      {!accessToken && (
        <Button
          className="btn"
          variant="contained"
          onClick={login}
          color="default"
        >
          LOGIN
        </Button>
      )}
      {accessToken && (
        <Button
          className="btn"
          variant="contained"
          color="default"
          onClick={logout}
        >
          LOGOUT
        </Button>
      )}
      {props.showBookShowBtn && (
        <Button
          className="btn"
          variant="contained"
          onClick={bookShow}
          color="primary"
        >
          BOOK SHOW
        </Button>
      )}
      <Authenticate modalOpen={modalIsOpen} closeModal={modalClose} />
    </div>
  );
}
