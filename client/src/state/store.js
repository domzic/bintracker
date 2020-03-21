import React, {createContext, useReducer} from 'react';
import Reducer from './reducer';
import { Filter, MapView } from './constants';

const initialState = {
    user: null,
    company: null,
    containers: [],
    filter: Filter.ALL,
    mapView: MapView.MAP
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default  Store;
