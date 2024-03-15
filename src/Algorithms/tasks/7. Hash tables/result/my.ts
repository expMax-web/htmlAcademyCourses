import { DATA } from "../constants";
import { Message, MessagesCache } from "../types";

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
