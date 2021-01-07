import Link from "next/link";
import React from "react";
import { Match } from "types/match";
import { convertNameToSlug } from "util/convertToSlug";
import { fullPlayoffRoundName } from "util/tableDisplay";

import styles from "./index.module.css";

type Props = {
  title: string;
  matches: Match[];
};

const BracketRoundDisplay = ({ title, matches }: Props) => {
  return (
    <div className={styles.roundContainer}>
      <div className={styles.round}>{title}</div>
      {matches.map((match, idx) => {
        if (match.players === null) {
          return (
            <div className={styles.match} key={idx}>
              <span className={styles.player}></span>
              <span className={styles.score}></span>
              <span className={styles.player}></span>
            </div>
          );
        }

        let score = "";
        if (match.score !== null) {
          score = `${match.score[0]} - ${match.score[1]}`;
        }

        return (
          <div className={styles.match} key={idx}>
            <span className={styles.player}>
              <Link href={`/player/${convertNameToSlug(match.players[0])}`}>
                {match.players[0]}
              </Link>
            </span>
            <span className={styles.score}>{score}</span>
            <span className={styles.player}>
              <Link href={`/player/${convertNameToSlug(match.players[1])}`}>
                {match.players[1]}
              </Link>
            </span>
          </div>
        );
      })}
    </div>
  );
};

const BracketDisplay = ({ title, matches }: Props) => {
  const rounds = matches.reduce((mem, match) => {
    return {
      ...mem,
      [match.round]: (mem[match.round] || []).concat(match),
    };
  }, {} as Record<string, Match[]>);

  return (
    <div>
      <div className={styles.bracket}>{title}</div>
      {Object.keys(rounds).map((round, idx) => {
        return (
          <BracketRoundDisplay
            title={fullPlayoffRoundName(round)}
            key={idx}
            matches={rounds[round]}
          />
        );
      })}
    </div>
  );
};

export default BracketDisplay;
