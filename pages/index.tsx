import React from "react";
import SeasonPage from "containers/SeasonPage";
import { GetStaticProps } from "next";
import { getCsvData, getCsvPlayoffs } from "util/getCsvData";
import { PlayerSeason } from "types/season";
import { Match } from "types/match";

type Props = {
  playoffRecords: Match[];
  seasonRecords: PlayerSeason[];
};

const Route = ({ playoffRecords, seasonRecords }: Props) => {
  return <SeasonPage playoffs={playoffRecords} records={seasonRecords} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const data = await getCsvData();
  const playoffs = await getCsvPlayoffs();

  const seasons = data.reduce((mem, record) => {
    if (record.season) {
      mem.add(record.season);
    }
    return mem;
  }, new Set<string>());

  const seasonNames = [...seasons];
  const lastSeason = seasonNames[seasonNames.length - 1];

  const seasonRecords = data.filter((row) => row.season === lastSeason);
  const playoffRecords = playoffs.filter((row) => row.season === lastSeason);

  return {
    props: {
      playoffRecords,
      seasonRecords,
    },
  };
};

export default Route;
