function bubbleSort(array: number[]) {
  // проходим весь массив столько раз, сколько в нём элементов - 1, потому что, как мы выяснили в статье,
  // последняя итерация "добьет" сразу два последних элемента
  for (let i = 0; i < array.length - 1; i++) {
    // в рамках каждого прохода нам тоже нужно просматривать на один элемент меньше,
    // ведь для последнего элемента мы не найдем следующий, с которым будем его сравнивать
    // а ещё каждую итерацию будем смотреть на один элемент поменьше, ведь справа будет уже сортированная его часть
    for (let j = 0; j < array.length - 1 - i; j++) {
      // если элемент слева больше элемента справа...
      if (array[j] > array[j + 1]) {
        /// ... меняем их местами
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  return array;
}

bubbleSort([56, 87, 18, 92, 42, 31, 44, 82, 36, 91]);
