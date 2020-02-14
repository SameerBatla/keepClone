// mocks api can be replaced to call any api
import { TEMP_NOTES } from '../constants/notesConstants';
import { generate } from 'short-id';

const initNotes = () => {
    const notes = localStorage.getItem('notes');
    if (notes === null) {
        localStorage.setItem('notes', JSON.stringify(TEMP_NOTES));
    }
}

const getActiveNotesApi = () => {
    const notes = localStorage.getItem('notes');
    if (notes !== null) {
        const jsonParsedNotes = JSON.parse(notes);
        return jsonParsedNotes.filter(note => note.isArchived === false);
    }
}

const getArchivedNotesApi = () => {
    const notes = localStorage.getItem('notes');
    if (notes !== null) {
        const jsonParsedNotes = JSON.parse(notes);
        return jsonParsedNotes.filter(note => note.isArchived === true);
    }
}

const searchNotesApi = searchTerm => {
    searchTerm = searchTerm.toLowerCase();
    const notes = localStorage.getItem('notes');
    if (notes !== null) {
        const jsonParsedNotes = JSON.parse(notes);
        const keys = ['title', 'description'];
        return jsonParsedNotes.filter((note) => {
            return keys.some((key) => {
                return String(note[key]).toLowerCase().includes(searchTerm);
            });
        });
    }
}

const updateNoteApi = updatedNote => {
    const notes = localStorage.getItem('notes');
    if (notes !== null) {
        const jsonParsedNotes = JSON.parse(notes);
        const newNotes = jsonParsedNotes.map(note => note.id === updatedNote.id ? updatedNote : note);
        localStorage.setItem('notes', JSON.stringify(newNotes));
        return true;
    }
}

const createNoteApi = newNote => {
    const notes = localStorage.getItem('notes');
    if (notes !== null) {
        const jsonParsedNotes = JSON.parse(notes);
        jsonParsedNotes.push({
            id: generate(),
            title: newNote.title || '',
            description: newNote.description || '',
            isArchived: newNote.isArchived || false,
            isPinned: newNote.isPinned || false
        })
        localStorage.setItem('notes', JSON.stringify(jsonParsedNotes));
        return true;
    }
}

const deleteNoteApi = id => {
    const notes = localStorage.getItem('notes');
    if (notes !== null) {
        const jsonParsedNotes = JSON.parse(notes);
        const newNotes = jsonParsedNotes.filter(note => note.id !== id);
        localStorage.setItem('notes', JSON.stringify(newNotes));
        return true;
    }
}

const toggleArchiveApi = id => {
    const notes = localStorage.getItem('notes');
    if (notes !== null) {
        const jsonParsedNotes = JSON.parse(notes);
        const newNotes = jsonParsedNotes.map(note => note.id === id ? {...note, isArchived: !note.isArchived } : note);
        localStorage.setItem('notes', JSON.stringify(newNotes));
        return true;
    }
}

const togglePinApi = id => {
    const notes = localStorage.getItem('notes');
    if (notes !== null) {
        const jsonParsedNotes = JSON.parse(notes);
        const newNotes = jsonParsedNotes.map(note => note.id === id ? {...note, isPinned: !note.isPinned } : note);
        localStorage.setItem('notes', JSON.stringify(newNotes));
        return true;
    }
}

export {
    initNotes,
    getActiveNotesApi,
    getArchivedNotesApi,
    searchNotesApi,
    updateNoteApi,
    createNoteApi,
    deleteNoteApi,
    toggleArchiveApi,
    togglePinApi,
}