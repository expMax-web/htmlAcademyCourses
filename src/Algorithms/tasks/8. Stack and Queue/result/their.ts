const MAX_STEP = 3;
const players = [
  "GottaSaiyan",
  "Mountaintrid",
  "Rectionom",
  "JoshChase",
  "DreamLess",
  "BlondiePlanet",
  "Breakingbing",
  "Goldenelox",
];

function randomStep() {
  return Math.floor(Math.random() * MAX_STEP + 1);
}

function play(players: any) {
  players = [...players];

  const eliminated = [];

  // пока у нас нет победителя
  while (players.length !== 1) {
    const step = randomStep();
    let remove = step;

    // пока не дошли до вылетающего человека
    while (remove) {
      // берём человека, первого в очереди на удаление
      const first = players.shift();

      // и кладём его в конец ожидающих удаления...
      players.push(first);

      remove--;
    }

    // как только дошли до удаляемого — удаляем его из очереди и кладём в наш массив результатов игры
    const eliminatedLogin = players.shift();

    eliminated.push({
      login: eliminatedLogin,
      step,
    });
  }

  return eliminated;
}
