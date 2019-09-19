import firebase from 'firebase/app';

let memberRef = null;

export function getMemberRef() {
    if (!memberRef) {
        memberRef = firebase.database().ref('member/');
    }
    return memberRef;
}

export async function addMember(firstName, lastName) {
    return await getMemberRef().push().set({firstName, lastName});
}
