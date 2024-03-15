import React, { useState, useEffect } from 'react';
import StateContext from './StateContext';

const StateProvider = ({ children }) => {
    const [sharedState, setSharedState] = useState(() => {
        const storedState = localStorage.getItem('sharedState');
        return storedState ? JSON.parse(storedState) : { isLoggedIn: false, username: null, role: null };
    });

    // Function to update state
    const updateState = (newState) => {
        setSharedState((prevState) => {
            const updatedState = { ...prevState, ...newState };
            localStorage.setItem('sharedState', JSON.stringify(updatedState));
            return updatedState;
        });
    };

    // Clear localStorage on logout
    const clearLocalStorage = () => {
        localStorage.removeItem('sharedState');
    };

    useEffect(() => {
        // Listen for logout event and clear localStorage
        if (!sharedState.isLoggedIn) {
            clearLocalStorage();
        }
    }, [sharedState.isLoggedIn]);

    return (
        <StateContext.Provider value={{ sharedState, updateState }}>
            {children}
        </StateContext.Provider>
    );
};

export default StateProvider;
