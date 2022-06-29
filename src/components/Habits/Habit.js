import { useContext, useState } from 'react';
import classes from './habits.module.css';
import { useHttp } from '../../hook/api-call';
import { Week } from './Week';
import { HabitsContext } from '../data/habits-context';

export const Habit = (props) => {

    const [strikeDOM, setStrikeDOM] = useState(props.data.strike);
    const { sendRequest: sendRequest } = useHttp()
    const ctx = useContext(HabitsContext);
    let strike = strikeDOM;


    const passingStrike = () => {
        setStrikeDOM(strike);
        sendRequest(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users/${props.user}/habits/${props.habitId}/strike.json`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(strike)
            },
            succesfulUpdate, unSuccesfulUpdate);
    };
    
    const deleteHandler = () => {
        if (ctx.habitsCount === 1) {
            sendRequest(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users/${props.user}/habits/.json`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(['noHabits'])
            });
        };
        sendRequest(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users/${props.user}/habits/${props.habitId}/.json`, 
        {method: 'DELETE'}, succesfulDelete, unSuccesfulUpdate)
        setTimeout(() => {props.onDelete()}, 40)
        
        
    };

    const succesfulDelete = () => {
    };
    const succesfulUpdate = () => { };
    const unSuccesfulUpdate = () => { 
    };

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
            <h2>{strike}</h2>
            <Week decrease={decrementHandler} increase={incrementHandler} habitId={props.habitId} />
            <h1 onClick={deleteHandler}>x</h1>
        </div>
    );
};