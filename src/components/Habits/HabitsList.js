import classes from './habits.module.css';
import { Habit } from './Habit';
import { HabitsContext } from '../data/habits-context';
import { useContext, useEffect, useState } from 'react';
import { useHttp } from '../../hook/api-call';

export const HabitsList = () => {

    const ctx = useContext(HabitsContext);

    const getHabits = useHttp();
    const [habits, setHabits] = useState(ctx.data.habits);
    const [update, setUpadte] = useState(false);
    const [showInfo, setShowInfo] = useState(false);


    let show = [];
    useEffect(() => {
        getHabits(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users/${ctx.key}.json`,
            { method: 'GET' }, habitsProvider);

    }, [ctx.added, update]);

    const deleteHandler = () => {
        setUpadte(!update);
    };
    const habitsProvider = (data) => {
        setHabits(data.habits);
        ctx.data = data;
        ctx.habitsCount = Object.keys(data.habits).length;
    };

    const changeShowInfo = (arg) => {
        if (arg !== showInfo) {
            setShowInfo(arg);
        };
    };

    for (const item in habits) {
        if (habits[item] === 'noHabits') {
            changeShowInfo(false);
            show = <h1 key={Math.random()}>Add Habit!</h1>;
        } else {
            changeShowInfo(true);
            show.push(<Habit key={Math.random()} data={habits[item]} user={ctx.key} habitId={item} onDelete={deleteHandler} />);
        };
    };

    const info =
        <div className={classes.info}>
            <h2 className={classes.info_name}>Habit name</h2>
            <h2 className={classes.info_counter}>Times Completed</h2>
            <h2 className={classes.info_week}>Last 7 days</h2>
            <h2 className={classes.info_delete}>Delete Habit</h2>
        </div>

    return (
        <div className={classes.container}>
            {showInfo && info}
            {show}
        </div>
    );
};
