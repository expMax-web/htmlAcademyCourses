// не понятно, как хранить место в гильдии, если не делать O(n * m)

import { DATA } from "../constants";
import { Data, Guild, Player, PlayerWithPlacement } from "../types";

// Скорость O(n * log n) + память

const searchGuild = (
  array: Player[],
  points: number,
  guildsMembersCount: number
): null | PlayerWithPlacement => {
  if (array.length === 0) {
    return null;
  }

  if (array[0].leaguePoints === points) {
    return { ...array[0], placement: guildsMembersCount };
  }

  const middle = Math.floor(array.length / 2);

  if (array[middle].leaguePoints === points) {
    return { ...array[middle], placement: guildsMembersCount - middle };
  }

  if (array[middle].leaguePoints > points) {
    return searchGuild(array.slice(0, middle), points, guildsMembersCount);
  }

  return searchGuild(array.slice(middle + 1), points, guildsMembersCount);
};

const getPlayerGuild = (points: number, data: Data): Guild | null => {
  const testData = [...data];

  if (testData.length === 0) {
    return null;
  }

  const lastElem = testData.pop();

  let searchResult: null | PlayerWithPlacement = null;

  if (lastElem) {
    searchResult = searchGuild(lastElem, points, lastElem.length);
  }

  if (searchResult !== null) {
    return { guild: searchResult.guild, placement: searchResult.placement };
  }

  return getPlayerGuild(points, testData);
};

console.log(getPlayerGuild(1432, DATA)); // {"guild": "bream", "placement": 2 }

console.log(getPlayerGuild(42, DATA)); // {"guild": "catfish", "placement": 4 }

console.log(getPlayerGuild(930, DATA)); // {"guild": "seabass", "placement": 2 }

console.log(getPlayerGuild(4, DATA)); // {"guild": "seabass", "placement": 4 }

console.log(getPlayerGuild(568, DATA)); // {"guild": "goldfish", "placement": 3 }

// Неправильно вычисляет placement

console.log(getPlayerGuild(1476, DATA)); // {"guild": "bream", "placement": 1 }
