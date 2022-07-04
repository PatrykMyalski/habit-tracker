import { HabitsList } from './components/Habits/HabitsList';
import { InputForm } from './components/InputForm/InputForm';
import { AddHabitButton } from './components/AddHabit/AddHabitButton';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { useReducer } from 'react';



const navReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, showLogin: !state.showLogin };
    case 'LOGIN-REGISTER':
      return { ...state, showLogin: !state.showLogin, showRegister: !state.showRegister };
    case 'REGISTER':
      return { ...state, showRegister: !state.showRegister, showLogin: !state.showLogin };
    case 'ADD-NEW':
      return { ...state, showAddHabit: !state.showAddHabit };
    default:
      return state;
  };

};

function App() {

  const [navState, dispatchNav] = useReducer(navReducer, {
    showLogin: true,
    showRegister: false,
    showAddHabit: false,
  });

  const loginHandler = () => {
    dispatchNav({ type: 'LOGIN' });
  };
  const newUserHandler = () => {
    dispatchNav({ type: 'LOGIN-REGISTER' });
  };
  const registerHandler = () => {
    dispatchNav({ type: 'REGISTER' });
  };
  const addHabitHandler = () => {
    dispatchNav({ type: 'ADD-NEW' });
  };

  return (
    <div style={{textAlign: 'center'}}>
      {!navState.showLogin & !navState.showRegister && <AddHabitButton onClick={addHabitHandler} />}
      {!navState.showLogin & !navState.showRegister && <HabitsList /> }
      {navState.showLogin && <Login onClick={loginHandler} onRegister={newUserHandler} />}
      {navState.showRegister && <Register onClick={registerHandler} />}
      {navState.showAddHabit && <InputForm onClick={addHabitHandler} />}
    </div>
  );
};

export default App;
