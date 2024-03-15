export type Message = {
  message: string;
  timestamp: number;
};

export type CachedMessages = {
  timestamp: number;
  index: number;
  count: number;
};

export type MessagesCache = Map<string, CachedMessages>;
