type Data = Item[];

type Item = {
  ticker: string;
  price: number;
};

function sortPush(array: Item[], element: Item) {
  // Сначала предположим, что элемент пойдет прямо в начало массива
  let pointOfInsertion = 0;

  // Пока не встретим элемент больше вставляемого или конец массива...
  while (
    pointOfInsertion < array.length &&
    element.price > array[pointOfInsertion].price
  ) {
    // ... двигаем указатель на место вставки
    pointOfInsertion++;
  }

  return pointOfInsertion === 0
    ? [element, ...array]
    : [
        ...array.slice(0, pointOfInsertion),
        element,
        ...array.slice(pointOfInsertion),
      ];
}

// Список из заранее загруженных данных
const data = [
  {
    ticker: "WISH",
    price: 5.14,
  },
  {
    ticker: "SPCE",
    price: 20.1,
  },
  {
    ticker: "AAPL",
    price: 151.86,
  },
  {
    ticker: "QCOM",
    price: 155.98,
  },
  {
    ticker: "ABNB",
    price: 178.06,
  },
];

const loaded = {
  ticker: "BABA",
  price: 166.99,
};

sortPush(data, loaded); // Добавит новый элемент предпоследним в наш список
