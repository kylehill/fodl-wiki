export type PlayerSeason = {
  player: string;
  season?: string;
  division?: string;
  subdivision?: string;
  rank?: number;
  result?: PlayoffResult;
  regular?: SeasonRecord;
  playoff?: SeasonRecord;
  x01?: X01Stats;
  cricket?: CricketStats;
};

export type SimpleRecord = {
  W: number;
  L: number;
  D: number;
};

export type SeasonRecord = {
  cricket: SimpleRecord;
  x01: SimpleRecord;
  match: SimpleRecord;
  bonus: number;
};

export type PlayoffResult = {
  bracket: string;
  finish: string;
  transition: PlayoffTransition;
  result: string;
  color: PlayoffColor;
};

export enum PlayoffTransition {
  Promoted = "P",
  Relegated = "R",
  NoChange = "",
}

export enum PlayoffColor {
  Championship = "CP",
  AutoPromoted = "P",
  PromotionPlayoff = "PP",
  RelegationPlayoff = "RP",
  AutoRelegated = "R",
  NothingCup = "",
}

export type X01Stats = {
  t80: number;
  highOut: number;
  doubles: number;
  chances: number;
  points: number;
  darts: number;
  average?: number;
  checkoutRate?: number;
};

export type CricketStats = {
  m9: number;
  marks: number;
  darts: number;
  tb: number;
  hits: number;
  mpr?: number;
  tbRate?: number;
  hitRate?: number;
};

export type GraphStats = {
  season: string;
  mpr: number;
  average: number;
  checkoutRate: number;
};
