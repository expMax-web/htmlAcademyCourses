import { DATA } from "../constants";
import { Player } from "../types";

function topThree(data: Player[]) {
  // Итерироваться будем три раза, либо, если в массиве меньше элементов, на один меньше его длины, как и в обычной сортировке
  const iterations = Math.min(data.length - 1, 3);

  for (let i = 0; i < iterations; i++) {
    // а вот внутри итерации всё ещё будем проходить полный массив, тут ничего не меняется
    for (let j = 0; j < data.length - 1; j++) {
      if (data[j].leaguePoints > data[j + 1].leaguePoints) {
        [data[j], data[j + 1]] = [data[j + 1], data[j]];
      }
    }
  }

  return data.slice(-3);
}

topThree(DATA); // Должен получить игроков BoostScooby, SaiyanBroadway, Mountaintrid
