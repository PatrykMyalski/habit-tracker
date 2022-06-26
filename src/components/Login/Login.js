import React, { useContext, useState } from 'react';
import classes from './login.module.css';
import { Backdrop } from '../Backdrop/Backdrop';
import ReactDOM from "react-dom";
import { useHttp } from '../../hook/api-call';
import { HabitsContext } from '../data/habits-context';


const ModalOverlay = (props) => {

    const [username, setUserName] = useState(null);
    const [showError, setShowError] = useState(false);
    const { sendRequest: login } = useHttp();
    const ctx = useContext(HabitsContext);

    const submitHandler = (event) => {
        event.preventDefault();
        login(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users.json`,
            { method: 'GET' }, loginUser, invalidUser);
    };


    // let date = new Date();
    // console.log(date.getDate())

    const loginUser = (data) => {
        for (const item in data) {
            if (data[item].user === username.trim()) {
                ctx.key = item;
                ctx.data = data[item];
                props.onClick();
            } else {
                invalidUser();
            };
        };
    };

    const invalidUser = () => {
        console.log('no')
        setShowError(true);
    };

    const registerHandler = () => {
        login(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users.json`,
        { method: 'GET' }, saveUsersToContext, invalidUser);
    };

    const saveUsersToContext = (data) => {
        console.log('yes')
        let usersArr = []
        for (const item in data) {
            usersArr.push(data[item].user);
            ctx.users = usersArr;
        }
        props.onRegister();
    };

    return (
        <form className={classes.container} onSubmit={submitHandler}>
            <h1>Login</h1>
            <div>
                <input type='text' placeholder='Username' className={`${classes.login_input} ${showError && classes.invalid}`} onChange={(event) => { setUserName(event.target.value) }} />
                {showError && <h2>Cannot find user.</h2>}
            </div>

            <button type='button' onClick={registerHandler}>Sign up</button>
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