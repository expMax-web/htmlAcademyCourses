import { Message, MessagesCache } from "../types";

const DATA: Message[] = [
  {
    message: "Cannot read property 'score' of undefined",
    timestamp: 0,
  },
  {
    message: "TypeError: 'undefined' is not an object",
    timestamp: 0,
  },
  {
    message: "Cannot read property 'score' of undefined",
    timestamp: 3,
  },
  {
    message: "TypeError: 'undefined' is not an object",
    timestamp: 5,
  },
  {
    message: "TypeError: 'undefined' is not an object",
    timestamp: 10,
  },
  {
    message: "Uncaught RangeError: Maximum call stack size exceeded",
    timestamp: 14,
  },
  {
    message: "Cannot read property 'score' of undefined",
    timestamp: 15,
  },
  {
    message: "ReferenceError: event is not defined",
    timestamp: 18,
  },
  {
    message: "Cannot read property 'score' of undefined",
    timestamp: 21,
  },
  {
    message: "ReferenceError: event is not defined",
    timestamp: 22,
  },
];

const useCache = (
  cache: MessagesCache,
  item: Message,
  preparedMessages: string[]
) => {
  const currentMessage = cache.get(item.message);

  const { timestamp, index = 0, count = 0 } = currentMessage || {};

  if (!currentMessage || (timestamp && timestamp < item.timestamp - 5)) {
    cache.set(item.message, {
      timestamp: item.timestamp,
      index: preparedMessages.length,
      count: 1,
    });

    preparedMessages.push(item.message);
  } else {
    preparedMessages[index] = `${item.message} (x${count + 1})`;

    cache.set(item.message, {
      timestamp: item.timestamp,
      index: preparedMessages.length - 1,
      count: count + 1,
    });
  }
};

const cachedLogger = (messages: Message[]) => {
  const cache: MessagesCache = new Map();

  const preparedMessages: string[] = [];

  messages.forEach((item) => {
    useCache(cache, item, preparedMessages);
  });

  return preparedMessages;
};

console.log(cachedLogger(DATA));
