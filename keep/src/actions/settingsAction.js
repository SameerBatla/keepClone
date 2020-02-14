export const toggleTheme = () => async dispatch =>{
    return (dispatch({
         type: 'TOGGLE_THEME'
    }))
  }


  export const setTitle = (title) => async dispatch => {
     return (
         dispatch({
             type: 'SET_TITLE',
             payload: title,
         })
     )
 }
 