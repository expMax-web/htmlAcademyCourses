import { DATA } from "../constants";

function searchSubtask(
  leaderboard: any,
  leaguePoints: any,
  topBorder: any,
  leftBorder: any,
  bottomBorder: any,
  rightBorder: any
): any {
  // Если границы сошлись — ничего не нашлось
  if (leftBorder > rightBorder || topBorder > bottomBorder) {
    return null;
  }

  // Если границы сошлись до единственного элемента, то проверяем, подходит ли он нам
  if (leftBorder === rightBorder && topBorder === bottomBorder) {
    const candidate = leaderboard[topBorder][leftBorder];

    return candidate.leaguePoints === leaguePoints
      ? {
          guild: candidate.guild,
          placement: leaderboard[topBorder].length - leftBorder,
        }
      : null;
  }

  const middleY = Math.floor((topBorder + bottomBorder) / 2);
  const middleX = Math.floor((leftBorder + rightBorder) / 2);
  const { leaguePoints: candidateLeaguePoints } = leaderboard[middleY][middleX];

  // Если нам нужно найти части, где количество очков больше, чем по середине, то это...
  if (candidateLeaguePoints < leaguePoints) {
    return (
      searchSubtask(
        leaderboard,
        leaguePoints,
        topBorder,
        middleX + 1,
        middleY,
        rightBorder
      ) || // верхняя правая
      searchSubtask(
        leaderboard,
        leaguePoints,
        middleY + 1,
        leftBorder,
        bottomBorder,
        middleX
      ) || // нижняя левая
      searchSubtask(
        leaderboard,
        leaguePoints,
        middleY + 1,
        middleX + 1,
        bottomBorder,
        rightBorder
      )
    ); // нижняя правая
    // а если меньше, то...
  } else {
    return (
      searchSubtask(
        leaderboard,
        leaguePoints,
        topBorder,
        middleX + 1,
        middleY,
        rightBorder
      ) || // верхняя правая
      searchSubtask(
        leaderboard,
        leaguePoints,
        middleY + 1,
        leftBorder,
        bottomBorder,
        middleX
      ) || // нижняя левая
      searchSubtask(
        leaderboard,
        leaguePoints,
        topBorder,
        leftBorder,
        middleY,
        middleX
      )
    ); // верхняя левая
  }
}

function searchScore(leaderboard: any, leaguePoints: any) {
  if (!(leaderboard.length && leaderboard[0].length)) {
    return null;
  }

  const bottomBorder = leaderboard.length - 1;
  const rightBorder = leaderboard[0].length - 1;

  return searchSubtask(
    leaderboard,
    leaguePoints,
    0,
    0,
    bottomBorder,
    rightBorder
  );
}

console.log(searchScore(DATA, 4)); // {"guild": "seabass", "placement": 4 }

console.log(searchScore(DATA, 14)); // null
