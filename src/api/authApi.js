import firebase from 'firebase/app';

import router from '../router';

export function signInWithEmailAndPassword(email, password, errorHandling) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            router.push({name: 'home'});
        })
        .catch(errorHandling);
}

export function signOut(errorHandling) {
    firebase.auth().signOut()
        .then(() => {
            router.push({name: 'login'});
        })
        .catch(errorHandling);
}

export function changePassword(currentPwd, newPwd, successHandling, errorHandling) {
    if (firebase.auth().currentUser) {
        const credential = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, currentPwd);
        firebase.auth().currentUser.reauthenticateWithCredential(credential)
            .then(() => {
                firebase.auth().currentUser.updatePassword(newPwd)
                    .then(successHandling)
                    .catch(errorHandling);
            })
            .catch(errorHandling);
    }
}
