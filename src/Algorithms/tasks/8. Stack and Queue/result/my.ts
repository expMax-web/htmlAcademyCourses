import { Player } from "../types";

const getStep = (max: number) => {
  return Math.floor(Math.random() * max);
};

const getWinnerIteration = (
  result: Player[],
  players: string[],
  lastIndex?: number
) => {
  // Берем шаг, опираясь на оставшуюся длину массива
  const maxStep = players.length > 4 ? 4 : players.length;
  const step = getStep(maxStep);

  const index = lastIndex || 0;

  const currentPlayerName = players[index + step] || players[0 + step];

  // Записываем проигравшего и удаляем из массива следующей итерации
  result.push({ login: currentPlayerName, step });
  players.splice(step, 1);

  // Повторяем пока нет победителя
  if (players.length !== 1) {
    getWinnerIteration(result, players, index);
  }
};

const getWinner = (data: string[]): { players: Player[]; winner: string } => {
  const result: Player[] = [];

  const players = [...data];

  getWinnerIteration(result, players);

  // В массиве players должен остаться 1 победитель
  return { players: result, winner: players[0] };
};

console.log(
  getWinner([
    "GottaSaiyan",
    "Mountaintrid",
    "Rectionom",
    "JoshChase",
    "DreamLess",
    "BlondiePlanet",
    "Breakingbing",
    "Goldenelox",
  ])
);
