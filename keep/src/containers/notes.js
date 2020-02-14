import React from 'react';
import { connect } from 'react-redux';
import archive from '../icons/archive.svg'
import cancel from '../icons/cancel.png';
import Note from '../components/note';
import NotesModal from '../components/modal';
import { setTitle } from '../actions/settingsAction';
import { getActiveNotes, deleteNote, updateNote, createNote, toggleArchive, togglePin } from '../actions/notesAction';
import { getArchivedNotes } from '../actions/archivedActions';
import '../styles/notes.css';

class Notes extends React.Component {

    constructor() {
        super();
        this.state = {
            openModal: false,
            note: {
                title: '',
                description: '',
                isArchived: false,
                isPinned: false
            },
            isNew: false,
            isArchivedPage: false,
            expandAddNewCard: false,
            activeInputNewCard: false
        }
    }

    async componentDidMount() {
        let isArchivedPage = false;
        if (this.props.history.location.pathname.includes('archived')) {
            isArchivedPage = true;
            this.setState({ isArchivedPage });
        }
        const { setTitle } = this.props

        if (isArchivedPage) {
            const { getArchivedNotes } = this.props;
            await getArchivedNotes();
            setTitle("Archive")
        } else {
            const { getActiveNotes } = this.props;
            await getActiveNotes();
            setTitle("Notes")
        }

        const currentNoteId = this.getCurrentNote();
        if (currentNoteId) {
            this.openNote({ id: currentNoteId, isNew: false, isArchived: isArchivedPage });
        }


    }
    documentListener = (e) => {
        if (document.getElementById("expandedCard") && (!(document.getElementById("expandedCard").contains(e.target)))) {
            this.handleClose({ isArchivedPage: false })
        }
    }

    attachEventListener() {
        document.addEventListener("click", this.documentListener)
    }


    getCurrentNote = () => {
        const noteIds = this.props.location.search.split('?note=');
        const noteId = noteIds.length > 1 ? noteIds[1] : '';
        return decodeURI(noteId);
    }

    noteActions = async (e, id, type) => {
        e.stopPropagation();
        const { deleteNote, getActiveNotes, toggleArchive, getArchivedNotes, togglePin } = this.props;
        const { isArchivedPage } = this.state;
        switch (type) {
            case 'archive':
                toggleArchive(id);
                break;
            case 'delete':
                deleteNote(id);
                break;
            case 'togglepin':
                togglePin(id);
                break;
            case 'unarchive':
                toggleArchive(id);
                break;
            default:
                break;
        }
        if (isArchivedPage) {
            getArchivedNotes();
        } else {
            getActiveNotes();
        }
    }

    openNote = ({ id, isNew, isArchived }) => {
        if (!isNew) {
            const notes = isArchived ? this.props.archived : this.props.notes;
            const selectedNote = notes.filter(note => (note.id.toString() === id.toString()));
            this.props.history.push(this.state.isArchivedPage ? `/archived?note=${id}` : `?note=${id}`);
            if (selectedNote.length) {
                this.setState({ openModal: true, note: selectedNote[0], isNew: false, title: selectedNote[0].title, description: selectedNote[0].description });
            }
        } else {
            this.setState({ openModal: true })
        }

    }

    handleTypeChange = ({ key }) => {
        this.setState(prevState => ({ note: { ...prevState.note, [key]: !prevState.note[key] } }))
    }
    handleChange = ({ key, value }) => {

        const { note } = this.state;
        const newNote = { ...note, [key]: value }
        this.setState({ note: newNote });
    }

    handleClose = ({ isArchivedPage }) => {
        document.removeEventListener("click", this.documentListener)
        if (isArchivedPage) {
            this.props.history.push(`/archived`);
        } else {
            const { updateNote, getActiveNotes, createNote } = this.props;
            const { note } = this.state;
            if (note.title.length > 0 || note.description.length > 0) {
                if (note.isNew) {
                    createNote(note);
                } else {
                    updateNote(note);
                }
                getActiveNotes();
                this.props.history.push(`/`);
            }
        }
        this.setState({ openModal: false, expandAddNewCard: false, activeInputNewCard: false });
    }

