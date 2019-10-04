import firebase from 'firebase/app';

const AUGUST = 7;

let seasonRef = null;

export function getSeasonRef() {
    if (!seasonRef) {
        seasonRef = firebase.database().ref('season/');
    }
    return seasonRef;
}

export function getCurrentSeasonName() {
    const today = new Date();
    if (today.getMonth() < AUGUST) {
        return `${today.getFullYear() - 1} / ${today.getFullYear()}`;
    } else {
        return `${today.getFullYear()} / ${today.getFullYear() + 1}`
    }
}

export function addCurrentSeason(errorHandling) {
    getSeasonRef().push().set({name: getCurrentSeasonName()})
        .catch(errorHandling);
}
