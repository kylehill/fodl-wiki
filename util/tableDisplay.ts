import { PlayoffResult, PlayoffTransition } from "types/season";

export const ordinalRank = (rank?: number): string => {
  if (!rank) {
    return "-";
  }
  if (rank > 3 && rank < 20) {
    return `${rank}th`;
  }

  switch (rank % 10) {
    case 1:
      return `${rank}st`;

    case 2:
      return `${rank}nd`;

    case 3:
      return `${rank}rd`;

    default:
      return `${rank}th`;
  }
};

export const formatDivisionName = (subdivision?: string): string => {
  return subdivision !== "Rookie" ? `FODL ${subdivision}` : "Rookie";
};

export const showResultIcon = (result?: PlayoffResult): string => {
  if (!result) {
    return "";
  }

  if (result.bracket === "Championship" && result.finish === "W") {
    return "★";
  }

  switch (result.transition) {
    case PlayoffTransition.Promoted:
      return "⬆";

    case PlayoffTransition.Relegated:
      return "⬇";

    default:
      return "";
  }
};

export const fullPlayoffRoundName = (round: string): string => {
  switch (round) {
    case "F":
      return `Final`;

    case "WBF":
      return "Winners Bracket Final";

    case "SF":
      return `Semifinals`;

    case "QF":
      return `Quarterfinals`;

    case "3R":
      return `Third Round`;

    case "2R":
      return `Second Round`;

    case "1R":
      return `First Round`;
  }

  return "";
};
