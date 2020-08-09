import Firebase from '../Config/Config';

// User Login Api 
export const LogInApi = (email, password, loader, props, showNotification, getLoggedUserData) => {
    loader();
    return (
        Firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                let User = user.user.uid;
                Firebase.database().ref(`Users/${User}`).on('value', (snapShot) => {
                    let fetch_Data = snapShot.val();
                    console.log('current User', fetch_Data);
                    getLoggedUserData(fetch_Data);
                    props.history.push(`/dashboard/home`);
                    loader();
                    showNotification();
                })
            }).catch((error) => {
                console.log('authentication error', error);
            })
    )
}

// Add Class Api 
export const AddClassApi = (NameOfClass, trueLoader, falseLoader, showNotification, setStateOfInput) => {
    trueLoader();
    return (
        Firebase.database().ref(`Classes/`).push({
            ClassName: NameOfClass
        }).then(() => {
            showNotification();
            falseLoader();
            setStateOfInput();
        })
    )
}

// Add Student Api 
export const AddStudentApi = (studentName, fatherName, classId, ClassName, gr_No, phn_No, adm_Date, due_Date, fee, showLoader, hideLoader, showNotification, allStates) => {
    showLoader();
    return (
        Firebase.database().ref(`Students/`).push({
            classId: classId,
            ClassName: ClassName,
            studentName: studentName,
            fatherName: fatherName,
            grNo: gr_No,
            phoneNumber: phn_No,
            admissionDate: adm_Date,
            dueDate: due_Date,
            fee: fee
        }).then(() => {
            hideLoader();
            showNotification();
            allStates()

        })
    )
}
// Add FeeApi 

export const AddFeeApi = (feeObject, showLoader, hideLoader, showNotification, allStates, vochuerNumber) => {
    showLoader();
    return (
        Firebase.database().ref(`FeePanel/`).push(feeObject).
            then(() => {
                hideLoader();
                showNotification();
                allStates();
                Firebase.database().ref(`Vochure/VNumber/`).set(vochuerNumber).
                    then(() => {
                        console.log('vochure number is update');
                    })
            }).
            catch((error) => {
                console.log(error);
            })
    )
}