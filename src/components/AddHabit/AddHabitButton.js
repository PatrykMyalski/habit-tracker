 import classes from './addHabitButton.module.css';
 export const AddHabitButton = () => {
    
    const addHandler = () => {

    };
    return (
        <button type="button" onClick={addHandler} className={classes.btn}>+ Add Habit</button>
    )
 };

 // po kliknięciu przycisku otwiera się modal z form dodania nowego habit