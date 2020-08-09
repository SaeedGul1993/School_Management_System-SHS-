const initialStates = {
    studentsArray: []
}

const ListOfStudentReducer = (state = initialStates, action) => {
    switch (action.type) {
        case 'LIST_OF_STUDENTS': {
            return {
                ...state, studentsArray: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default ListOfStudentReducer;