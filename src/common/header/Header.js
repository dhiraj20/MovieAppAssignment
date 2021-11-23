import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import './header.css';
import logo from '../../assets/logo.svg';
import Authenticate from "../../screens/authenticate/Authenticate";

export default function Header(props) {
    const [modalIsOpen, setIsOpen] = useState(false);

    function login() {
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
            >LOGOUT</Button>
            {
                props.showBookShowBtn && (
                    <Button className="btn"
                            variant="contained"
                            onClick={() => {}}
                            color="primary"
                    >BOOK SHOW</Button>
                )
            }
            <Authenticate modalOpen={modalIsOpen} closeModal={modalClose}/>
        </div>
    )
}