import { CricketStats, PlayerSeason, SeasonRecord, SimpleRecord, X01Stats } from "types/season";

const addX01 = (a: X01Stats, b: X01Stats): X01Stats => {
  return {
    chances: a.chances + b.chances,
    darts: a.darts + b.darts,
    doubles: a.doubles + b.doubles,
    highOut: Math.max(a.highOut, b.highOut),
    points: a.points + b.points,
    t80: a.t80 + b.t80,
  };
};

const addCricket = (a: CricketStats, b: CricketStats): CricketStats => {
  return {
    darts: a.darts + b.darts,
    hits: a.hits + b.hits,
    m9: a.m9 + b.m9,
    marks: a.marks + b.marks,
    tb: a.tb + b.tb,
  };
};

const addRecords = (a: SimpleRecord, b: SimpleRecord): SimpleRecord => {
  return {
    W: a.W + b.W,
    L: a.L + b.L,
    D: a.D + b.D,
  };
};

const addSeasonRecord = (a: SeasonRecord, b: SeasonRecord): SeasonRecord => {
  return {
    bonus: a.bonus + b.bonus,
    cricket: addRecords(a.cricket, b.cricket),
    x01: addRecords(a.x01, b.x01),
    match: addRecords(a.match, b.match),
  };
};

export const addPlayerSeasons = (a: PlayerSeason, b: PlayerSeason): PlayerSeason => {
  return {
    player: a.player,
    cricket: a.cricket && b.cricket ? addCricket(a.cricket, b.cricket) : a.cricket || b.cricket,
    x01: a.x01 && b.x01 ? addX01(a.x01, b.x01) : a.x01 || b.x01,
    regular:
      a.regular && b.regular ? addSeasonRecord(a.regular, b.regular) : a.regular || b.regular,
    playoff:
      a.playoff && b.playoff ? addSeasonRecord(a.playoff, b.playoff) : a.playoff || b.playoff,
  };
};

export const combinePlayerSeasons = (seasons: PlayerSeason[]): PlayerSeason => {
  return seasons.reduce(addPlayerSeasons);
};

export const displayRecord = (regular?: SimpleRecord, playoff?: SimpleRecord): string => {
  if (!(regular || playoff)) {
    return "-";
  }

  if (!(regular && playoff)) {
    const record = (regular || playoff) as SimpleRecord;
    return `${record.W}-${record.L}${record.D ? "-" + record.D : ""}`;
  }

  return `${regular.W + playoff.W}-${regular.L + playoff.L}${
    regular.D ? "-" + (regular.D + playoff.D) : ""
  }`;
};

export const combineRecords = (x: (undefined | SimpleRecord)[]): string => {
  return displayRecord(
    x.reduce((mem, rec) => {
      if (!rec) {
        return mem;
      }
      if (!mem) {
        return rec;
      }
      return addRecords(mem, rec);
    })
  );
};

export const calculateRecord = (record: PlayerSeason): PlayerSeason => {
  if (record.x01) {
    const x01Stats = {
      ...record.x01,
      average: (record.x01.points / record.x01.darts) * 3,
      checkoutRate: record.x01.doubles / record.x01.chances,
    };
    record.x01 = x01Stats;
  }

  if (record.cricket) {
    const cricketStats = {
      ...record.cricket,
      mpr: (record.cricket.marks / record.cricket.darts) * 3,
      hitRate: record.cricket.hits / record.cricket.darts,
      tbRate: record.cricket.tb / record.cricket.darts,
    };
    record.cricket = cricketStats;
  }

  return record;
};
