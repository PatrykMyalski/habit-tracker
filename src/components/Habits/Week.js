import { useEffect, useState } from 'react';
import classes from './habits.module.css';
import { WeekDay } from './WeekDay';


export const Week = (props) => {

    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 710;
    const [responsive, setResponsive] = useState(width < breakpoint)

    useEffect(() => {
        window.addEventListener("resize", () => setWidth(window.innerWidth))
    }, [])


    // responsive true when width < 710px
    useEffect(() => {
        setResponsive(width < breakpoint)
        if (responsive !== (width < breakpoint)) {
            props.responsive(width < breakpoint)
        };
    }, [width, breakpoint])
    

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
            if (responsive) {
                newWeek.splice(-3)
            }
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