    render() {
        const { notes, archived, settings } = this.props;
        const { openModal, note, isNew, isArchivedPage } = this.state;
        const styleIcon = settings.darkMode ? { filter: "invert(1)" } : { filter: "invert(0.4)" }
        const styleIcon1 = settings.darkMode ? { filter: "invert(0)" } : { filter: "invert(0.6)" }
        const cardStyle = {
            backgroundColor: settings.bgColor,
            color: settings.fontColor,
            border: "1px solid #e5e5e5"
        };
        const pinnedNotes = Object.keys(notes).filter((note) => notes[note].isPinned)
        const notPinnedNotes = Object.keys(notes).filter((note) => !notes[note].isPinned)

        const displayContent = !this.state.expandAddNewCard ?
            <div id="notExpandedCard">
                <input
                    id="dummy"
                    style={{ backgroundColor: settings.bgColor }}
                    value=""
                    onChange={() => { }}
                    placeholder="Take a note" onClick={() => {
                        this.attachEventListener()
                        this.setState({ expandAddNewCard: true, note: { title: '', description: '', isNew: true } })
                    }} />
            </div> : <div id="expandedCard" >
                <input
                    placeholder="Title"
                    style={{ backgroundColor: settings.bgColor, color: settings.fontColor }}
                    onChange={e => this.handleChange({ key: 'title', value: e.target.value })}
                    value={this.state.note.title} />
                <textarea
                    placeholder="Take a Note"
                    autoFocus={true}
                    style={{ backgroundColor: settings.bgColor, color: settings.fontColor }}
                    onChange={e => this.handleChange({ key: 'description', value: e.target.value })}
                    value={this.state.note.description} />
                <div className="button-container ">
                    <div
                        className={this.state.note.isArchived ? "unArchive" : "archive"}
                        style={this.state.note.isArchived ? styleIcon1 : { backgroundImage: `url(${archive})`, ...styleIcon }}
                        onClick={() => this.handleTypeChange({ key: "isArchived" })}></div>
                    <div className="pin"
                        style={settings.darkMode ? { filter: "invert(0)", transform: note.isPinned ? "rotate(180deg)" : "rotate(0)" }
                            : { filter: "invert(0.6)", transform: note.isPinned ? "rotate(180deg)" : "rotate(0)" }}
                        onClick={() => this.handleTypeChange({ key: "isPinned" })}></div>
                    <div style={{ backgroundImage: `url(${cancel})`, ...styleIcon }}
                        className="close"
                        onClick={() => this.handleClose({ isNew })}></div>
                </div>
            </div>
        // add condition for loader
        if (!isArchivedPage) {
            return (
                <div style={{ width: "100%" }}>
                    <div className="new-note-super-container">
                        <div className="new-note--container" style={{ ...cardStyle }} >
                            {displayContent}
                        </div>
                    </div>
                    {pinnedNotes.length === 0 && notPinnedNotes.length === 0 ?
                        <div className="notes-super-container">
                            <span className="heading" style={{ color: cardStyle.color }}>{"Whoops nothing to see here... add data"}</span>
                        </div> : null
                    }
                    {pinnedNotes.length !== 0 ? <div className="notes-super-container">
                        <p className="heading" style={{ color: cardStyle.color }}>{"Pinned Notes"}</p>
                        <div className="notes--container">
                            {pinnedNotes.map((note, index) => notes[note].isPinned ?
                                <Note key={index} style={cardStyle}
                                    noteActions={this.noteActions}
                                    note={notes[note]}
                                    darkMode={settings.darkMode}
                                    openNote={this.openNote} /> : null)}
                        </div>
                    </div> : null}
                    <div className="notes-super-container">
                        <p className="heading" style={{ color: cardStyle.color }}>
                            {Object.keys(notes).length === 0 || pinnedNotes.length === 0 || notPinnedNotes.length === 0 ? "" : "Others"}
                        </p>
                        <div className="notes--container">
                            {notPinnedNotes.map((note, index) => !notes[note].isPinned ?
                                <Note key={index}
                                    noteActions={this.noteActions}
                                    note={notes[note]}
                                    darkMode={settings.darkMode}
                                    openNote={this.openNote}
                                    style={cardStyle} /> : null)}
                        </div>
                    </div>
                    <NotesModal
                        openModal={openModal}
                        note={note}
                        handleClose={this.handleClose}
                        isNew={isNew}
                        settings={settings}
                        handleChange={this.handleChange} />
                </div>
            )
        } else
            return (
                <div className="notes-super-container">
                    <p className="heading"
                        style={{
                            color: cardStyle.color,
                            marginTop: Object.keys(archived).length ? "0" : "2rem"
                        }}>
                        {Object.keys(archived).length ? "Archived Notes" :
                            "Whoops nothing to see here..."}</p>
                    <div className="notes--container">
                        {Object.keys(archived).map((note, index) =>
                            <Note key={index}
                                noteActions={this.noteActions}
                                note={archived[note]}
                                darkMode={settings.darkMode}
                                openNote={this.openNote}
                                isArchived={true}
                                style={cardStyle} />)}
                        <NotesModal
                            openModal={openModal}
                            note={note}
                            handleClose={this.handleClose}
                            isNew={isNew}
                            settings={settings}
                            handleChange={this.handleChange} isArchivedPage={true} />
                    </div>
                </div>
            )
    }
}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    createNote: (note) => dispatch(createNote(note)),
    getActiveNotes: () => dispatch(getActiveNotes()),
    getArchivedNotes: () => dispatch(getArchivedNotes()),
    updateNote: (note) => dispatch(updateNote(note)),
    toggleArchive: (id) => dispatch(toggleArchive(id)),
    togglePin: (id) => dispatch(togglePin(id)),
    deleteNote: id => dispatch(deleteNote(id)),
    setTitle: (title) => dispatch(setTitle(title))
})


export default connect(mapStateToProps, mapDispatchToProps)(Notes);
