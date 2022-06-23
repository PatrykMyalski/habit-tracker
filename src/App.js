import classes from './App.module.css';
import { HabitsList } from './components/Habits/HabitsList';
import { InputForm } from './components/InputForm/InputForm';
import { AddHabitButton } from './components/AddHabit/AddHabitButton';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';


function App() {




  return (
    <div className={classes.main}>
      <AddHabitButton />
      <HabitsList />      
      <Login />
      <Register />
      {/* <InputForm /> */}
    </div>
  );
};

export default App;
