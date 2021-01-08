import fs from "fs";
import { Match, MatchType } from "types/match";
import { Player } from "types/player";
import { PlayerSeason, PlayoffColor, PlayoffTransition } from "types/season";

export const convertCsvDataRow = (row: string): PlayerSeason => {
  const cells = row.split(",");

  const record: PlayerSeason = {
    player: cells[0],
    season: cells[1],
    division: cells[2].substr(0, 1),
    subdivision: cells[2],
    result: {
      bracket: cells[22],
      finish: cells[23],
      transition: cells[24] as PlayoffTransition,
      result: cells[25],
      color: cells[26] as PlayoffColor,
    },
  };

  if (cells[5] !== "") {
    record.rank = Number(cells[3]);
    record.regular = {
      cricket: {
        W: Number(cells[5]),
        L: Number(cells[6]),
        D: 0,
      },
      x01: {
        W: Number(cells[7]),
        L: Number(cells[8]),
        D: 0,
      },
      bonus: Number(cells[9]),
      match: {
        W: Number(cells[10]),
        L: Number(cells[11]),
        D: Number(cells[12]),
      },
    };
  }

  if (cells[14] !== "") {
    record.playoff = {
      cricket: {
        W: Number(cells[14]),
        L: Number(cells[15]),
        D: 0,
      },
      x01: {
        W: Number(cells[16]),
        L: Number(cells[17]),
        D: 0,
      },
      bonus: 0,
      match: {
        W: Number(cells[18]),
        L: Number(cells[19]),
        D: Number(cells[20]),
      },
    };
  }

  if (cells[28] !== "") {
    record.x01 = {
      t80: Number(cells[28]),
      highOut: Number(cells[29]),
      doubles: Number(cells[30]),
      chances: Number(cells[31]),
      points: Number(cells[32]),
      darts: Number(cells[33]),
    };
  }

  if (cells[38] !== "") {
    record.cricket = {
      m9: Number(cells[38]),
      marks: Number(cells[39]),
      darts: Number(cells[40]),
      tb: Number(cells[41]),
      hits: Number(cells[42]),
    };
  }

  return record;
};

export const getCsvData = async (): Promise<PlayerSeason[]> => {
  const text = await fs.promises.readFile(`${process.cwd()}/data/data.csv`, "utf8");
  const rows = text.split("\n");

  return rows
    .slice(2)
    .filter((row) => !row.startsWith(","))
    .map(convertCsvDataRow);
};

export const convertCsvPlayoffRow = (row: string): Match => {
  const cells = row.split(",");

  return {
    matchType: MatchType.Playoff,
    season: cells[0],
    title: cells[1],
    round: cells[2],
    players: cells[3] !== "" && cells[4] !== "" ? [cells[3], cells[4]] : null,
    score: cells[5] !== "" ? [Number(cells[5]), Number(cells[6])] : null,
  };
};

export const getCsvPlayoffs = async (): Promise<Match[]> => {
  const text = await fs.promises.readFile(`${process.cwd()}/data/playoffs.csv`, "utf8");
  const rows = text.split("\n");

  return rows
    .slice(1)
    .filter((row) => !row.startsWith(","))
    .map(convertCsvPlayoffRow);
};

export const convertCsvPlayerRow = (row: string): Player => {
  const cells = row.split(",");

  return {
    name: cells[1],
    location: cells[2],
    darts: cells[3],
    hashtag: cells[4],
    twitter: cells[5],
    bio: cells[6],
  };
};

export const getCsvPlayers = async (): Promise<Player[]> => {
  const text = await fs.promises.readFile(`${process.cwd()}/data/playoffs.csv`, "utf8");
  const rows = text.split("\n");

  return rows
    .slice(1)
    .filter((row) => !row.startsWith(","))
    .map(convertCsvPlayerRow);
};
