const initialState = {
    feeArray: []
}

const ListOfFeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIST_OF_FEE': {
            return {
                ...state, feeArray: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export default ListOfFeeReducer;