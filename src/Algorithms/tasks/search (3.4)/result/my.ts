import { DATA } from "../constants";
import { Data, League, Player } from "../types";

const searchPlayer = (points: number, players: Player[]): number | null => {
  let left = 0;
  let right = players.length - 1;

  while (left <= right) {
    const center = Math.floor((right + left) / 2);

    if (players[center].leaguePoints === points) {
      return center;
    }

    if (players[center].leaguePoints > points) {
      right = center - 1;
    } else {
      left = center + 1;
    }
  }

  return null;
};

const getPlayerInfo = (points: number, data: Data): League | null => {
  let left = 0;

  let right = data.length - 1;

  while (left <= right) {
    const leagueIndex = Math.floor((right + left) / 2);

    const currentLeague = data[leagueIndex];

    if (
      currentLeague[0].leaguePoints <= points &&
      currentLeague[currentLeague.length - 1].leaguePoints >= points
    ) {
      const playerIdx = searchPlayer(points, currentLeague);

      if (playerIdx === null) {
        return null;
      }

      const placement = currentLeague.length - playerIdx;

      return { placement: placement, league: leagueIndex + 1 };
    }

    if (currentLeague[0].leaguePoints > points) {
      right = leagueIndex - 1;
    } else {
      left = leagueIndex + 1;
    }
  }

  return null;
};

console.log(getPlayerInfo(1432, DATA)); // {"placement": 2, "league": 4 }
