import React from 'react';
import '../styles/note.css';
import '../styles/notes.css';
import archive from '../icons/archive.svg'
import deleteIcon from '../icons/delete.svg'

function Note({ note, noteActions, isArchived, openNote, style, darkMode }) {
    const clicked = (e) => {
        e.stopPropagation()
        openNote({ id: note.id, isNew: false, isArchived })
    }
    const styleIcon1 = darkMode ? { filter: "invert(0)" } : { filter: "invert(0.6)" }
    const styleIcon2 = darkMode ? { filter: "invert(1)" } : { filter: "invert(0.4)" }
    const classVal = "note--container " + (darkMode ? "note--container-dark" : "note--container-light")
    return (
        <div className={classVal}
            onClick={e => clicked(e)}
            style={style}>
            <h3 style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{note.title.length === 0 ? "Untitled" : note.title}</h3>
            <p style={{ overflow: "hidden", textOverflow: "ellipsis" }} >{note.description}</p>
            <div className="note--actions">
                {isArchived
                    ? <div
                        className="unArchive"
                        style={styleIcon1}
                        onClick={e => noteActions(e, note.id, 'unarchive')}></div>
                    : <div
                        className="archive"
                        style={{ backgroundImage: `url(${archive})`, ...styleIcon2 }}
                        onClick={e => noteActions(e, note.id, 'archive')}></div>}
                {!isArchived ? <div
                    className="pin"
                    style={note.isPinned? { transform: "rotate(180deg)",...styleIcon1}: styleIcon1}
                    onClick={e => noteActions(e, note.id, 'togglepin')}></div>: null}
                <div
                        className="delete"
                        style={{backgroundImage: `url(${deleteIcon})`,...styleIcon2} }
                        onClick={e => noteActions(e, note.id, 'delete')}></div>
            </div>
        </div>
    );
}

export default Note;