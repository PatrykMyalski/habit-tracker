import React from 'react';
import classes from './inputForm.module.css';
import { Backdrop } from '../Backdrop/Backdrop'
import ReactDOM from "react-dom";

const ModalOverlay = (props) => {

    return (
        <form className={classes.container} onSubmit={props.onSubmit}>
            <input type='text' placeholder='Habit name' />
            <input type="radio" id="daliy" name="choosen" value="Daliy" />
            <label for="daliy">Daliy</label>
            <input type="radio" id="weekly" name="choosen" value="Weekly" />
            <label for="weekly">Weekly</label>
            <input type="radio" id="monthly" name="choosen" value="Monthly" />
            <label for="monthly">Monthly</label>
            <button type='submit'>Submit</button>
        </form>
    )
};

export const InputForm = () => {

    const clickHandler = () => {};

    const submitHandler = () => {};
    
    return (
        <React.Fragment>
            <Backdrop onClick={clickHandler} />
            {ReactDOM.createPortal(
            <ModalOverlay onSubmit={submitHandler} />,
            document.getElementById('modal-root'))}
        </React.Fragment>
    )
};

