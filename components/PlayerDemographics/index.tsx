import React from "react";

import styles from "./index.module.css";

type Props = {
  name: string;
  stars: number;
  location?: string;
  darts?: string;
  hashtag?: string;
  twitter?: string;
  finish: string;
};

const PlayerDemographics = ({ name, stars, location, darts, hashtag, twitter, finish }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.player}>{name}</div>
      <div className={styles.stars}>{"★".repeat(stars)}</div>
      {location && (
        <>
          <div className={styles.field}>{location}</div>
          <div className={styles.fieldTitle}>Location</div>
        </>
      )}
      {darts && (
        <>
          <div className={styles.field}>{darts}</div>
          <div className={styles.fieldTitle}>Darts</div>
        </>
      )}
      <div className={styles.field}>{finish}</div>
      <div className={styles.fieldTitle}>Best Finish</div>
      {hashtag && <div className={styles.hashtag}>{hashtag}</div>}
      {twitter && (
        <div className={styles.twitter}>
          <a href={`https://twitter.com/${twitter}`} target="_blank">
            <img src="/twitter.png" />@{twitter}
          </a>
        </div>
      )}
    </div>
  );
};

export default PlayerDemographics;
