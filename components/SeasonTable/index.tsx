import React from "react";
import Link from "next/link";
import { PlayerSeason, PlayoffColor, PlayoffResult } from "types/season";
import { showResultIcon } from "util/tableDisplay";

import styles from "./index.module.css";
import { convertNameToSlug } from "util/convertToSlug";

type Props = {
  title: string;
  records: PlayerSeason[];
};

const outcomeColor = (result?: PlayoffResult): string => {
  if (!result || !result.color) {
    return "";
  }

  switch (result.color) {
    case PlayoffColor.Championship:
      return styles.outcomeBlue;
    case PlayoffColor.AutoPromoted:
      return styles.outcomeGreen;
    case PlayoffColor.AutoRelegated:
      return styles.outcomeRed;
    case PlayoffColor.PromotionPlayoff:
      return styles.outcomeLGreen;
    case PlayoffColor.RelegationPlayoff:
      return styles.outcomeLRed;
    default:
      return "";
  }
};

const SeasonTable = ({ title, records }: Props) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th colSpan={2}>{title}</th>
            <th>LW</th>
            <th>BP</th>
            <th>Points</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, idx) => {
            const legsWon = (record.regular?.x01.W || 0) + (record.regular?.cricket.W || 0);

            return (
              <tr key={idx} className={`${outcomeColor(record.result)}`}>
                <td>{record.rank}</td>
                <td className={styles.player}>
                  <Link href={`/player/${convertNameToSlug(record.player)}`}>{record.player}</Link>
                </td>
                <td>{legsWon}</td>
                <td>{record.regular?.bonus}</td>
                <td className={styles.points}>{legsWon * 2 + (record.regular?.bonus || 0)}</td>
                <td>{showResultIcon(record.result)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SeasonTable;
