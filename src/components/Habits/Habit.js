import { useState } from 'react';
import classes from './habits.module.css';
import { useHttp } from '../../hook/api-call';
import { Week } from './Week';

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
    const name = props.data.name[0].toUpperCase() + props.data.name.slice(1);

    return (
        <div className={classes.habit}>
            <h2 className={classes.name}>{name}</h2>
            <Week decrease={decrementHandler} increase={incrementHandler} habitId={props.habitId} />
            <h2>{strike}</h2>
            <div className={classes.btn_container}>
            </div>
        </div>
    );
};