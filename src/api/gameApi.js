import { getSeasonRef } from './seasonApi';

export function getGameRef(seasonId, gameId) {
    return getSeasonRef().child(`${seasonId}/games/${gameId}`);
}

export function getGamePresentMembersRef(seasonId, gameId) {
    return getGameRef(seasonId, gameId).child('presentMembers');
}

export async function saveGame(seasonId, gameId, opponent, date, home, mode) {
    return await getGameRef(seasonId, gameId).update({
        opponent,
        date,
        home,
        mode
    });
}

export async function deleteGame(seasonId, gameId) {
    return await getGameRef(seasonId, gameId).remove();
}

export async function addMemberToGame(seasonId, gameId, memberId) {
    return await getGamePresentMembersRef(seasonId, gameId).push().set({memberId});
}

export async function deleteMemberFromGame(seasonId, gameId, entryId) {
    return await getGamePresentMembersRef(seasonId, gameId).child(entryId).remove();
}
