import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import './header.css';
import logo from '../../assets/logo.svg';
import Authenticate from "../../screens/authenticate/Authenticate";
import {useHistory} from "react-router-dom";

export default function Header(props) {
    let history = useHistory();
    const [modalIsOpen, setIsOpen] = useState(false);

    function login() {
        setIsOpen(true);
    }

    function modalClose() {
        setIsOpen(false);
    }

    const bookShow = () => history.push(`/bookshow/${props.id}`);


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
            >LOGOUT</Button>
            {
                props.showBookShowBtn && (
                    <Button className="btn"
                            variant="contained"
                            onClick={bookShow}
                            color="primary"
                    >BOOK SHOW</Button>
                )
            }
            <Authenticate modalOpen={modalIsOpen} closeModal={modalClose}/>
        </div>
    )
}