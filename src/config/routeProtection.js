import * as firebase from "firebase";

export function beforeEnter(to, from, next) {
    if (firebase.auth().currentUser) {
        next();
    } else {
        next('/login');
    }
}
