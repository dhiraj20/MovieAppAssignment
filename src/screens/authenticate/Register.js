import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import './Authenticate.css';
import FormHelperText from '@material-ui/core/FormHelperText';

const baseUrl = '/api/v1/';

export default function Register() {
  let [first_name, setFirstname] = useState('');
  let [last_name, setLastname] = useState('');
  let [email_address, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [mobile_number, setMobileNumber] = useState('');
  let [isFormTouched, setFormTouched] = useState(false);
  let [showSuccessMsg, setSuccessMsg] = useState(false);

  async function submitForm() {
    setFormTouched(true);
    const payload = {
      first_name,
      last_name,
      email_address,
      password,
      mobile_number,
    };
    if (validateForm()) {
      setSuccessMsg(true);
      let response = await fetch(`${baseUrl}signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
        body: JSON.stringify(payload),
      });
      response = await response.json();
      if (response) {
        setSuccessMsg(true);
      }
    }
  }

  function validateForm() {
    return (
      first_name && last_name && email_address && password && mobile_number
    );
  }

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
            defaultValue={first_name}
          />
          {isFormTouched && first_name === '' && (
            <FormHelperText error={true}>required</FormHelperText>
          )}
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
            defaultValue={last_name}
          />
          {isFormTouched && last_name === '' && (
            <FormHelperText error={true}>required</FormHelperText>
          )}
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
            defaultValue={email_address}
          />
          {isFormTouched && email_address === '' && (
            <FormHelperText error={true}>required</FormHelperText>
          )}
        </FormControl>
      </div>
      <div className="form-control">
        <FormControl>
          <InputLabel htmlFor="password" required={true}>
            Password
          </InputLabel>
          <Input
            id="register-password"
            name="password"
            aria-describedby="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            defaultValue={password}
          />
          {isFormTouched && password === '' && (
            <FormHelperText error={true}>required</FormHelperText>
          )}
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
            onChange={(e) => setMobileNumber(e.target.value)}
            defaultValue={mobile_number}
          />
          {isFormTouched && mobile_number === '' && (
            <FormHelperText error={true}>required</FormHelperText>
          )}
        </FormControl>
      </div>
      <div className="btn">
        {showSuccessMsg && (
          <FormHelperText className="successmsg">
            Registration Successful. Please Login!
          </FormHelperText>
        )}
        <Button variant="contained" color="primary" onClick={submitForm}>
          REGISTER
        </Button>
      </div>
    </form>
  );
}
