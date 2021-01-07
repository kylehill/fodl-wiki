import { PlayerSeason } from "types/season";
import { StatsPageNormalizedPlayerSeason, StatsPageView } from "types/stats_page";
import { calculateRecord, combinePlayerSeasons } from "util/recordMath";
import Link from "next/link";
import { convertNameToSlug, convertSeasonToSlug } from "util/convertToSlug";

const genericNormalize = (records: PlayerSeason[]): StatsPageNormalizedPlayerSeason => {
  const calculated = calculateRecord(combinePlayerSeasons(records));

  const cricket_win = (calculated.regular?.cricket.W || 0) + (calculated.playoff?.cricket.W || 0);
  const cricket_loss = (calculated.regular?.cricket.L || 0) + (calculated.playoff?.cricket.L || 0);
  const cricket_wpct = cricket_win / (cricket_win + cricket_loss || 1);

  const x01_win = (calculated.regular?.x01.W || 0) + (calculated.playoff?.x01.W || 0);
  const x01_loss = (calculated.regular?.x01.L || 0) + (calculated.playoff?.x01.L || 0);
  const x01_wpct = x01_win / (x01_win + x01_loss || 1);

  const rs_match_win = calculated.regular?.match.W || 0;
  const rs_match_loss = calculated.regular?.match.L || 0;
  const rs_match_draw = calculated.regular?.match.D || 0;
  const rs_matches = rs_match_win + rs_match_draw + rs_match_loss;
  const rs_match_wpct = (rs_match_win + rs_match_draw * 0.5) / (rs_matches || 1);
  const rs_bonus = calculated.regular?.bonus || 0;
  const rs_bonus_rate = rs_bonus / (rs_matches || 1);

  const po_match_win = calculated.playoff?.match.W || 0;
  const po_match_loss = calculated.playoff?.match.L || 0;
  const po_match_wpct = po_match_win / (po_match_win + po_match_loss || 1);

  return {
    player: calculated.player,
    season: records.length ? records[0].season || "" : "",
    division: records.length ? records[0].division || "" : "",

    cricket_legs: cricket_win + cricket_loss,
    mpr: calculated.cricket?.mpr || 0,
    tbRate: calculated.cricket?.tbRate || 0,
    hitRate: calculated.cricket?.hitRate || 0,
    m9: calculated.cricket?.m9 || 0,

    x01_legs: x01_win + x01_loss,
    average: calculated.x01?.average || 0,
    checkoutRate: calculated.x01?.checkoutRate || 0,
    highOut: calculated.x01?.highOut || 0,
    t80: calculated.x01?.t80 || 0,

    seasonCount: records.length,
    stars: records.reduce(
      (mem, record) =>
        mem + (record.result?.bracket === "Championship" && record.result?.finish === "W" ? 1 : 0),
      0
    ),
    rs_titles: records.reduce((mem, record) => mem + (record.rank === 1 ? 1 : 0), 0),
    playoff_wins: records.reduce((mem, record) => mem + (record.result?.finish === "W" ? 1 : 0), 0),

    cricket_win,
    cricket_loss,
    cricket_wpct,

    x01_win,
    x01_loss,
    x01_wpct,

    leg_win: cricket_win + x01_win,
    leg_loss: cricket_loss + x01_loss,
    leg_wpct: (cricket_win + x01_win) / (cricket_win + cricket_loss + x01_win + x01_loss || 1),

    rs_match_win,
    rs_match_loss,
    rs_match_draw,
    rs_match_wpct,
    rs_bonus,
    rs_bonus_rate,

    po_match_win,
    po_match_loss,
    po_match_wpct,
  };
};

const playerNormalize = (records: PlayerSeason[]): StatsPageNormalizedPlayerSeason[] => {
  const players = records.reduce((mem, record) => {
    return {
      ...mem,
      [record.player]: (mem[record.player] || []).concat(record),
    };
  }, {} as Record<string, PlayerSeason[]>);

  return Object.values(players).map(genericNormalize);
};

const careerStatsView: StatsPageView = {
  active: true,
  title: "Career Stats",
  initialSortColumn: "average",
  columns: {
    player: {
      title: "Player",
      link: (n) => {
        return <Link href={`/player/${convertNameToSlug(n)}`}>{n}</Link>;
      },
    },

    cricket_legs: { title: "Legs" },
    mpr: { title: "MPR", format: (n) => n.toFixed(2) },
    tbRate: { title: "T/B%", format: (n) => (n * 100).toFixed(2) },
    hitRate: { title: "Hit%", format: (n) => (n * 100).toFixed(2) },
    m9: { title: "9M" },

    x01_legs: { title: "Legs" },
    average: { title: "Average", format: (n) => n.toFixed(2) },
    checkoutRate: { title: "CO%", format: (n) => (n * 100).toFixed(2) },
    highOut: { title: "High Out" },
    t80: { title: "180s" },
  },
  sections: [
    { columns: ["player"] },
    { title: "Cricket", columns: ["cricket_legs", "mpr", "tbRate", "hitRate", "m9"] },
    { title: "501", columns: ["x01_legs", "average", "checkoutRate", "highOut", "t80"] },
  ],
  normalize: playerNormalize,
};

