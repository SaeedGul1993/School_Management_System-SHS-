import React, { useEffect } from 'react';
import FeeTable from '../Table/feeTable';
import { connect } from 'react-redux';
import { getListOfStudents } from '../../Redux/Actions/getStudents';
import { getListOfFee } from '../../Redux/Actions/getFees';
import { getListOfClasses } from '../../Redux/Actions/getClasses';

const ListOfFee = (props) => {
    useEffect(() => {
        props.getFees();
        console.log('listOfFee',props.listOfFee);
    }, [])
    return (
        <div>
            <FeeTable heading="Fee List" feeList={props.listOfFee} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        listOfClasses: state.classes.classArray,
        listOfStudents: state.students.studentsArray,
        listOfFee: state.fees.feeArray,

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getClasses: () => { dispatch(getListOfClasses()) },
        getStudents: () => { dispatch(getListOfStudents()) },
        getFees: () => { dispatch(getListOfFee()) }


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfFee);