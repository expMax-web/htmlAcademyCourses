export type Player = {
  login: string;
  leaguePoints: number;
};

export type League = {
  league: Number;
  placement: Number;
};

export type Data = Array<Array<Player>>;
