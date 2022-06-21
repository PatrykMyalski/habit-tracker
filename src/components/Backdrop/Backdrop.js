import classes from './backdrop.module.css';
import React from "react";
import ReactDOM from "react-dom";


// Backdrop przeznaczony do wielokrotnego użytku 
export const Backdrop = (props) => {

    return (
        <React.Fragment>
            {ReactDOM.createPortal(
            <div className={classes.backdrop} onClick={props.onClick} />,
            document.getElementById('backdrop-root'))}
        </React.Fragment>
    );
};

