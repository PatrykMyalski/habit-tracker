 import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import classes from './addHabitButton.module.css';
 export const AddHabitButton = (props) => {
    
    return (
        <button type="button" onClick={props.onClick} className={classes.btn}>+ Add Habit</button>
    )
 };

 // po kliknięciu przycisku otwiera się modal z form dodania nowego habit