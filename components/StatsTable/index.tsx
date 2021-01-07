import React from "react";
import {
  StatsPageColumnDefinition,
  StatsPageNormalizedPlayerSeason,
  StatsPageSortColumn,
  StatsPageSortDirection,
  StatsPageView,
} from "types/stats_page";

import styles from "./index.module.css";

type Props = {
  records: StatsPageNormalizedPlayerSeason[];
  sortDirection: StatsPageSortDirection;
  sortColumn: StatsPageSortColumn;
  view: StatsPageView;
  onColumnHeaderClick: (column: StatsPageSortColumn) => void;
};

const StatsTable = ({ records, sortColumn, sortDirection, view, onColumnHeaderClick }: Props) => {
  const sorted = [...records].sort((a, b) => {
    if (a[sortColumn] === b[sortColumn]) {
      return 0;
    }

    if (sortDirection === StatsPageSortDirection.Descending) {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }

    return a[sortColumn] > b[sortColumn] ? 1 : -1;
  });

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th></th>
          {view.sections.map((section, idx) => {
            return (
              <th key={idx} colSpan={section.columns.length} className={`${styles.sectionRight}`}>
                {section.title}
              </th>
            );
          })}
        </tr>
        <tr>
          <th>Rank</th>
          {view.sections.map((section, idx) => {
            return (
              <React.Fragment key={idx}>
                {section.columns.map((column, idx, cols) => {
                  let classNames = idx === cols.length - 1 ? styles.sectionRight : "";
                  if (column === sortColumn) {
                    classNames = `${classNames} ${styles.active}`;
                  }
                  return (
                    <th
                      key={idx}
                      onClick={() => onColumnHeaderClick(column)}
                      className={classNames}
                    >
                      {(view.columns[column] as StatsPageColumnDefinition).title}
                    </th>
                  );
                })}
              </React.Fragment>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sorted.map((record, idx) => {
          return (
            <tr key={idx}>
              <td>{idx + 1}</td>
              {view.sections.map((section, idx) => {
                return (
                  <React.Fragment key={idx}>
                    {section.columns.map((column, idx, cols) => {
                      let classNames = idx === cols.length - 1 ? styles.sectionRight : "";
                      if (column === sortColumn) {
                        classNames = `${classNames} ${styles.active}`;
                      }

                      const def = view.columns[column] as StatsPageColumnDefinition;

                      return def.format ? (
                        <td className={classNames} key={idx}>
                          {def.format(record[column] as number)}
                        </td>
                      ) : def.link ? (
                        <td className={classNames} key={idx}>
                          {def.link(record[column] as string)}
                        </td>
                      ) : (
                        <td className={classNames} key={idx}>
                          {record[column]}
                        </td>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StatsTable;
