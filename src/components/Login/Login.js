import React, { useContext, useEffect, useState } from 'react';
import classes from './login.module.css';
import { Backdrop } from '../Backdrop/Backdrop';
import ReactDOM from "react-dom";
import { useHttp } from '../../hook/api-call';
import { HabitsContext } from '../data/habits-context';


const ModalOverlay = (props) => {

    const [username, setUserName] = useState(null);
    const { sendRequest: login } = useHttp();
    const ctx = useContext(HabitsContext);

    const submitHandler = (event) => {
        event.preventDefault();
        login(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users/${username}.json`,
            { method: 'GET' }, loginUser, invalidUser);
    };

    const loginUser = (data) => {
        ctx.data = data;
        props.onClick();
    };

    const invalidUser = () => {
        console.log('INVALID USER'); // jeżeli nie znajdzie usera, wtedy zostanie uruchomiona ta funkcja 
    };

    return (

        <form className={classes.container} onSubmit={submitHandler}>
            <h1>Login</h1>
            <div>
                <input type='text' placeholder='Username' className={classes.login_input} onChange={(event) => { setUserName(event.target.value) }} />
            </div>
            <button type='button' onClick={props.onRegister}>Sign up</button>
            <button type='submit'>Login</button>
        </form>
    );
};

export const Login = (props) => {
    return (
        <>
            <Backdrop />
            {ReactDOM.createPortal(
                <ModalOverlay onClick={props.onClick} onRegister={props.onRegister} />,
                document.getElementById('modal-root'))}
        </>
    );
};