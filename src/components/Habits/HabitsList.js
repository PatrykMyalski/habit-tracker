import classes from './habits.module.css'
import { Habit } from './Habit';

export const HabitsList = () => {

    const DUMMY_HABITS = [{ habit: 'Meditation', strike: 13 }, { habit: 'Gym', strike: 4 }, { habit: 'Streth', strike: 20 }]



    return (
        <div className={classes.container}>
            {DUMMY_HABITS.map(item => {
                return <Habit key={Math.random()} data={item} />
            })}
        </div>
    )
};