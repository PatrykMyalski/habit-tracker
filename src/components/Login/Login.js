import React from 'react';
import classes from './login.module.css';
import { Backdrop } from '../Backdrop/Backdrop'
import ReactDOM from "react-dom";



const ModalOverlay = (props) => {


    const submitHandler = (event) => {
        event.preventDefault();
    };

    return (
        <form className={classes.container} onSubmit={submitHandler}>
            <div>
                <input type='text' placeholder='Username' className={classes.login_input} />
            </div>
            <button type='button'>Sign up</button>
            <button type='submit'>Login</button>
        </form>
    )
};

export const Login = () => {

    const clickHandler = () => { };



    return (
        <React.Fragment>
            <Backdrop onClick={clickHandler} />
            {ReactDOM.createPortal(
                <ModalOverlay />,
                document.getElementById('modal-root'))}
        </React.Fragment>
    )
};