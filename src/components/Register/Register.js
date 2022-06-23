import React from 'react';
import classes from './register.module.css';
import { Backdrop } from '../Backdrop/Backdrop'
import ReactDOM from "react-dom";



const ModalOverlay = (props) => {

    const submitHandler = () => { };

    return (
        <form className={classes.container} onSubmit={submitHandler}>
            <div>
                <input type='text' placeholder='Username' className={classes.login_input} />
            </div>
            <button type='submit'>Sign up</button>
        </form>
    )
};

export const Register = () => {

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