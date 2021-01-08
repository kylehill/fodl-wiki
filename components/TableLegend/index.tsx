import React from "react";

import styles from "./index.module.css";

const TableLegend = () => {
  return (
    <legend>
      <div className={styles.outcome}>
        <span className={styles.outcomeYellow} />
        <div>FODL Championship</div>
      </div>
      <div className={styles.outcome}>
        <span className={styles.outcomeGreen} />
        <div>Automatic Promotion</div>
      </div>
      <div className={styles.outcome}>
        <span className={styles.outcomeBlue} />
        <div>Promotion Playoff</div>
      </div>
      <div className={styles.outcome}>
        <span />
        <div>NFG</div>
      </div>
      <div className={styles.outcome}>
        <span className={styles.outcomeLRed} />
        <div>Relegation Playoff</div>
      </div>
      <div className={styles.outcome}>
        <span className={styles.outcomeRed} />
        <div>Automatic Relegation</div>
      </div>
    </legend>
  );
};

export default TableLegend;
