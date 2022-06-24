import React, { useState } from 'react';
import classes from './register.module.css';
import { Backdrop } from '../Backdrop/Backdrop';
import ReactDOM from "react-dom";
import { useHttp } from '../../hook/api-call';



const ModalOverlay = (props) => {

    const [newUserName, setNewUserName] = useState(null);
    const [shortError, setShortError] = useState(false);
    const [taken, setTaken] = useState(false);
    const { sendRequest: register } = useHttp();

    let usernameTaken = false;

    const submitHandler = (event) => {
        event.preventDefault();

        if (newUserName.trim().length > 2) {
            register(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users.json`,
                { method: 'GET' }, checkIfTaken, invalidUser);
        } else {
            invalidUser('short');
        };
        window.setTimeout(() => {

            if (newUserName.length > 2 & !usernameTaken) {
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
                props.onClick();
            };
        }, 100);

    };
    const checkIfTaken = (data) => {
        let check = false;
        for (const item in data) {
            if (data[item].user === newUserName.trim()) {
                invalidUser('taken');
                check = true;
            };
        };
        if (!check) {
            setTaken(false);
            usernameTaken = false;
        };
    };
    const registerUser = () => { };
    const invalidUser = (type) => {

        if (type === 'taken') {
            setTaken(true);
            setShortError(false);
            usernameTaken = true;
        } else if (type === 'short') {
            setShortError(true);
            setTaken(false);
        };
    };

    return (
        <form className={classes.container} onSubmit={submitHandler}>
            <h1>Create Acount</h1>
            <div>
                <input type='text' placeholder='Username' className={`${classes.register_input} ${shortError || taken && classes.invalid}`} onChange={(event) => { setNewUserName(event.target.value) }} />
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