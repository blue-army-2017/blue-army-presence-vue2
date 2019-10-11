import { getSeasonRef } from './seasonApi';

export function getGameRef(seasonId, gameId) {
    return getSeasonRef().child(`${seasonId}/games/${gameId}`);
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
