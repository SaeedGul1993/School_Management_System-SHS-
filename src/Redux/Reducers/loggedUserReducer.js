const initialStates = {
    LoggedInUser: ''
}

const LoggedUserReducer = (state = initialStates, action) => {
    switch (action.type) {
        case 'LOGGED_IN_USER': {
            return {
                ...state, LoggedInUser: action.payload
            }
        }
        case 'LOGGED_OUT_USER': {
            return {
                ...state, LoggedInUser: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default LoggedUserReducer;