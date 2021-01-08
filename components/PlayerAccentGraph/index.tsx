import React from "react";
import { GraphStats, PlayerSeason } from "types/season";
import { calculateRecord } from "util/recordMath";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

type Props = {
  records: PlayerSeason[];
  aggregated: GraphStats[];
};

const PlayerAccentGraph = ({ records, aggregated }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState(0);
  React.useEffect(() => {
    if (ref.current) {
      setContainerWidth(ref.current.offsetWidth);
    }
  }, [ref.current]);

  const chartData = aggregated.map((season) => {
    const playerSeason = records.find((record) => season.season === record.season);
    const baseline = {
      season: season.season,
      "Lg MPR": season.mpr.toFixed(2),
      "Lg 3DA": season.average.toFixed(2),
      "Lg CO%": (season.checkoutRate * 100).toFixed(2),
    };

    if (playerSeason) {
      const calculated = calculateRecord(playerSeason);
      return {
        ...baseline,
        MPR: calculated.cricket?.mpr?.toFixed(2),
        "3DA": calculated.x01?.average?.toFixed(2),
        "CO%": calculated.x01?.checkoutRate
          ? (calculated.x01?.checkoutRate * 100).toFixed(2)
          : undefined,
      };
    }

    return baseline;
  });

  return (
    <div ref={ref}>
      <LineChart
        width={containerWidth}
        height={250}
        data={chartData}
        margin={{ top: 20, bottom: 20, left: 30, right: 30 }}
      >
        <YAxis
          yAxisId="left"
          domain={[(min) => min * 0.8, (max) => max * 1.2]}
          tick={false}
          width={1}
          axisLine={false}
        />
        <YAxis
          yAxisId="right"
          domain={[(min) => min * 0.8, (max) => max * 1.2]}
          tick={false}
          axisLine={false}
          width={0}
        />
        <YAxis
          yAxisId="hidden"
          domain={[(min) => min * 0.8, (max) => max * 1.2]}
          tick={false}
          axisLine={false}
          width={0}
        />
        <XAxis tickLine={false} dataKey="season" tick={false} axisLine={false} />
        <Tooltip contentStyle={{ fontSize: 12 }} itemStyle={{ margin: 0, padding: 0 }} />
        <Line yAxisId="left" type="monotone" dataKey="3DA" stroke="red" strokeWidth={2} />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="Lg 3DA"
          stroke="red"
          strokeWidth={1.5}
          strokeDasharray="3, 3"
          dot={false}
          activeDot={false}
        />
        <Line yAxisId="right" type="monotone" dataKey="MPR" stroke="blue" strokeWidth={2} />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="Lg MPR"
          stroke="blue"
          strokeWidth={1.5}
          strokeDasharray="3, 3"
          dot={false}
          activeDot={false}
        />
        <Line yAxisId="hidden" type="monotone" dataKey="CO%" stroke="green" strokeWidth={2} />
        <Line
          yAxisId="hidden"
          type="monotone"
          dataKey="Lg CO%"
          stroke="green"
          strokeWidth={1.5}
          strokeDasharray="3, 3"
          dot={false}
          activeDot={false}
        />
      </LineChart>
    </div>
  );
};

export default PlayerAccentGraph;
