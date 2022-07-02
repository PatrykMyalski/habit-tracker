import React from "react";

export const HabitsContext = React.createContext({
    data: null,
    key: null,
    added: 0,
    users: null,
    isLoggedIn: false,
    habitsCount: null
});

