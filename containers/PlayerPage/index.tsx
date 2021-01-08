import React from "react";
import { GraphStats, PlayerSeason } from "types/season";
import { calculateRecord, combinePlayerSeasons } from "util/recordMath";

import PlayerStats from "components/PlayerStats";
import PlayerAccentGraph from "components/PlayerAccentGraph";

import styles from "./index.module.css";
import HexagonImage from "components/HexagonImage";
import PlayerDemographics from "components/PlayerDemographics";
import Logo from "components/Logo";
import { Player } from "types/player";
import { ordinalRank } from "util/tableDisplay";
import { convertNameToSlug } from "util/convertToSlug";

type Props = {
  aggregated: GraphStats[];
  records: PlayerSeason[];
  player?: Player;
};

const PlayerPage = ({ aggregated, records, player }: Props) => {
  const aggregate = calculateRecord(combinePlayerSeasons(records));
  const stars = records.reduce((mem, record) => {
    if (!record.result) {
      return mem;
    }

    if (record.result?.bracket === "Championship" && record.result?.finish === "W") {
      return mem + 1;
    }

    return mem;
  }, 0);

  const bestFinish = [...records].sort((a, b) => {
    if (a.division !== b.division) {
      if ((a.division as string) > (b.division as string)) {
        return 1;
      }

      return -1;
    }

    return (a.rank as number) > (b.rank as number) ? 1 : -1;
  })[0];

  return (
    <div>
      <div className={styles.columnLeft}>
        <HexagonImage url={`/player_images/${convertNameToSlug(records[0].player)}.png`} />
        <PlayerDemographics
          name={records[0].player}
          stars={stars}
          darts={player?.darts}
          location={player?.location}
          twitter={player?.twitter}
          hashtag={player?.hashtag}
          finish={`${ordinalRank(bestFinish.rank)} Place, FODL ${bestFinish.division}`}
        />
        <div className={styles.logo}>
          <Logo size={120} />
        </div>
      </div>
      <div className={styles.columnRight}>
        <p className={styles.bio}>{player?.bio}</p>
        <div className={styles.text}>Stats Progression</div>
        <PlayerAccentGraph aggregated={aggregated} records={records} />
        <div className={styles.text}>History</div>
        <PlayerStats aggregate={aggregate} records={records} />
      </div>
    </div>
  );
};

export default PlayerPage;
