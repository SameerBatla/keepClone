import { getArchivedNotesApi } from '../apis/notesApi';

export const getArchivedNotes = () => async dispatch => {
    const notes = await getArchivedNotesApi();
    return (
        dispatch({
            type: 'SET_ARCHIVED_NOTES',
            payload: { notes },
        })
    )
}
