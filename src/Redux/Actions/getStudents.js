import Firebase from '../../Config/Config';

export const getListOfStudents = () => {
    return (dispatch) => {
        Firebase.database().ref(`Students/`).on('value', (snapShot) => {
            let data = snapShot.val();
            let temprary = [];
            for (var key in data) {
                data[key].id = key ; 
                temprary.push(data[key])
            }
            console.log('temprary students',temprary);
            dispatch ({
                type:'LIST_OF_STUDENTS',
                payload:temprary
            })
        })
    }
} 