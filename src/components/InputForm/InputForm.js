import React, { useContext, useState } from 'react';
import classes from './inputForm.module.css';
import { Backdrop } from '../Backdrop/Backdrop';
import ReactDOM from "react-dom";
import { HabitsContext } from '../data/habits-context';
import { useHttp } from '../../hook/api-call';

const ModalOverlay = (props) => {

    const ctx = useContext(HabitsContext);
    const [habitName, setHabitName] = useState('');
    const [habitInterval, setHabitInterval] = useState('daily');
    const [habitExist, setHabitExist] = useState(false);
    const { sendRequest: addHabit } = useHttp();

    const existingHabits = ctx.data.habits;

    const validationCheck = () => {
        if (existingHabits[0] === 'noHabits') {
            addHabit(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users/${ctx.key}/habits/0/.json`,
                { method: 'DELETE' }, succesfulDelete, unSuccesfulDelete);
            return true;
        } else {
            for (const item in existingHabits) {
                if (existingHabits[item].name.trim() === habitName.trim()) {
                    setHabitExist(true);
                    return false;
                };
            };
            return true;
        };

    };
    const submitHandler = (event) => {
        event.preventDefault();
        if (habitName.trim().length > 2) {
            if (validationCheck()) {
                addHabit(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users/${ctx.key}/habits.json`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ name: habitName, strike: 0, interval: habitInterval })
                    },
                    habitsAdded, invalidRequest);
            };
        };
    };

    const succesfulDelete = () => { };
    const unSuccesfulDelete = () => { };

    const habitsAdded = () => {
        ctx.added++
        props.onClick();
    };

    const invalidRequest = () => { };

    return (
        <form className={classes.container} onSubmit={submitHandler}>
            <div>
                <input type='text' placeholder='Habit name' className={`${classes.habit_input} ${habitExist && classes.invalid}`} onChange={(event) => { setHabitName(event.target.value) }} />
                {habitExist && <h2>That habit already exist!</h2>}
            </div>
            <div>
                <select name="duration" id="duration" onChange={(event) => { setHabitInterval(event.target.value) }}>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </div>
            <button type='submit'>Submit</button>
        </form>
    );
};

export const InputForm = (props) => {

    const clickHandler = () => {
        props.onClick();
    };

    return (
        <React.Fragment>
            <Backdrop onClick={clickHandler} />
            {ReactDOM.createPortal(
                <ModalOverlay onClick={clickHandler} />,
                document.getElementById('modal-root'))}
        </React.Fragment>
    )
};