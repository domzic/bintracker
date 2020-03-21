const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };
        case 'SET_COMPANY':
            return {
                ...state,
                company: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'SET_CONTAINERS':
            return {
                ...state,
                containers: action.payload
            };
        case 'ADD_CONTAINER':
            return {
                ...state,
                containers: state.containers.concat(action.payload)
            };
        default:
            return state;
    }
};

export default Reducer;
