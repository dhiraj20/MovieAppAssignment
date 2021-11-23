import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import './Authenticate.css';

const baseUrl = '/api/v1/';

export default function Login(props) {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [usernameError, setUsernameError] = useState(false);
  let [passwordError, setPasswordError] = useState(false);
  async function submitForm() {
    if (isFormValid()) {
      let authorization = btoa(`${username}:${password}`);
      let response = await fetch(`${baseUrl}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'authorization': `Basic ${authorization}`
        },
      });
      response = await response.json();
      if (response.code === "USR-003") {
        console.log('an error ');
        return;
      }
      sessionStorage.setItem('user-detail', JSON.stringify(response));
      sessionStorage.setItem('access-token', authorization);
      window.location.reload();
      props.closeModal();
    }
  }

  function isFormValid() {
    username === '' ? setUsernameError(true) : setUsernameError(false);
    password === '' ? setPasswordError(true) : setPasswordError(false);
    console.log(username, password);
    return username && password;
  }

  return (
    <form className="form">
      <div className="form-control">
        <FormControl error={usernameError}>
          <InputLabel htmlFor="username" required={true}>
            Username
          </InputLabel>
          <Input
            id="username"
            name="username"
            aria-describedby="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            defaultValue={username}
          />
        </FormControl>
      </div>
      <div className="form-control">
        <FormControl error={passwordError}>
          <InputLabel htmlFor="password" required={true}>
            Password
          </InputLabel>
          <Input
            id="password"
            name="password"
            aria-describedby="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            defaultValue={password}
          />
        </FormControl>
      </div>
      <div className="btn">
        <Button variant="contained" color="primary" onClick={submitForm}>
          LOGIN
        </Button>
      </div>
    </form>
  );
}
