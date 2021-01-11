import React from "react";
import StatsPage from "containers/StatsPage";
import { GetStaticProps } from "next";
import { getCsvData } from "util/getCsvData";
import { PlayerSeason } from "types/season";
import { constants } from "util/constants";

type Props = {
  records: PlayerSeason[];
};

const Route = ({ records }: Props) => {
  return <StatsPage records={records} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const records = await getCsvData(constants.dataLocation.seasons());

  return {
    props: {
      records,
    },
  };
};

export default Route;
