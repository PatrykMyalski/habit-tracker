import classes from './habits.module.css';
import { WeekDay } from './WeekDay';

export const Week = (props) => {

    const dayInMS = 86400000;
    const now = Date.now();
    const today = new Date(now).getDay();

    const week = [
        { value: 0, weekDay: 'Sun' },
        { value: 6, weekDay: 'Sat' },
        { value: 5, weekDay: 'Fri' },
        { value: 4, weekDay: 'Thu' },
        { value: 3, weekDay: 'Wed' },
        { value: 2, weekDay: 'Tue' },
        { value: 1, weekDay: 'Mon' }
    ];

    let newWeek = [];
    let i = 0;
    for (i in week) {
        if (week[i].value === today) {
            const removed = week.splice(0, i);
            newWeek = week.concat(removed);
            let j = 0;
            for (j in newWeek) {
                newWeek[j] = { ...newWeek[j], date: now - j * dayInMS };
            }
            break;
        };
    };

    return (
        <div className={classes.weekContainer}>
            {newWeek.map(item => {
                return <WeekDay
                    key={item.value} day={item.weekDay}
                    dateMS={item.date} decrease={props.decrease}
                    increase={props.increase} habitId={props.habitId}
                />
            })}
        </div>
    );
};