import firebase from 'firebase/app';

let memberRef = null;

export function getMemberRef() {
    if (!memberRef) {
        memberRef = firebase.database().ref('member/');
    }
    return memberRef;
}

export async function addMember(firstName, lastName, active) {
    return await getMemberRef().push().set({firstName, lastName, active});
}

export async function updateMember(key, firstName, lastName, active) {
    return await getMemberRef().child(key).update({firstName, lastName, active});
}
