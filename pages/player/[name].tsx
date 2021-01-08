import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import PlayerPage from "containers/PlayerPage";
import { getCsvData, getCsvPlayers } from "util/getCsvData";
import { convertNameToSlug } from "util/convertToSlug";
import { GraphStats, PlayerSeason } from "types/season";
import { calculateRecord, combinePlayerSeasons } from "util/recordMath";
import { Player } from "types/player";

type Props = {
  seasonRecords: PlayerSeason[];
  aggregatedRecords: GraphStats[];
  playerRecord: { playerData: true; player: Player } | { playerData: false };
};

const Route = ({ seasonRecords, aggregatedRecords, playerRecord }: Props) => {
  if (playerRecord.playerData) {
    return (
      <PlayerPage
        aggregated={aggregatedRecords}
        records={seasonRecords}
        player={playerRecord.player}
      />
    );
  }

  return <PlayerPage aggregated={aggregatedRecords} records={seasonRecords} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const playerName = (params || {}).name;
  const data = await getCsvData();
  const seasonRecords = data.filter((row) => convertNameToSlug(row.player) === playerName);
  const players = await getCsvPlayers();
  const playerRecord = players.filter((row) => convertNameToSlug(row.name) === playerName)[0];

  const aggregatedSeasons = data.reduce((mem, record) => {
    if (!record.season) {
      return mem;
    }

    return {
      ...mem,
      [record.season]: (mem[record.season] || []).concat(record),
    };
  }, {} as Record<string, PlayerSeason[]>);

  const aggregatedRecords = Object.entries(aggregatedSeasons).map(
    ([key, value]): GraphStats => {
      const aggregated = calculateRecord(combinePlayerSeasons(value));

      return {
        season: key,
        mpr: aggregated.cricket?.mpr || 0,
        average: aggregated.x01?.average || 0,
        checkoutRate: aggregated.x01?.checkoutRate || 0,
      };
    }
  );

  return {
    props: {
      seasonRecords,
      aggregatedRecords,
      playerRecord: playerRecord
        ? { playerData: true, player: playerRecord }
        : { playerData: false },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getCsvData();
  const players = data.reduce((mem, season) => {
    mem.add(season.player);
    return mem;
  }, new Set<string>());

  const names = [...players].map(convertNameToSlug);

  return {
    paths: names.map((name) => ({
      params: {
        name,
      },
    })),
    fallback: false,
  };
};

export default Route;
