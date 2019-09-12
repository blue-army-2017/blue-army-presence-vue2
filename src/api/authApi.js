import firebase from 'firebase/app';

import router from '../router';

const SIGNED_IN_KEY = "userSignedIn";

export function signInWithEmailAndPassword(email, password, errorHandling) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
            sessionStorage.setItem(SIGNED_IN_KEY, response.user.email);
            router.push({name: 'home'});
        })
        .catch(errorHandling);
}

export function signOut(errorHandling) {
    firebase.auth().signOut()
        .then(() => {
            sessionStorage.removeItem(SIGNED_IN_KEY);
            router.push({name: 'login'});
        })
        .catch(errorHandling);
}

export function isUserSignedIn() {
    return sessionStorage.getItem(SIGNED_IN_KEY) !== null;
}
