import { combineReducers } from 'redux';
import ListOfClassReducer from '../Reducers/classListReducer';
import ListOfStudentReducer from '../Reducers/studentListReducer';
import ListOfFeeReducer from '../Reducers/feeListReducer';
import PaidAndUnPaidReducer from '../Reducers/paidAndunPaidReducer';
import LoggedUserReducer from '../Reducers/loggedUserReducer';

export const rootReducer = combineReducers({
    classes: ListOfClassReducer,
    students:ListOfStudentReducer,
    fees:ListOfFeeReducer,
    paidAndUnPaid:PaidAndUnPaidReducer,
    loggedInUser:LoggedUserReducer
})