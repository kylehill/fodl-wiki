import StatsFilter from "components/StatsFilter";
import StatsTable from "components/StatsTable";
import React from "react";
import { PlayerSeason } from "types/season";
import { StatsPageActionName, StatsPageSortColumn } from "types/stats_page";
import { initializer, reducer } from "./reducer";

import styles from "./index.module.css";

type Props = {
  records: PlayerSeason[];
};

const StatsPage = ({ records }: Props) => {
  const seasons = [
    ...records.reduce((mem, record) => {
      mem.add(record.season as string);
      return mem;
    }, new Set<string>()),
  ];

  const divisions = ["A", "B", "C", "D"];

  const [state, dispatch] = React.useReducer(
    reducer,
    { divisions, seasons, raw: records },
    initializer
  );

  const handleViewChange = (view: string) => {
    dispatch({ type: StatsPageActionName.ChangeView, view });
  };

  const handleOptionClick = (filter: string, value: string) => {
    dispatch({ type: StatsPageActionName.ToggleFilterSelection, filter, value });
  };

  const handleFilterExpand = (filter: string) => {
    dispatch({ type: StatsPageActionName.ExpandFilter, filter });
  };

  const handleColumnHeaderClick = (column: StatsPageSortColumn) => {
    dispatch({ type: StatsPageActionName.ChangeSort, column });
  };

  const handleClear = (filter: string) => {
    dispatch({ type: StatsPageActionName.ClearFilter, filter });
  };

  const handleSelectAll = (filter: string) => {
    dispatch({ type: StatsPageActionName.SelectAllFilter, filter });
  };

  return (
    <div>
      <div className={styles.buttons}>
        {state.views.map((view, idx) => {
          return (
            <button
              className={`${styles.button} ${view.active ? styles.active : ""}`}
              key={idx}
              onClick={() => handleViewChange(view.title)}
            >
              {view.title}
            </button>
          );
        })}
      </div>

      {state.filters.map((filter, idx) => {
        return (
          <div className={styles.filterContainer} key={idx}>
            <StatsFilter
              options={filter.options}
              selected={filter.selected}
              title={filter.title}
              expanded={filter.expanded}
              onOptionClick={handleOptionClick}
              onFilterExpand={handleFilterExpand}
              onClearClick={handleClear}
              onSelectAllClick={handleSelectAll}
            />
          </div>
        );
      })}

      <div className={styles.tableContainer}>
        <StatsTable
          records={state.normalized}
          sortColumn={state.sortColumn}
          sortDirection={state.sortDirection}
          view={state.views.find((view) => view.active) || state.views[0]}
          onColumnHeaderClick={handleColumnHeaderClick}
        />
      </div>
    </div>
  );
};

export default StatsPage;
