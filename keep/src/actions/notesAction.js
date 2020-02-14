import { getActiveNotesApi, updateNoteApi, createNoteApi, deleteNoteApi, toggleArchiveApi, togglePinApi } from '../apis/notesApi';

export const getActiveNotes = () => async dispatch => {
    const notes = await getActiveNotesApi();
    return (
        dispatch({
            type: 'SET_ACTIVE_NOTES',
            payload: { notes },
        })
    )
}

export const updateNote = (note) => async () => {
    await updateNoteApi(note);
    return true;
}

export const createNote = (note) => async () => {
    await createNoteApi(note);
    return true;
}

export const deleteNote = (id) => async () => {
    await deleteNoteApi(id);
    return true;
}

export const toggleArchive = id => async () => {
    await toggleArchiveApi(id);
    return true;
}

export const togglePin = id => async () => {
    await togglePinApi(id);
    return true;
}
