import { useState } from 'react';
import classes from './habits.module.css';
import { useHttp } from '../../hook/api-call';

export const Habit = (props) => {

    const [strikeDOM, setStrikeDOM] = useState(props.data.strike);
    const { sendRequest: sendStrike } = useHttp()
    let strike = strikeDOM;

    const passingStrike = () => {
        setStrikeDOM(strike);
        sendStrike(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users/${props.user}/habits/${props.habitId}/strike.json`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(strike)
            },
            succesfulUpdate, unSuccesfulUpdate);
    };

    const succesfulUpdate = () => { };
    const unSuccesfulUpdate = () => { };

    const incrementHandler = () => {
        strike = strike + 1;
        passingStrike();
    };

    const decrementHandler = () => {
        if (strike === 0) {
            return;
        } else {
            strike = strike - 1;
            passingStrike();
        };
    };

    return (
        <div className={classes.habit}>
            <h2 className={classes.name}>{props.data.name}</h2>
            <h2>{strike}</h2>
            <div className={classes.btn_container}>
                <button type='button' onClick={incrementHandler} className={classes.increment}>+</button>
                <button type='button' onClick={decrementHandler} className={classes.decrement}>-</button>
            </div>
        </div>
    );
};