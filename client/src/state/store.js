import React, {createContext, useReducer} from 'react';
import Reducer from './reducer';
import { Filter, MapView } from './constants';

const initialState = {
    user: null,
    company: null,
    containers: {
        green: [],
        yellow: [],
        red: []
    },
    filter: Filter.ALL,
    mapView: MapView.MAP,
    userLocation: { lat: 56.212348929999976, lng: 23.920154569999994 },
    activeMarker: ''
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
