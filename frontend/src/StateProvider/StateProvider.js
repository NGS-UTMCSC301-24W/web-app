import React, { useState } from 'react';
import StateContext from './StateContext';

const StateProvider = ({ children }) => {
    const [sharedState, setSharedState] = useState({ isLoggedIn: false }); // Initial shared state

    // Function to update state
    const updateState = (newState) => {
        setSharedState((prevState) => ({ ...prevState, ...newState }));
    };

    return (
        <StateContext.Provider value={{ sharedState, updateState }}>
            {children}
        </StateContext.Provider>
    );
};

export default StateProvider;
