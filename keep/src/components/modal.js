import React from 'react';
import Modal from 'react-modal';
import '../styles/notesModal.css';
import cancel from '../icons/cancel.png';
import '../styles/notes.css';
const content= {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
     width: "60%"
  }


Modal.setAppElement('#root');

class NotesModal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }


  render() {
    const { openModal, note, handleClose, isNew, handleChange, isArchivedPage, settings } = this.props;
    const styleIcon = settings.darkMode ? { filter: "invert(1)" } : { filter: "invert(0.4)" }
    return <Modal
      isOpen={openModal}
      id="modal"
      onRequestClose={() => handleClose({ isNew, isArchivedPage })}
      style={{content: {...content, backgroundColor: settings.bgColor }}}
    >
      <div id="expandedCard" >
        <input
          placeholder="Title"
          style={{ backgroundColor: settings.bgColor, color: settings.fontColor }}
          onChange={e => handleChange({ key: 'title', value: e.target.value })}
          value={note.title} />
        <textarea
          placeholder="Take a Note"
          autoFocus={true}
          style={{ backgroundColor: settings.bgColor, color: settings.fontColor }}
          onChange={e => handleChange({ key: 'description', value: e.target.value })}
          value={note.description} />
        <div className="button-container ">
          <div style={{ backgroundImage: `url(${cancel})`, ...styleIcon, cursor: "pointer" }}
            className="close"
            onClick={() => handleClose({ isNew })}></div>
        </div>
      </div>
    </Modal>
  }
}
export default NotesModal;