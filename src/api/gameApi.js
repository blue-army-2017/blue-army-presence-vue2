import { getSeasonRef } from './seasonApi';

export function getGameRef(seasonId, gameId) {
    return getSeasonRef().child(`${seasonId}/games/${gameId}`);
}
