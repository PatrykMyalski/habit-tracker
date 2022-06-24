import classes from './habits.module.css'
import { Habit } from './Habit';
import { HabitsContext } from '../data/habits-context';
import { useContext, useEffect } from 'react';

export const HabitsList = () => {

    const ctx = useContext(HabitsContext);

    console.log(ctx.data)


    return (
        <div className={classes.container}>
            {ctx.data.habits.map(item => {
                if (item === 'noHabits') {
                    return <h1 key={Math.random()}>Add First Habit!</h1>
                } else {
                    return <Habit key={Math.random()} data={item} />
                }
                
            })}
        </div>
    )
};