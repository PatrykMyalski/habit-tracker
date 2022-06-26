import { useContext, useState } from "react";
import { useHttp } from "../../hook/api-call";
import { HabitsContext } from "../data/habits-context";

export const WeekDay = (props) => {

    const [color, setColor] = useState(false);
    const [timeId, setTimeId] = useState(null);
    const { sendRequest: dateHandler } = useHttp();
    const ctx = useContext(HabitsContext);


    const clickHandler = () => {
        setColor(!color);
        if (!color) {
            dateHandler(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users/${ctx.key}/habits/${props.habitId}/whenCompleted/.json`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ date: props.dateMS })
                }, succesful, unsuccesful);
        } else {
            dateHandler(`https://habit-tracker-b1444-default-rtdb.europe-west1.firebasedatabase.app/data/users/${ctx.key}/habits/${props.habitId}/whenCompleted/${timeId}.json`,
                { method: 'DELETE' }, succesfulDelete, unSuccesfulDelete);
        };
        color ? props.decrease() : props.increase();
    };
    const succesful = (data) => {
        setTimeId(data.name);
    };

    const unsuccesful = () => { };
    const succesfulDelete = () => { };
    const unSuccesfulDelete = () => { };

    const complete = {
        color: 'rgb(0, 180, 0)'
    };

    const incomplete = {
        color: 'red'
    };

    return <h4 onClick={clickHandler} style={color ? complete : incomplete} >{props.day}</h4>
};


// na wczytaniu porównujemy dateMS z firebase skonwertowaną do dzien/miesiąc/rok do daty z obecnego WeekDay skonwertowanej do dzien/miesiąc/rok