import firebase from 'firebase';
import 'firebase/auth';

export function beforeEnter(to, from, next) {
    if (firebase.auth().currentUser) {
        next();
    } else {
        next('/login');
    }
}
