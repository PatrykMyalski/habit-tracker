const redux = require('redux');
import { createSlice, configureStore } from '@reduxjs/toolkit';


const initialState = {};// tutaj znajdują się początkowe dane naszego habit trackera

const habitSlice = createSlice({
    name: 'habitManager',
    initialState,
    reducers: {
        // tutaj znajdują się reducery naszego store
    }
});


const store = configureStore({
    reducer: habitSlice.reducer
});


export const habitActions = habitSlice.actions;
export default store;


// root.render(<Provider store={store}><App /></Provider>);	// wrapujemy naszą <App /> z Providerem  w którym ustaly wartość store na nasz store
// w komponencie w którym chce użyć actions i odczytać state
// import { useSelector, useDispatch } from 'react-redux';
// import { habitActions } from PATH
// w funkcji
const dispatch = useDispatch();

