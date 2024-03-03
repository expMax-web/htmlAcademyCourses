const root = document.body;
const resultElement = document.getElementById("result") as HTMLElement;

// поиск в ширину (breadth-first search, BFS)
// алгоритм хорошо подходит для поиска, если вы знаете, что искомый элемент, скорее всего, лежит «сверху» и есть основания полагать, что дерево довольно широкое.

export const traverse = (node: HTMLElement) => {
  const result: string[] = [];

  // очередь для просмотра нод
  const queue: Element[] = [];

  // куда мы сразу же кладем ноду, с которой будем начинать обход
  queue.push(node);

  // обходим, пока в очереди что-то есть
  while (queue.length) {
    // получаем ноду из списка
    const currentNode = queue.shift();

    // делаем всё, что нужно с нашей нодой (сейчас это просто перекладывание ноды в список просмотренных)
    result.push(currentNode?.localName || "");

    // и кладем в очередь всех потомков нашей ноды.
    // из-за того, что мы будем класть потомков в конец и доставать из начала, мы гарантированно просмотрим все ноды текущего уровня перед спуском на следующий
    if (currentNode) {
      queue.push(...currentNode.children);
    }
  }

  resultElement.innerHTML = result.join(" -> ");
};

traverse(root);
