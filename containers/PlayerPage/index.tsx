import React from "react";
import { GraphStats, PlayerSeason } from "types/season";
import { calculateRecord, combinePlayerSeasons } from "util/recordMath";

import PlayerStats from "components/PlayerStats";
import PlayerAccentGraph from "components/PlayerAccentGraph";

type Props = {
  aggregated: GraphStats[];
  records: PlayerSeason[];
};

const PlayerPage = ({ aggregated, records }: Props) => {
  const aggregate = calculateRecord(combinePlayerSeasons(records));

  return (
    <div>
      <PlayerAccentGraph aggregated={aggregated} records={records} />
      <PlayerStats aggregate={aggregate} records={records} />
    </div>
  );
};

export default PlayerPage;
