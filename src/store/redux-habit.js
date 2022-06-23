import { createSlice, configureStore } from '@reduxjs/toolkit';
const redux = require('redux');



const navigationInitialState = {
    showLogin: true,
    showRegister: false,
    showAddHabit: false, 
};// tutaj znajdują się początkowe dane naszego habit trackera

const navigationSlice = createSlice({
    name: 'navigation',
    navigationInitialState,
    reducers: {
        login(state){
            state.showLogin = false;
        },
        registerClick(state){
            state.showLogin = false;
            state.showRegister = true;
        },
        register(state){
            state.showRegister = false;
        },
        addHabit(state){
            state.showAddHabit = true;
        },
        closeAddHabit(state){
            state.showAddHabit = false;
        }, 
    }
});


const store = configureStore({
    reducer: navigationSlice.reducer
});


// export const navigationActions = navigationSlice.actions;
// export default store;


// root.render(<Provider store={store}><App /></Provider>);	// wrapujemy naszą <App /> z Providerem  w którym ustaly wartość store na nasz store
// w komponencie w którym chce użyć actions i odczytać state
// import { useSelector, useDispatch } from 'react-redux';
// import { habitActions } from PATH
// w funkcji
//const dispatch = useDispatch();