const seasonStatsView: StatsPageView = {
  active: false,
  title: "Season Stats",
  initialSortColumn: "average",
  columns: {
    player: {
      title: "Player",
      link: (n) => {
        return <Link href={`/player/${convertNameToSlug(n)}`}>{n}</Link>;
      },
    },
    season: {
      title: "Season",
      link: (n) => {
        return <Link href={`/season/${convertSeasonToSlug(n)}`}>{n}</Link>;
      },
    },

    mpr: { title: "MPR", format: (n) => n.toFixed(2) },
    tbRate: { title: "T/B%", format: (n) => (n * 100).toFixed(2) },
    hitRate: { title: "Hit%", format: (n) => (n * 100).toFixed(2) },
    m9: { title: "9M" },

    average: { title: "Average", format: (n) => n.toFixed(2) },
    checkoutRate: { title: "CO%", format: (n) => (n * 100).toFixed(2) },
    highOut: { title: "High Out" },
    t80: { title: "180s" },
  },
  sections: [
    { columns: ["player", "season"] },
    { title: "Cricket", columns: ["mpr", "tbRate", "hitRate", "m9"] },
    { title: "501", columns: ["average", "checkoutRate", "highOut", "t80"] },
  ],
  normalize: (records) => records.map((record) => genericNormalize([record])),
};

const careerMatchesView: StatsPageView = {
  active: false,
  title: "Match Record",
  initialSortColumn: "rs_match_wpct",
  columns: {
    player: {
      title: "Player",
      link: (n) => {
        return <Link href={`/player/${convertNameToSlug(n)}`}>{n}</Link>;
      },
    },
    stars: { title: "Stars" },
    rs_titles: { title: "Divisions" },
    playoff_wins: { title: "Playoffs" },
    rs_match_win: { title: "W" },
    rs_match_loss: { title: "L" },
    rs_match_draw: { title: "T" },
    rs_match_wpct: { title: "WPct", format: (n) => n.toFixed(3) },
    rs_bonus: { title: "BP" },
    rs_bonus_rate: { title: "BP/Match", format: (n) => n.toFixed(3) },
    po_match_win: { title: "W" },
    po_match_loss: { title: "L" },
    po_match_wpct: { title: "WPct", format: (n) => n.toFixed(3) },
  },
  sections: [
    { columns: ["player"] },
    { title: "Titles", columns: ["stars", "rs_titles", "playoff_wins"] },
    {
      title: "Regular Season",
      columns: [
        "rs_match_win",
        "rs_match_loss",
        "rs_match_draw",
        "rs_match_wpct",
        "rs_bonus",
        "rs_bonus_rate",
      ],
    },
    { title: "Playoffs", columns: ["po_match_win", "po_match_loss", "po_match_wpct"] },
  ],
  normalize: playerNormalize,
};

const careerLegsView: StatsPageView = {
  active: false,
  title: "Leg Record",
  initialSortColumn: "leg_win",
  columns: {
    player: {
      title: "Player",
      link: (n) => {
        return <Link href={`/player/${convertNameToSlug(n)}`}>{n}</Link>;
      },
    },

    cricket_win: { title: "W" },
    cricket_loss: { title: "L" },
    cricket_wpct: { title: "WPct", format: (n) => n.toFixed(3) },
    x01_win: { title: "W" },
    x01_loss: { title: "L" },
    x01_wpct: { title: "WPct", format: (n) => n.toFixed(3) },
    leg_win: { title: "W" },
    leg_loss: { title: "L" },
    leg_wpct: { title: "WPct", format: (n) => n.toFixed(3) },
  },
  sections: [
    { columns: ["player"] },
    { title: "All Legs", columns: ["leg_win", "leg_loss", "leg_wpct"] },
    { title: "501", columns: ["x01_win", "x01_loss", "x01_wpct"] },
    { title: "Cricket", columns: ["cricket_win", "cricket_loss", "cricket_wpct"] },
  ],
  normalize: playerNormalize,
};

export default [careerStatsView, seasonStatsView, careerMatchesView, careerLegsView];
