const initialState = {
    classArray: []
}

const ListOfClassReducer = (state = initialState, action) => {

    switch(action.type){
        case 'LIST_OF_CLASSES' : {
            return {
                ...state,classArray:action.payload
            }   
        }
        default : {
            return state;
        }
    }

}

export default ListOfClassReducer;
