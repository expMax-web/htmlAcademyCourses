function countJumps(pebbles: number[]) {
  let jumps = 0;

  let previousPosition = 0; // Позиция предыдущего оптимального прыжка
  let currentPosition = 0; // Позиция текущего прыжка

  // Пока не допрыгали до конца...
  while (currentPosition < pebbles.length - 1) {
    // Прыгаем!
    jumps++;

    // Нам нужно обойти все камни, которые мы можем достигнуть с предыдущего до текущего прыжка
    // Но так как дальше мы будем менять previousPosition, я заранее сохраняю его
    let candidate = previousPosition;

    // Текущий прыжок становится предыдущим
    previousPosition = currentPosition;

    while (candidate <= previousPosition) {
      currentPosition = Math.max(
        currentPosition,
        candidate + pebbles[candidate]
      );
      candidate++;
    }
  }

  return jumps;
}

countJumps([2, 3, 1, 1, 4]); // toEqual => 2
