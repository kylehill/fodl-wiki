import Link from "next/link";
import React from "react";
import { PlayerSeason } from "types/season";
import { convertNameToSlug } from "util/convertToSlug";
import { combinePlayerSeasons, calculateRecord } from "util/recordMath";

import styles from "./index.module.css";

type Props = {
  records: PlayerSeason[];
};

type TitlesProps = {
  champion?: string;
  divisions: Record<string, string>;
};

type LeaguewideProps = {
  aggregate: PlayerSeason;
};

type SlideProps = {
  slides: Slide[];
};

type Slide = {
  title: string;
  records: {
    player: string;
    value: string;
  }[];
};

const SeasonStatsTitles = ({ champion, divisions }: TitlesProps) => {
  return (
    <div className={styles.champions}>
      {champion ? (
        <div>
          <div className={styles.champTitle}>Champion</div>
          <span className={styles.champ}>
            <Link href={`/player/${convertNameToSlug(champion)}`}>{champion}</Link>
          </span>
        </div>
      ) : (
        ""
      )}
      {Object.entries(divisions).map(([title, winner], idx) => {
        return (
          <div key={idx}>
            <div className={styles.divTitle}>{title}</div>
            <Link href={`/player/${convertNameToSlug(winner)}`}>{winner}</Link>
          </div>
        );
      })}
    </div>
  );
};

const LeaguewideStats = ({ aggregate }: LeaguewideProps) => {
  return (
    <table className={styles.leaguewide}>
      <thead>
        <tr>
          <th colSpan={2}>Leaguewide Stats</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Marks Per Round</td>
          <td>{aggregate.cricket?.mpr?.toFixed(2)}</td>
        </tr>
        <tr>
          <td>3 Dart Average</td>
          <td>{aggregate.x01?.average?.toFixed(2)}</td>
        </tr>
        <tr>
          <td>Checkout Rate</td>
          <td>{`${((aggregate.x01?.checkoutRate || 0) * 100).toFixed(2)}%`}</td>
        </tr>
        <tr>
          <td>9M + 180s</td>
          <td>{(aggregate.x01?.t80 || 0) + (aggregate.cricket?.m9 || 0)}</td>
        </tr>
      </tbody>
    </table>
  );
};

const TopFives = ({ slides }: SlideProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(1);

  return (
    <div className={styles.leaders}>
      <div>
        {slides.map((slide, idx) => {
          return (
            <button
              className={currentSlide === idx ? styles.active : ""}
              key={idx}
              onClick={() => setCurrentSlide(idx)}
            >
              {slide.title}
            </button>
          );
        })}
      </div>
      <table>
        <tbody>
          {slides[currentSlide].records.map((record, idx) => {
            return (
              <tr key={idx}>
                <td>
                  <Link href={`/player/${convertNameToSlug(record.player)}`}>{record.player}</Link>
                </td>
                <td>{record.value}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const SeasonStats = ({ records }: Props) => {
  const champion = records.find(
    (record) => record.result?.bracket === "Championship" && record.result.finish === "W"
  );
  const divisions = records.reduce((mem, record) => {
    if (record.rank === 1) {
      return {
        ...mem,
        [`FODL ${record.subdivision}`]: record.player,
      };
    }

    return mem;
  }, {} as Record<string, string>);

  const calcRecords = records.map(calculateRecord);

  const slides: Slide[] = [
    {
      title: "MPR",
      records: calcRecords
        .sort((a, b) => (b.cricket?.mpr || 0) - (a.cricket?.mpr || 0))
        .slice(0, 5)
        .map((record) => ({
          player: record.player,
          value: (record.cricket?.mpr || 0).toFixed(2),
        })),
    },
    {
      title: "3DA",
      records: calcRecords
        .sort((a, b) => (b.x01?.average || 0) - (a.x01?.average || 0))
        .slice(0, 5)
        .map((record) => ({
          player: record.player,
          value: (record.x01?.average || 0).toFixed(2),
        })),
    },
    {
      title: "CO%",
      records: calcRecords
        .sort((a, b) => (b.x01?.checkoutRate || 0) - (a.x01?.checkoutRate || 0))
        .slice(0, 5)
        .map((record) => ({
          player: record.player,
          value: ((record.x01?.checkoutRate || 0) * 100).toFixed(2) + "%",
        })),
    },
    {
      title: "Max",
      records: calcRecords
        .sort(
          (a, b) =>
            (b.x01?.t80 || 0) + (b.cricket?.m9 || 0) - ((a.x01?.t80 || 0) + (a.cricket?.m9 || 0))
        )
        .slice(0, 5)
        .map((record) => ({
          player: record.player,
          value: ((record.x01?.t80 || 0) + (record.cricket?.m9 || 0)).toString(),
        })),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.c3}>
        <SeasonStatsTitles champion={champion && champion.player} divisions={divisions} />
      </div>
      <div className={styles.c3}>
        <LeaguewideStats aggregate={calculateRecord(combinePlayerSeasons(records))} />
      </div>
      <div className={styles.c3}>
        <TopFives slides={slides} />
      </div>
    </div>
  );
};

export default SeasonStats;
