// Решение задачи о рюкзаке с помощью динамического программирования

/* Предположим, вы разрабатываете веб-приложение для загрузки файлов — этакий менеджер загрузок из прошлого. 
Но из-за ограничений на стороне сервера можете получать данные только пачками по 10 мегабайт. 
Все файлы при этом тоже разбиты на части: какие-то файлы могут быть с частями по 7 МБ, какие-то — по 4 МБ, какие-то — по 5 МБ. 
Например, чтобы скачать файл размером 15 МБ, разбитый на три части по 5 МБ нам придётся запросить с сервера две пачки данных. 
В первой будет две части по 5 МБ, а во второй последняя часть. 
Задача состоит в том, чтобы добавить в каждую пачку с сервера столько частей разных файлов, чтобы в итоге использовать максимальное количество доступного места.
*/

// Напишем нашу функцию для оптимизации, принимающую массив размеров частей и размер пачки
function prioritize(filePartSizes: number[], chunkSize: number) {
  // создаем нашу табличку
  const table = Array(filePartSizes.length)
    .fill(null)
    .map(() => Array(chunkSize).fill(0));

  // Заполняем каждую строчку последовательно
  for (let rowIndex = 0; rowIndex < filePartSizes.length; rowIndex++) {
    for (let cellIndex = 0; cellIndex < chunkSize; cellIndex++) {
      const currentChunkSize = cellIndex + 1;
      const currentFilePartSize = filePartSizes[rowIndex];

      // считаем максимальное количество места, которое мы можем занять частями текущего размера
      const maximumCurrent =
        Math.floor(currentChunkSize / currentFilePartSize) *
        currentFilePartSize;

      // максимальное количество данных, которое мы можем положить в оставшееся количество места
      // берем максимум решения предыдущей подзадачи для оставшегося места если оно есть, либо 0
      const maximumRest =
        (table[rowIndex - 1] &&
          table[rowIndex - 1][cellIndex - maximumCurrent]) ||
        0;

      // получаем общее решение для данной ячейки
      const solution = maximumCurrent + maximumRest;

      // Если есть, с чем сравнить текущее решение — сравниваем и берем максимум
      table[rowIndex][cellIndex] =
        rowIndex > 0
          ? Math.max(solution, table[rowIndex - 1][cellIndex])
          : solution;
    }
  }

  // Результат — нижняя правая ячейка
  return table[filePartSizes.length - 1][chunkSize - 1];
}

prioritize([8, 5, 4, 7], 11);
