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

export function changePassword(newPwd, successHandling, errorHandling) {
    if (firebase.auth().currentUser) {
        firebase.auth().currentUser.updatePassword(newPwd)
            .then(successHandling)
            .catch(errorHandling);
    }
}
