import classes from './App.module.css';
import { HabitsList } from './components/Habits/HabitsList';
import { InputForm } from './components/InputForm/InputForm';
import { AddHabitButton } from './components/AddHabit/AddHabitButton';

function App() {
  return (
    <div className={classes.main}>
      <AddHabitButton />
      <HabitsList />
      <InputForm />
    </div>
  );
};

export default App;
