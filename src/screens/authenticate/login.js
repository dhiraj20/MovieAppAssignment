import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import './login.css';
import React from "react";

export default function Login() {
    function changeEvent() {

    }

    function submitForm() {

    }
    return (
        <form className="form">
            <div className="form-control">
                <FormControl>
                    <InputLabel htmlFor="username" required={true}>Username</InputLabel>
                    <Input id="username" name="username" aria-describedby="username"
                           onChange={changeEvent}/>
                </FormControl>
            </div>
            <div className="form-control">
                <FormControl>
                    <InputLabel htmlFor="password" required={true}>Password</InputLabel>
                    <Input id="password" name="password" aria-describedby="password"
                           onChange={changeEvent}/>
                </FormControl>
            </div>
            <div className="btn">
                <Button variant="contained" color="primary" onClick={submitForm}>
                    LOGIN
                </Button>
            </div>
        </form>
    )
}