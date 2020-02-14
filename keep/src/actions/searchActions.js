import { searchNotesApi } from '../apis/notesApi';

export const searchNotes = (searchTerm) => async dispatch => {
    const notes = await searchNotesApi(searchTerm);
    return (
        dispatch({
            type: 'SET_SEARCHED_NOTES',
            payload: { notes },
        })
    )
}
