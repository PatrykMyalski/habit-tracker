import React, { useContext, useState } from 'react';
import classes from './register.module.css';
import { Backdrop } from '../Backdrop/Backdrop';
import ReactDOM from "react-dom";
import { useHttp } from '../../hook/api-call';
import { HabitsContext } from '../data/habits-context';



const ModalOverlay = (props) => {

    const [newUserName, setNewUserName] = useState(null);
    const [shortError, setShortError] = useState(false);
    const [taken, setTaken] = useState(false);
    const { sendRequest: register } = useHttp();
    const ctx = useContext(HabitsContext);

    let usernameTaken = false;

    const submitHandler = (event) => {
        event.preventDefault();

        usernameTaken = ctx.users.some(item => item.trim() === newUserName.trim());

        if (newUserName.trim().length > 2 & !usernameTaken) {
            register(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users.json`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        habits: ['noHabits'],
                        user: newUserName
                    })
                },
                registerUser, invalidUser);
            ctx.isLoggedIn = true;
            props.onClick();
        } else {
            if (usernameTaken) {
                setTaken(true);
                setShortError(false);
            } else {
                setShortError(true);
                setTaken(false);
            };
        };

    };

    const registerUser = () => { };
    const invalidUser = () => { };

    return (
        <form className={classes.container} onSubmit={submitHandler}>
            <h1>Create Acount</h1>
            <div>
                <input type='text' placeholder='Username'
                    className={`${classes.register_input} ${shortError || taken ? classes.invalid : ''}`}
                    onChange={(event) => { setNewUserName(event.target.value) }}
                />
                {shortError && <h2>Username must have at least 3 letters!</h2>}
                {taken && <h2>Username is taken!</h2>}
            </div>
            <button type='submit'>Sign up</button>
        </form>
    );
};

export const Register = (props) => {

    return (
        <React.Fragment>
            <Backdrop />
            {ReactDOM.createPortal(
                <ModalOverlay onClick={props.onClick} />,
                document.getElementById('modal-root'))}
        </React.Fragment>
    );
};