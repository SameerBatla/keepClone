import React from 'react';
import { connect } from 'react-redux';
import { searchNotes } from '../actions/searchActions';
import {setTitle } from '../actions/settingsAction'

import Note from '../components/note';

class SearchResult extends React.Component {
    componentDidMount() {
        const { searchNotes } = this.props;
        searchNotes(this.getSearchTerm());
        this.props.setTitle("Search");
    }

    getSearchTerm = () => {
        const searchTerms = this.props.location.search.split('?key=');
        const searchTerm = searchTerms.length > 1 ? searchTerms[1] : '';
        return decodeURI(searchTerm);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.search !== this.props.location.search) {
            const { searchNotes } = this.props;
            searchNotes(this.getSearchTerm());
        }
    }

    openNote = ({ id, isNew, isArchived }) => {
        this.props.history.push(isArchived ? `/archived?note=${id}` : `/?note=${id}`);
    }

    render() {
        const { search, settings } = this.props;
        const cardStyle = {
            backgroundColor: settings.bgColor,
            color: settings.fontColor,
            border: "1px solid #e5e5e5"
        };
        const pinnedNotes = Object.keys(search).filter((note) => search[note].isArchived)
        const notPinnedNotes = Object.keys(search).filter((note) => !search[note].isArchived)
        if (Object.keys(search).length > 0) {
            return (
                <div id="search" style={{width: "100%"}} >
                    {pinnedNotes.length !== 0 ? <div className="notes-super-container">
                        <span className="heading" style={{ color: cardStyle.color }}>{"Archived Notes"}</span>
                        <div className="notes--container">
                            {pinnedNotes.map((note, index) =>
                                <Note key={index} style={cardStyle}
                                    isArchived={true}
                                    note={search[note]}
                                    openNote={this.openNote}
                                />)}
                        </div>
                    </div> : null}
                    <div className="notes-super-container">
                        <span className="heading" style={{ color: cardStyle.color }}>
                            {notPinnedNotes.length?"Notes": ""}</span>
                        <div className="notes--container">
                            {notPinnedNotes.map((note, index) =>
                                <Note key={index}
                                    note={search[note]}
                                    openNote={this.openNote}
                                    style={cardStyle} />)}
                        </div>
                    </div>

                </div>
            )
        } else {
            return <div className="notes-super-container" id="search">
                <span className="heading" style={{ color: cardStyle.color }}>{"Whoops nothing to see here... "}</span>
            </div>
        }
    }
}


const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    searchNotes: (searchTerm) => dispatch(searchNotes(searchTerm)),
    setTitle: (title) => dispatch(setTitle(title))
})


export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);
