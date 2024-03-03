import { DATA } from "../constants";
import { Player } from "../types";

const getInitItems = (
  array: Player[],
  current: Player,
  index: number
): Player[] => {
  const [first, second] = array;

  if (index === 0) {
    return [current];
  }

  if (index === 1) {
    if (first.leaguePoints < current.leaguePoints) {
      return [current, first];
    } else {
      return [first, current];
    }
  }

  if (index === 2) {
    if (second?.leaguePoints < current.leaguePoints) {
      if (first?.leaguePoints < current.leaguePoints) {
        return [current, first, second];
      }

      return [first, current, second];
    } else {
      return [first, second, current];
    }
  }

  return array;
};

// Сортировка вставкой из примера
const sort = (array: Player[], element: Player): Player[] => {
  let pointOfInsertion = 0;

  while (
    pointOfInsertion < array.length &&
    element.leaguePoints < array[pointOfInsertion].leaguePoints
  ) {
    pointOfInsertion++;
  }

  if (pointOfInsertion > 2) {
    return array;
  }

  return pointOfInsertion === 0
    ? [element, ...array].slice(pointOfInsertion, 3)
    : [
        ...array.slice(0, pointOfInsertion),
        element,
        ...array.slice(pointOfInsertion, 3),
      ];
};

const getBestPlayers = (players: Player[]): Player[] => {
  // Топ 3
  let array: Player[] = [];

  for (let i = 0; i < players.length; i++) {
    const current = players[i];

    // Выбираем и сортируем первых трех
    if (i <= 2) {
      array = getInitItems(array, current, i);

      continue;
    }

    // Сортировка вставкой в уже отсортированный массив
    array = sort(array, current);
  }

  return array;
};

console.log(getBestPlayers(DATA));

/*[{
      "login": "BoostScooby",
      "leaguePoints": 1476
    }, {
      "login": "SaiyanBroadway",
      "leaguePoints": 1432
    }, {
      "login": "Mountaintrid",
      "leaguePoints": 1130
    }]  */
