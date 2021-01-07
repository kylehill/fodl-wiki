export type Match = {
  matchType: MatchType;
  season: string;
  title: string;
  round: string;
  players: MatchPlayers;
  score: MatchScore;
};

export enum MatchType {
  RegularSeason,
  Playoff,
}

export type MatchPlayers = [string, string] | null;
export type MatchScore = [number, number] | null;
