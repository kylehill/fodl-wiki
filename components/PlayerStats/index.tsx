import Link from "next/link";
import React from "react";
import { PlayerSeason } from "types/season";
import { convertSeasonToSlug } from "util/convertToSlug";
import { displayRecord, combineRecords, calculateRecord } from "util/recordMath";
import { formatDivisionName, ordinalRank, showResultIcon } from "util/tableDisplay";

import styles from "./index.module.css";

type Props = {
  aggregate: PlayerSeason;
  records: PlayerSeason[];
};

const StatsRow = (season: PlayerSeason, isFooter = false): React.ReactNode => {
  const cell = (content: string | number, extraClass?: string) =>
    isFooter ? (
      <th className={`${styles.footerCell} ${styles[extraClass || ""]}`}>{content}</th>
    ) : (
      <td className={`${styles.cell} ${styles[extraClass || ""]}`}>{content}</td>
    );
  const calculated = calculateRecord(season);

  return (
    <>
      {cell(displayRecord(calculated.regular?.match, calculated.playoff?.match))}
      {cell(
        combineRecords([
          calculated.regular?.cricket,
          calculated.regular?.x01,
          calculated.playoff?.cricket,
          calculated.playoff?.x01,
        ])
      )}
      {cell(calculated.regular?.bonus || "-", "small")}
      {cell(calculated.cricket?.mpr?.toFixed(2) || "-")}
      {cell(calculated.x01?.average?.toFixed(2) || "-")}
      {cell(calculated.cricket?.m9 || "-", "small")}
      {cell(calculated.x01?.t80 || "-", "small")}
      {cell(showResultIcon(calculated.result), showResultIcon(calculated.result) || "last")}
    </>
  );
};

const PlayerStats = ({ aggregate, records }: Props) => {
  return (
    <>
      <table className={styles.stats}>
        <thead>
          <tr className={styles.header}>
            <th>Season</th>
            <th>Division</th>
            <th>Rank</th>
            <th>Matches</th>
            <th>Legs</th>
            <th>BP</th>
            <th>MPR</th>
            <th>3DA</th>
            <th>9M</th>
            <th>180s</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {records.map((season, idx) => {
            return (
              <tr key={idx}>
                <td className={styles.cell}>
                  <Link href={`/season/${convertSeasonToSlug(season.season)}`}>
                    {season.season}
                  </Link>
                </td>
                <td className={styles.cell}>{formatDivisionName(season.subdivision)}</td>
                <td className={`${styles.cell} ${styles.rank}`}>{ordinalRank(season.rank)}</td>
                {StatsRow(season)}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className={styles.footer}>
            <th className={styles.footerCell} colSpan={3}></th>
            {StatsRow(aggregate, true)}
          </tr>
          <tr>
            <td colSpan={11}>
              <div className={styles.moreStats}>
                <Link href={`/stats`}>More Stats »</Link>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default PlayerStats;
