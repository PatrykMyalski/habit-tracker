import React from 'react';
import classes from './register.module.css';
import { Backdrop } from '../Backdrop/Backdrop'
import ReactDOM from "react-dom";



const ModalOverlay = (props) => {

    const submitHandler = (event) => {
        event.preventDefault();
        // validating register username
        // making api
        // if validated 
        props.onClick()
    };

    return (
        <form className={classes.container} onSubmit={submitHandler}>
            <h1>Create Acount</h1>
            <div>
                <input type='text' placeholder='Username' className={classes.login_input} />
            </div>
            <button type='submit'>Sign up</button>
        </form>
    )
};

export const Register = (props) => {





    return (
        <React.Fragment>
            <Backdrop />
            {ReactDOM.createPortal(
                <ModalOverlay onClick={props.onClick}/>,
                document.getElementById('modal-root'))}
        </React.Fragment>
    )
};