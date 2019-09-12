import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from '.';

export function configureFirebase() {
    firebase.initializeApp(firebaseConfig);

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .catch(error => {
            console.log(error);
        });
}
