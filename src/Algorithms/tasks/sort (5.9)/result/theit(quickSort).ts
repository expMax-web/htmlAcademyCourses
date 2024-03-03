import { DATA } from "../constants";
import { Data } from "../types";

function topThree(data: Data) {
  if (data.length <= 3) {
    return sortThree(data);
  }

  // Мы очень хотим, чтобы наша точка поворота оказалась ровно в начале троицы, которую нам нужно вернуть, чтобы не сортировать лишних подмассивов
  const desiredPivot = data.length - 3;

  // Будем хранить последнюю точку поворота, которую нам дало разделение
  let pivot = partition(data, 0, data.length - 1);
  // Ещё сохраним минимальную точку поворота, начиная с которой нам будет неинтересно, что происходит левее — нам всё-таки надо отсортировать только самую правую часть массива
  // При том, если мы сразу перескочили нужную нам точку поворота, то нам всё-таки придется посмотреть на левые элементы
  let minimalPivot = pivot > desiredPivot ? 0 : pivot;

  // Пока точка поворота не в том месте, которое нам необходимо, пытаемся сдвинуть её туда
  while (pivot !== desiredPivot) {
    // Если мы правее, чем нужно, значит нужно сдвинуться левее
    if (pivot > desiredPivot) {
      // Мы знаем, с какого элемента нам сортировка неинтересна, так что там сортировать и не будем
      pivot = partition(data, minimalPivot, pivot);
      // А иначе подвигаемся вправо
    } else {
      pivot = partition(data, minimalPivot, data.length - 1);
    }

    // Обновим минимально интересный нам подмассив по аналогии с его инициализацией
    minimalPivot = pivot > desiredPivot ? minimalPivot : pivot;
  }

  return sortThree(data.slice(-3));
}

// Простая сортировка а-ля сортировки вставкой, которая может работать только с массивами из трех и менее элементов, которая из-за лимита на входные данные, работает за O(1)
function sortThree(array: Data) {
  // Если массив пуст, то его и вернём
  if (!array.length) {
    return array;
  }

  // Иначе положим первый элемент в отсортированный массив
  const sorted = [array[0]];

  // Если в массиве есть второе число, то вставим его в нужное место в нашем отсортированном
  if (array[1]) {
    if (array[1].leaguePoints > array[0].leaguePoints) {
      sorted.push(array[1]);
    } else {
      sorted.unshift(array[1]);
    }
  }

  // Если в массиве есть и третье число, то также вставим и его
  if (array[2]) {
    // Либо в начало, если он меньше начала отсортированного массива
    if (array[2].leaguePoints < sorted[0].leaguePoints) {
      sorted.unshift(array[2]);
      // Либо в конец, если он больше начала отсортированного массива
    } else if (array[2].leaguePoints > sorted[1].leaguePoints) {
      sorted.push(array[2]);
      // Либо в середину в ином случае
    } else {
      sorted.splice(1, 0, array[2]);
    }
  }

  return sorted.reverse();
}

function random(min: number, max: number) {
  const interval = max - min; // Интервал, в котором могут находится наши числа
  const shift = min; // Поиск рандомного числа будет начинаться не с нуля, а с min

  return Math.round(Math.random() * interval + shift);
}

// Так как в подразбиениях после рекурсивного вызова сортировки мы будем работать не с целым массивом, а его частями, сразу сделаем дополнительные параметры для их определения
function partition(array: Data, left: number, right: number) {
  // Находим значение, вокруг которого будем размещать элементы
  const { leaguePoints: pivotPoints } = array[random(left, right)];

  // Как и в бинпоиске, будем сходиться с краёв в центр, пока не просмотрим все элементы
  while (left <= right) {
    // Пока слева встречаются только числа меньше поворотного...
    while (array[left].leaguePoints < pivotPoints) {
      // ... просто двигаем левый указатель вправо, ведь с этими числами ничего делать не надо
      left++;
    }

    // Пока справа встречаются только числа больше поворотного...
    while (array[right].leaguePoints > pivotPoints) {
      // ... просто двигаем правый указатель влево, ведь с этими числами ничего делать не надо
      right--;
    }

    // А как только оба указателя показывают на элементы, которые должны быть в противоположных частях, и мы всё ещё не сошлись к точке поворота...
    if (left <= right) {
      // ...меняем их местами и не забываем двигать оба указателя, так как теперь оба числа на своём месте
      [array[left], array[right]] = [array[right], array[left]];
      left++;
      right--;
    }
  }

  // Возвращаем место, где оказался элемент, равный нашей точке поворота или конец массива, если мы его перескочили
  return Math.min(left, array.length - 1);
}

topThree(DATA); // Должен получить игроков BoostScooby, SaiyanBroadway, Mountaintrid
