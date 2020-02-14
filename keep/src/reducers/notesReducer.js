export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_NOTES':
            let newState = Object.assign({}, state);
            newState = (action.payload.notes && action.payload.notes instanceof Array) ? [...action.payload.notes] : [];
            return newState;
        case 'DELETE_NOTE':
            delete newState[action.payload.noteId];
            return newState;
        default:
            return state;
    }
}