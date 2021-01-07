import React from "react";

import styles from "./index.module.css";

type Props = {
  title: string;
  options: string[];
  selected: Set<string>;
  expanded: boolean;
  onOptionClick: (title: string, option: string) => void;
  onFilterExpand: (title: string) => void;
  onSelectAllClick: (title: string) => void;
  onClearClick: (title: string) => void;
};

const StatsFilter = ({
  title,
  options,
  selected,
  expanded,
  onFilterExpand,
  onOptionClick,
  onSelectAllClick,
  onClearClick,
}: Props) => {
  return (
    <div className={styles.filter}>
      <div className={styles.header} onClick={() => onFilterExpand(title)}>
        {title}݀{" · "}
        {expanded ? (
          <span className={styles.links}>
            <span
              className={styles.link}
              onClick={(e) => {
                e.stopPropagation();
                onSelectAllClick(title);
              }}
            >
              Select All
            </span>
            {", "}
            <span
              className={styles.link}
              onClick={(e) => {
                e.stopPropagation();
                onClearClick(title);
              }}
            >
              Clear
            </span>
          </span>
        ) : (
          <span className={styles.count}>
            {selected.size}/{options.length} selected
          </span>
        )}
      </div>
      {expanded && (
        <div className={styles.container}>
          {options.map((option, idx) => {
            return (
              <div className={styles.option} key={idx}>
                <label>
                  <input
                    type="checkbox"
                    checked={selected.has(option)}
                    onChange={() => onOptionClick(title, option)}
                  />
                  {option}
                </label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StatsFilter;
