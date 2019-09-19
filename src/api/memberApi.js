import firebase from 'firebase/app';

let memberRef = null;

export function getMemberRef() {
    if (!memberRef) {
        memberRef = firebase.database().ref('member/');
    }
    return memberRef;
}
