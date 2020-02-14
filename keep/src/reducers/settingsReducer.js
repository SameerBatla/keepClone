
const darkTheme = {
    theme: "dark",
    bgColor: "#202123",
    fontColor: "#f1f1f2",

}

const lightTheme = {
    theme: "light",
    bgColor: "#fff",
    fontColor: "#4d4d4d",
}
const darkMode = localStorage.getItem("theme") === undefined ? false : localStorage.getItem("theme") === "dark" ? true : false
const currentTheme = darkMode ? darkTheme : lightTheme
const initialState = {
    darkMode,
    title: "Notes",
    ...currentTheme
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_THEME':
            const theme = state.darkMode ? lightTheme : darkTheme
            localStorage.setItem("theme", state.darkMode ? "light" : "dark")
            return { ...state, ...theme, darkMode: !state.darkMode };

        case 'SET_TITLE':
            const newState = { ...state, title: action.payload }
            return newState
        default:
            return state;
    }
}

