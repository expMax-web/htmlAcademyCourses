const root = document.body;
const resultElement = document.getElementById("result") as HTMLElement;

//поиск в глубину (DFS, Depth-first search)
//Этот метод подойдёт, если есть подозрения, что нужный элемент находится внизу дерева и оно «узкое»

export const traverse = (node: Element) => {
  const result: string[] = [];

  // в рекурсивной функции...
  function recursive(node: Element) {
    // ... сначала обрабатываем ноду, в которой находимся ...
    result.push(node.localName);

    // ...а потом вызываем её же на всех детях
    for (const child of node.children) {
      recursive(child);
    }
  }

  recursive(node);

  resultElement.innerHTML = result.join(" -> ");
};

traverse(root);
