import { useContext } from 'react';
import StateContext from './StateContext';

const useSharedState = () => {
    const context = useContext(StateContext);
    if (context === undefined) {
        throw new Error('useSharedState must be used within a StateProvider');
    }
    return context;
};

export default useSharedState;
