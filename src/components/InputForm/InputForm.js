import React from 'react';
import classes from './inputForm.module.css';
import { Backdrop } from '../Backdrop/Backdrop'
import ReactDOM from "react-dom";

const ModalOverlay = (props) => {

    const submitHandler = () => { };

    return (
        <form className={classes.container} onSubmit={submitHandler}>
            <div>
                <input type='text' placeholder='Habit name' className={classes.habit_input} />
            </div>
            <div>
                <select name="duration" id="duration">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>
            <button type='submit'>Submit</button>
        </form>
    )
};

export const InputForm = () => {

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
