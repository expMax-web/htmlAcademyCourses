import htmlDoc from "../constants";
import { QueueItem } from "../types";

const colors = ["#DCD6F7", "#A6B1E1", "#B4869F"];
const elementToStyle = "LI";

const addColorForBackgound = (node: Element) => {
  const queue: QueueItem[] = [];

  queue.push({
    node,
    depth: 0,
  });

  while (queue.length) {
    const { node: currentNode, depth: currentDepth = 0 } = queue.shift() || {};

    const isStylable = currentNode?.tagName === elementToStyle;

    if (isStylable) {
      currentNode?.setAttribute(
        "style",
        `background-color : ${colors[currentDepth % 3]}`
      );
    }

    if (!currentNode?.children) {
      continue;
    }

    for (const node of currentNode.children) {
      queue.push({
        node,
        depth: isStylable ? currentDepth + 1 : currentDepth,
      });
    }
  }
};

addColorForBackgound(htmlDoc);
