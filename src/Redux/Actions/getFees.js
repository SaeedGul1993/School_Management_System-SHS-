import Firebase from '../../Config/Config';

export const getListOfFee = () => {
    return (dispatch) => {
        Firebase.database().ref(`FeePanel/`).on('value', (snapShot) => {
            let data = snapShot.val();
            let tempraryArray = [];
            for (var key in data) {
                data[key].feeId = key;
                tempraryArray.push(data[key])
            }
            console.log('fee temprary',tempraryArray);
            dispatch ({
                type:'LIST_OF_FEE',
                payload:tempraryArray
            })
        })
    }
}