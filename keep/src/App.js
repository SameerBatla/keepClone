import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { simpleAction } from './actions/simpleAction';
import Notes from './containers/notes';
import SearchResult from './containers/searchResult';
import Sidebar from './components/sidebar';
import { initNotes } from './apis/notesApi';

import './App.css';
import Header from './components/header';

class App extends React.Component {
  state = {
    sidebarVisible: false, 
    showView: false
  };

  componentDidMount() {
    initNotes();
    this.setState({showView: true})



    window.addEventListener('click', (e) => {
      if (document.getElementById("sidebar")) {
        if (!(document.getElementById("sidebar").contains(e.target))) {
          this.setState(prevState => ({ sidebarVisible: false }))
        }
      }
    })
  }

  simpleAction = (event) => {
    this.props.simpleAction();
  }

  toggleSidebar = () => this.setState(prevState => ({ sidebarVisible: !prevState.sidebarVisible }))



  render() {
    if(this.state.showView){
    return (
      <div className="App" style={{ backgroundColor: this.props.settings.bgColor }} onClick={this.closeSidebar}>
        <BrowserRouter>
          <Header {...this.props.settings} openSidebar={this.toggleSidebar} closeSidebar={this.toggleSidebar}
            sidebarVisible={this.state.sidebarVisible} />
          <div style={{ display: "flex" }} >
            <Sidebar  sidebarVisible={this.state.sidebarVisible} {...this.props.settings} />
            {/* archived */}
            <Route exact path="/archived" component={Notes} />
            {/* search result */}
            <Route path="/search" component={SearchResult} />
            {/* notes */}
            <Route exact path="/" component={Notes} />
          </div>
        </BrowserRouter>
      </div>
    );
    } else {
      return <div className="loader"></div>
    }
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
