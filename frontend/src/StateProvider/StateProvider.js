import React, { useState, useEffect } from 'react';
import constants from "../constants.json";
import StateContext from './StateContext';

const StateProvider = ({ children }) => {
    const [sharedState, setSharedState] = useState(() => {
        let storedState = localStorage.getItem('sharedState');
        storedState = storedState ? JSON.parse(storedState) : { isLoggedIn: false, username: null, role: null };
        if (storedState.isLoggedIn) {
            fetch(`${constants.API_BASE_URL}/users/me`, { credentials: 'include' }).then(async (response) => {
                if (!response.ok) {
                    updateState({ isLoggedIn: false, username: null, role: null });
                }
            }).catch((error) => {
                console.error('Error fetching user data:', error);
                updateState({ isLoggedIn: false, username: null, role: null });
            });
        }
        return storedState;
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
