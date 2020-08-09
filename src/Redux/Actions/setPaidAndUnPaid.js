const paidStudentLengthMethod = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'PAID',
            payload: data
        })
    }
}

const unPaidStudentLengthMethod = (data) => {
    return (dispatch) => {
        dispatch({
            type: 'UNPAID',
            payload: data
        })
    }
}

export { paidStudentLengthMethod, unPaidStudentLengthMethod };