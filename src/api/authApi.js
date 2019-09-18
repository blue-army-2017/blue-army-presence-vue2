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
