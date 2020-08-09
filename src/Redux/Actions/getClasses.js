import Firebase from '../../Config/Config';

export const getListOfClasses = () => {
    return (dispatch) => {
        Firebase.database().ref(`Classes/`).on('value', (snapShot) => {
            let listClasses = snapShot.val();
            let tempraryArray = [];
            for (var key in listClasses) {
                listClasses[key].id = key ; 
                tempraryArray.push(listClasses[key])
            }
            console.log('tempraryArray',tempraryArray);
            dispatch({
                type:'LIST_OF_CLASSES',
                payload:tempraryArray
            })
        })
    }
}
