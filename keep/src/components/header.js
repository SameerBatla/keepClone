import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../styles/header.css';
import { toggleTheme } from '../actions/settingsAction'
import cancel from '../icons/cancel.png';
import searchIcon from '../icons/search.svg';

class Header extends React.Component {
    state = {
        search: '',
        focused: false,
        showDarkModeNav: false,
        showSearchNav: false
    }

    documentListener = (e) => {
        if (!document.getElementById("setting-nav").contains(e.target)) {

            this.toggleDarkModeMenu()
        }
    }

    toggleDarkModeMenu = (e) => {
        if (this.state.showDarkModeNav) {
            document.removeEventListener("click", this.documentListener)
        } else {
            document.addEventListener("click", this.documentListener)
        }
        this.setState(prevState => ({ showDarkModeNav: !prevState.showDarkModeNav }))
    }

    componentDidMount() {
        const searchTerms = this.props.location.search.split('?key=');
        const searchTerm = searchTerms.length > 1 ? searchTerms[1] : '';
        this.setState({ search: decodeURI(searchTerm) });
    }
    handleToggleThemeNav = () => {
        this.props.toggleTheme()
        this.toggleDarkModeMenu("hello")
    }
    handleSearch = (e) => {
        const searchValue = e.target.value;
        this.setState({ search: searchValue });
        if (searchValue.length) {
            this.props.history.push(`/search?key=${searchValue}`);
        } else {
            this.props.history.push(`/`);
        }
    }

    handleBlurNav = () => {
        this.setState({ showSearchNav: false })
        this.handleBlur()
    }

    handleBlur = (e) => {
        this.setState({ search: "" })
        this.props.history.push(`/`)
    }

    render() {

        const { bgColor, darkMode, title, fontColor } = this.props.settings
        const styleIcon1 = darkMode ? { filter: "invert(0)" } : { filter: "invert(0.6)" }
        const styleIcon2 = darkMode ? { filter: "invert(1)" } : { filter: "invert(0.4)" }
        return <div onClick={this.props.closeSidebar} style={{ borderBottom: "1px solid #e5e5e5" }} id="header">
            <div className="header" style={{ backgroundColor: bgColor }}>
                <div className="title">
                    <div className="icon icon-menu" style={{ color: fontColor }} onClick={(e) => { e.stopPropagation(); this.props.openSidebar(); }}>
                    </div>
                    <span style={{ color: fontColor }}>{title}</span>
                </div>
                <div className="helper-container" >
                    <div className={"search-container" + (this.state.focused ? " focused" : "")}
                        style={{
                            borderColor: "#e5e5e5",
                            minWidth: "300px", width: "70%"
                        }}>
                        <input placeholder="Search"
                            style={{ width: "90%", height: "100%" }}
                            onChange={this.handleSearch}
                            value={this.state.search}
                            onFocus={() => this.setState({ focused: true })}
                        />

                        {this.state.search.length > 0 && <img src={cancel} onClick={this.handleBlur} alt="cancel"
                            className="cross" />}
                    </div>
                    <label style={{ margin: "10px" }}>
                        <span style={{ margin: "0 20px", color: fontColor }}>Dark Mode</span>
                        <label className="switch" style={{ margin: "-5px 0 0 0" }}>
                            <input type="checkbox" checked={darkMode} onChange={this.props.toggleTheme} />
                            <span className="slider round"></span>
                        </label>
                    </label>
                </div>
                <div className="helper-container-nav">
                    <div
                        style={{ backgroundImage: `url(${searchIcon})`, ...styleIcon2 }}
                        onClick={() => { this.setState(prevState => ({ showSearchNav: !prevState.showSearchNav })) }}></div>
                    <div className={"search-container" + (this.state.focused ? " focused" : "")}
                        style={{
                            borderColor: "#e5e5e5",
                            minWidth: "250px",
                            display: this.state.showSearchNav ? "block" : "none"
                        }}>
                        <input placeholder="Search"
                            style={{ width: "80%" }}
                            onChange={this.handleSearch}
                            value={this.state.search}
                            onFocus={() => this.setState({ focused: true })}
                        />

                        {this.state.search.length > 0 && <img src={cancel} onClick={this.handleBlurNav} alt="cancel"
                            className="cross" />}
                    </div>
                    <div
                        className="settings dropdown"
                        style={styleIcon1}
                        onClick={this.toggleDarkModeMenu}>
                    </div>
                    <div
                        id="setting-nav"
                        className="dropdown-content"
                        style={this.state.showDarkModeNav ? { display: "block", backgroundColor: bgColor } : {}}>
                        <label style={{ margin: "10px" }}>
                            <span style={{ margin: "0 20px", color: fontColor }}>Dark Mode</span>
                            <label className="switch" style={{ margin: "-5px 0 0 0" }}>
                                <input type="checkbox" checked={darkMode} onChange={this.handleToggleThemeNav} />
                                <span className="slider round"></span>
                            </label>
                        </label>
                    </div>

                </div>
            </div>


        </div>;
    }

}

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    toggleTheme: () => dispatch(toggleTheme()),

})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
