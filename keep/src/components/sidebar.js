import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';
import archive from '../icons/archive.svg';
import notes from '../icons/notes.svg';

const Sidebar = props => {
  const { sidebarVisible, bgColor, fontColor, darkMode } = props;
  const minWidth = sidebarVisible ? '300px' : '0px';
  const imgStyle = {
    filter: darkMode ? 'invert(0.8)' : 'invert(0.4)',
    verticalAlign: 'middle',
    marginRight: '1rem'
  };
  return (
    <div
      id="sidebar"
      className={'sidebar ' + (!sidebarVisible && 'hidden')}
      style={{ minWidth, backgroundColor: bgColor, minHeight: '100vh' }}
    >
      <Link to="/" style={{ color: fontColor, fontWeight: '600' }}>
        <img src={notes} alt="notes-img" style={imgStyle}></img>
        Notes
      </Link>
      <Link to="/archived" style={{ color: fontColor, fontWeight: '600' }}>
        <img src={archive} alt="archive-img" style={imgStyle}></img>
        Archive
      </Link>
    </div>
  );
};

export default Sidebar;
