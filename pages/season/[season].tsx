import React from "react";
import SeasonPage from "containers/SeasonPage";
import { GetStaticPaths, GetStaticProps } from "next";
import { getCsvData, getCsvPlayoffs } from "util/getCsvData";
import { convertSeasonToSlug } from "util/convertToSlug";
import { PlayerSeason } from "types/season";
import { Match } from "types/match";
import { constants } from "util/constants";

type Props = {
  playoffRecords: Match[];
  seasonRecords: PlayerSeason[];
};

const Route = ({ playoffRecords, seasonRecords }: Props) => {
  return <SeasonPage playoffs={playoffRecords} records={seasonRecords} />;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const seasonName = (params || {}).season;
  const data = await getCsvData(constants.dataLocation.seasons());
  const playoffs = await getCsvPlayoffs(constants.dataLocation.playoffs());

  const seasonRecords = data.filter((row) => convertSeasonToSlug(row.season) === seasonName);
  const playoffRecords = playoffs.filter((row) => convertSeasonToSlug(row.season) === seasonName);

  return {
    props: {
      playoffRecords,
      seasonRecords,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getCsvData(constants.dataLocation.seasons());
  const seasons = data.reduce((mem, season) => {
    if (season.season) {
      mem.add(season.season);
    }
    return mem;
  }, new Set<string>());

  const names = [...seasons].map(convertSeasonToSlug);

  return {
    fallback: false,
    paths: names.map((season) => ({
      params: {
        season,
      },
    })),
  };
};

export default Route;
