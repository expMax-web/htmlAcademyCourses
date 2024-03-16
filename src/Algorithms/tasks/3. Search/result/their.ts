import { DATA } from "../constants";
import { Data, Player } from "../types";

/*
Это основная функция, принимает в себя таблицу лидеров и количество очков, которое мы в ней ищем.
Вот два примера её работы:

searchScore(data, 4) => {
  "league": 1,
  "placement": 4,
}

searchScore(data, 14) => null
*/
function searchScore(leaderboard: Data, leaguePoints: number) {
  // сначала нужно определить, в какой из лиг окажется игрок. Для этого воспользуемся модифицированным бинарным поиском.
  const leagueIndex = searchLeagueByScore(leaderboard, leaguePoints);

  // если такой лиги нет — искать дальше нет смысла
  if (leagueIndex === null) {
    return null;
  }

  // теперь ищем игрока в нужной лиге. Это обычный бинарный поиск, который мы уже знаем.
  const placementIndex = searchInLeague(leaderboard[leagueIndex], leaguePoints);

  if (placementIndex === null) {
    return null;
  }

  // так как в массиве лиги отсчитываются с 0, а не с 1, добавляем единицу к результату
  const league = leagueIndex + 1;
  // так как в данных игроки расположены по возрастанию, а не по убыванию, получаем место игрока с конца
  const placement = leaderboard[leagueIndex].length - placementIndex;

  return { league, placement };
}

function searchLeagueByScore(leaderboard: Data, leaguePoints: number) {
  // как и в обычном бинарном поиске, определяем границы
  let left = 0;
  let right = leaderboard.length - 1;

  const firstPlacePoints =
    leaderboard[right][leaderboard[right].length - 1].leaguePoints;
  const lastPlacePoints = leaderboard[0][0].leaguePoints;

  // Если количество очков вообще не входит в промежутки в таблице
  // (меньше минимального или больше максимального)
  if (lastPlacePoints > leaguePoints || firstPlacePoints < leaguePoints) {
    // значит такой лиги точно нет
    return null;
  }

  // пока концы промежутка, в котором мы ищем, не сошлись
  while (left <= right) {
    // делим наш промежуток (примерно) пополам
    const middleIndex = Math.floor((right + left) / 2);
    const middle = leaderboard[middleIndex];

    const firstPlayerPoints = middle[middle.length - 1].leaguePoints;
    const lastPlayerPoints = middle[0].leaguePoints;

    // если очки входят в лигу по середине - значит, это то, что мы ищем
    // это единственное отличие нашего поиска от обычного — мы ищем не точное равенство, а попадание искомого в интервал
    if (lastPlayerPoints <= leaguePoints && leaguePoints <= firstPlayerPoints) {
      return middleIndex;
    }

    // если очков для этой лиги слишком мало
    if (lastPlayerPoints > leaguePoints) {
      // то двигаем правый край нашего поиска до серединки
      // (ищем от начала до текущей середины)
      right = middleIndex - 1;
      // а если наоборот слишком много
    } else if (leaguePoints > firstPlayerPoints) {
      // то ищем справа
      left = middleIndex + 1;
    }
  }

  // если края всё-таки сошлись - значит, такой лиги нет
  return null;
}

function searchInLeague(league: Player[], leaguePoints: number) {
  let left = 0;
  let right = league.length - 1;

  while (left <= right) {
    const middleIndex = Math.floor((right + left) / 2);
    const { leaguePoints: middleLeaguePoints } = league[middleIndex];

    if (middleLeaguePoints === leaguePoints) {
      return middleIndex;
    }

    if (middleLeaguePoints > leaguePoints) {
      right = middleIndex - 1;
    } else if (leaguePoints > middleLeaguePoints) {
      left = middleIndex + 1;
    }
  }

  return null;
}

console.log(searchScore(DATA, 1432)); // {"placement": 2, "league": 4 }
