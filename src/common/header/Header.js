import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import './header.css';
import logo from '../../assets/logo.svg';
import Login from "../../screens/login/Login";

export default function Header() {
    const [modalIsOpen, setIsOpen] = useState(false);

    function login() {
        console.log("login clicked");
        setIsOpen(true);
    }

    function modalClose() {
        setIsOpen(false);
    }

    return (
        <div className="header">
            <img className="logo" src={logo} alt="logo" />
            <Button className="btn"
                variant="contained"
                onClick={login}
                color="default"
            >LOGIN</Button>
            <Button className="btn"
                    variant="contained"
                    color="default"
                    ml={2}
            >LOGOUT</Button>
            <Button className="btn "
                    variant="contained"
                    onClick=""
                    color="primary"
                    ml={2}
            >BOOK SHOW</Button>
            <Login modalOpen={modalIsOpen} closeModal={modalClose}/>
        </div>
    )
}