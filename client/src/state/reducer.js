import { Actions } from './constants';

const Reducer = (state, action) => {
    switch (action.type) {
        case Actions.SET_USER:
            return {
                ...state,
                user: action.payload
            };
        case Actions.SET_COMPANY:
            return {
                ...state,
                company: action.payload
            };
        case Actions.SET_CONTAINERS:
            const { green, yellow, red } = action.payload;
            return {
                ...state,
                containers: { green, yellow, red }
            };
        case Actions.SET_MAP_VIEW:
            return {
                ...state,
                mapView: action.payload
            };
        case Actions.CHANGE_FILTER:
            return {
                ...state,
                filter: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;
