const initialStates = {
    paidStudentLength: 0,
    unPaidStudentLength:0

}

const PaidAndUnPaidReducer = (state = initialStates, action) => {
    switch (action.type) {
        case 'PAID': {
            return {
                ...state, paidStudentLength: action.payload
            }
        }
        case 'UNPAID': {
            return {
                ...state, unPaidStudentLength: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default PaidAndUnPaidReducer;