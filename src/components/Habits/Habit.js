import { useContext, useEffect, useState } from 'react';
import classes from './habits.module.css';
import { useHttp } from '../../hook/api-call';
import { Week } from './Week';
import { HabitsContext } from '../data/habits-context';

export const Habit = (props) => {

    const [strikeDOM, setStrikeDOM] = useState(props.data.strike);
    const [width, setWidth] = useState(window.innerWidth)
    const [mobile, setMobile] = useState(width < 550)
    const sendRequest = useHttp()
    const ctx = useContext(HabitsContext);
    let strike = strikeDOM;

    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth))
    }, [])

    useEffect(() => {
        if (mobile !== width < 550) {
            setMobile(width < 550);
            props.mobile(width < 550);

        };
    }, [width])

    const passingStrike = () => {
        setStrikeDOM(strike);
        sendRequest(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users/${props.user}/habits/${props.habitId}/strike.json`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(strike)
            });
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
            { method: 'DELETE' }
        );
        setTimeout(() => { props.onDelete() }, 60);
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
            {mobile ? <div></div> :<h2>{strikeDOM}</h2>}
            <Week decrease={decrementHandler} increase={incrementHandler} habitId={props.habitId} responsive={props.responsive}/>
            <h1 onClick={deleteHandler}>x</h1>
        </div>
    );
};