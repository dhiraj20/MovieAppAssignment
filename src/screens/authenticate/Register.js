import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import './Authenticate.css';
import FormHelperText from '@material-ui/core/FormHelperText';

export default function Register() {
  let [firstname, setFirstname] = useState('');
  let [lastname, setLastname] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [contact, setContact] = useState('');

  function submitForm() {
    if (isFormValid()) {
      console.log('form valid');
    }
  }

  function isFormValid() {}

  return (
    <form className="form">
      <div className="form-control">
        <FormControl>
          <InputLabel htmlFor="firstname" required={true}>
            First Name
          </InputLabel>
          <Input
            id="firstname"
            name="firstname"
            aria-describedby="firstname"
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            defaultValue={firstname}
          />
          <FormHelperText error={true}>required</FormHelperText>
        </FormControl>
      </div>
      <div className="form-control">
        <FormControl>
          <InputLabel htmlFor="lastname" required={true}>
            Last Name
          </InputLabel>
          <Input
            id="lastname"
            name="lastname"
            aria-describedby="lastname"
            type="text"
            onChange={(e) => setLastname(e.target.value)}
            defaultValue={lastname}
          />
        </FormControl>
      </div>
      <div className="form-control">
        <FormControl>
          <InputLabel htmlFor="email" required={true}>
            Email
          </InputLabel>
          <Input
            id="email"
            name="email"
            aria-describedby="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={email}
          />
        </FormControl>
      </div>
      <div className="form-control">
        <FormControl>
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
      <div className="form-control">
        <FormControl>
          <InputLabel htmlFor="contact" required={true}>
            Contact No.
          </InputLabel>
          <Input
            id="contact"
            name="contact"
            aria-describedby="contact"
            type="number"
            onChange={(e) => setContact(e.target.value)}
            defaultValue={contact}
          />
        </FormControl>
      </div>
      <div className="btn">
        <Button variant="contained" color="primary" onClick={submitForm}>
          REGISTER
        </Button>
      </div>
    </form>
  );
}
