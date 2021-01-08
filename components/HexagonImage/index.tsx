import React from "react";

import styles from "./index.module.css";

type Props = {
  url?: string;
};

const HexagonImage = ({ url }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.hexagon}>
        {url && <div className={styles.picture} style={{ backgroundImage: `url(${url})` }}></div>}
      </div>
    </div>
  );
};

export default HexagonImage;
