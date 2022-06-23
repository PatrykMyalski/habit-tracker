import classes from './habits.module.css';

export const Habit = (props) => {

    const incrementHandler = () => {};
    const decrementHandler = () => {};


    return (
        <div className={classes.habit}>
            <h2 className={classes.name}>{props.data.name}</h2>
            <h2>{props.data.strike}</h2>
            <div className={classes.btn_container}>
                <button type='button' onClick={incrementHandler} className={classes.increment}>+</button>
                <button type='button' onClick={decrementHandler} className={classes.decrement}>-</button>
            </div>
        </div>
    );
};