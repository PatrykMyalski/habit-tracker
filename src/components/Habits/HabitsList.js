import classes from './habits.module.css';
import { Habit } from './Habit';
import { HabitsContext } from '../data/habits-context';
import { useContext, useEffect, useState } from 'react';
import { useHttp } from '../../hook/api-call';

export const HabitsList = () => {

    const ctx = useContext(HabitsContext);

    const { sendRequest: getHabits } = useHttp();
    const [habits, setHabits] = useState(ctx.data.habits);


    useEffect(() => {

        getHabits(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users/${ctx.key}.json`,
            { method: 'GET' }, habitsProvider, errorHandler);

    }, [ctx.added]);

    const habitsProvider = (data) => {
        setHabits(data.habits);
        ctx.data = data;
    };

    const errorHandler = () => { };

    let show = [];
    for (const item in habits) {
        if (habits[item] === 'noHabits') {
            show = <h1 key={Math.random()}>Add First Habit!</h1>;
        } else {
            show.push(<Habit key={Math.random()} data={habits[item]} user={ctx.key} habitId={item}/>);
        };
    };

    return (
        <div className={classes.container}>
            <div className={classes.info}>
                <h2 className={classes.info_name}>Habit name</h2>
                <h2>Last 7 days</h2>
                <h2 className={classes.info_counter}>Times Completed</h2>
            </div>
            {show}
        </div>
    );
};
