const loggedInUserMethod = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'LOGGED_IN_USER',
            payload: data
        })
    }
}

const loggedOutUserMethod = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'LOGGED_OUT_USER',
            payload: data
        })
    }
}

export { loggedInUserMethod, loggedOutUserMethod };