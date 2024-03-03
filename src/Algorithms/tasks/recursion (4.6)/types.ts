export type Player = {
  login: string;
  leaguePoints: number;
  guild: string;
};

export type PlayerWithPlacement = Player & {
  placement: number;
};

export type Guild = {
  guild: string;
  placement: Number;
};

export type Data = Array<Array<Player>>;
