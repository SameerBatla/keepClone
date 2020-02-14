export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_SEARCHED_NOTES':
            let newState = Object.assign({}, state);
            newState = {...action.payload.notes};
            return newState;
        default:
            return state;
    }
}

