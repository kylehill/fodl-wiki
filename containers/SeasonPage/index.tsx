import BracketDisplay from "components/BracketDisplay";
import SeasonStats from "components/SeasonStats";
import SeasonTable from "components/SeasonTable";
import TableLegend from "components/TableLegend";
import React from "react";
import { Match } from "types/match";
import { PlayerSeason } from "types/season";

import styles from "./index.module.css";

type Props = {
  playoffs: Match[];
  records: PlayerSeason[];
};

const SeasonPage = ({ playoffs, records }: Props) => {
  const divisions = records.reduce((mem, season) => {
    if (!season.subdivision || season.subdivision === "Rookie") {
      return mem;
    }

    const subdivision = season.subdivision;
    return {
      ...mem,
      [subdivision]: (mem[subdivision] || []).concat(season),
    };
  }, {} as Record<string, PlayerSeason[]>);

  const brackets = playoffs.reduce((mem, match) => {
    return {
      ...mem,
      [match.title]: (mem[match.title] || []).concat(match),
    };
  }, {} as Record<string, Match[]>);

  return (
    <div>
      <SeasonStats records={records} />
      <div>
        <div className={styles.column}>
          {Object.keys(divisions)
            .sort()
            .map((key, idx) => {
              return (
                <div className={styles["table-container"]} key={idx}>
                  <SeasonTable title={`FODL ${key}`} records={divisions[key]} />
                </div>
              );
            })}

          <div className={styles.legend}>
            <TableLegend />
          </div>
        </div>
        <div className={styles.column}>
          {Object.keys(brackets).map((key, idx) => {
            return (
              <div className={styles.bracketContainer} key={idx}>
                <BracketDisplay title={key} matches={brackets[key]} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SeasonPage;
