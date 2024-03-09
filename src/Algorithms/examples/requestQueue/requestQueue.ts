type SomeFunc = (args: any) => Promise<void>;

function createQueue(asyncFunction: SomeFunc) {
  // Создаём нашу очередь, будем хранить в ней аргументы для функции
  const queue: Record<any, any>[] = [];

  function dequeue() {
    // Берём аргументы из начала массива и вызываем функцию
    const args = queue[0] as any;

    asyncFunction(args).then(() => {
      // Как только промис нашей функции выполнится, удаляем выполнение этого задания из очереди
      queue.shift();

      // А если в очереди что-то осталось — выполняем
      if (queue.length) {
        dequeue();
      }
    });
  }

  // Вызываем функцию, обёрнутую в очередь, как обычно
  return (...args: any) => {
    // Кладём в очередь аргументы, необходимые для выполнения
    queue.push(args);

    // Если в очереди есть только наша задача — берём и выполняем её
    if (queue.length === 1) {
      dequeue();
    }
  };
}
