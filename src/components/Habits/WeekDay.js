import { useContext, useEffect, useState } from "react";
import { useHttp } from "../../hook/api-call";
import { HabitsContext } from "../data/habits-context";

export const WeekDay = (props) => {

    const [color, setColor] = useState(false);
    const [timeId, setTimeId] = useState(null);
    const dateHandler = useHttp();
    const ctx = useContext(HabitsContext);
    let date = new Date(props.dateMS);
    date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

    const passData = (data) => {
        for (const item in data) {
            if (data[item].date === date) {
                setTimeId(item);
                setColor(true);
                break;
            };
        };
    };

    useEffect(() => {
        dateHandler(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users/${ctx.key}/habits/${props.habitId}/whenCompleted/.json`,
        { method: 'GET' }, passData);
    }, [])

    

    const clickHandler = () => {
        setColor(!color);
        if (!color) {
            dateHandler(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users/${ctx.key}/habits/${props.habitId}/whenCompleted/.json`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ date })
                }, succesful);
                console.log('posting')
        } else {
            console.log('deleting')
            console.log(ctx.key)
            console.log(props.habitId)
            console.log(timeId)
            dateHandler(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users/${ctx.key}/habits/${props.habitId}/whenCompleted/${timeId}.json`,
                { method: 'DELETE' });
        };
        color ? props.decrease() : props.increase();
    };

    const succesful = (data) => {
        setTimeId(data.name);
    };


    const complete = {
        color: 'rgb(0, 180, 0)'
    };

    const incomplete = {
        color: 'red'
    };

    return <h4 onClick={clickHandler} style={color ? complete : incomplete} >{props.day}</h4>
};