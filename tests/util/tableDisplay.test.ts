import { PlayoffColor, PlayoffTransition } from "types/season";
import {
  formatDivisionName,
  fullPlayoffRoundName,
  ordinalRank,
  showResultIcon,
} from "util/tableDisplay";

describe("formatDivisionName", () => {
  it("formats correctly", () => {
    expect(formatDivisionName("A")).toEqual("FODL A");
    expect(formatDivisionName("Rookie")).toEqual("Rookie");
  });

  it("fails gracefully", () => {
    expect(formatDivisionName()).toEqual("-");
  });
});

describe("fullPlayoffRoundName", () => {
  it("returns round names", () => {
    expect(fullPlayoffRoundName("WBF")).toEqual("Winners Bracket Final");
    expect(fullPlayoffRoundName("F")).toEqual("Final");
    expect(fullPlayoffRoundName("SF")).toEqual("Semifinals");
    expect(fullPlayoffRoundName("QF")).toEqual("Quarterfinals");
    expect(fullPlayoffRoundName("3R")).toEqual("Third Round");
    expect(fullPlayoffRoundName("2R")).toEqual("Second Round");
    expect(fullPlayoffRoundName("1R")).toEqual("First Round");
  });

  it("fails gracefully", () => {
    expect(fullPlayoffRoundName("0R")).toEqual("");
  });
});

describe("ordinalRank", () => {
  it("formats correctly", () => {
    expect(ordinalRank(1)).toEqual("1st");
    expect(ordinalRank(2)).toEqual("2nd");
    expect(ordinalRank(3)).toEqual("3rd");
    expect(ordinalRank(4)).toEqual("4th");
    expect(ordinalRank(12)).toEqual("12th");
    expect(ordinalRank(21)).toEqual("21st");
    expect(ordinalRank(87)).toEqual("87th");
  });

  it("fails gracefully", () => {
    expect(ordinalRank()).toEqual("-");
  });
});

describe("showResultIcon", () => {
  it("works correctly for champions", () => {
    expect(
      showResultIcon({
        bracket: "Championship",
        finish: "W",
        color: PlayoffColor.Championship,
        result: "",
        transition: PlayoffTransition.NoChange,
      })
    ).toEqual("★");

    expect(
      showResultIcon({
        bracket: "Championship",
        finish: "SF",
        color: PlayoffColor.Championship,
        result: "",
        transition: PlayoffTransition.NoChange,
      })
    ).toEqual("");

    expect(
      showResultIcon({
        bracket: "A/B Playoffs",
        finish: "W",
        color: PlayoffColor.PromotionPlayoff,
        result: "",
        transition: PlayoffTransition.NoChange,
      })
    ).toEqual("");
  });

  it("works correctly for Pro/Rel", () => {
    expect(
      showResultIcon({
        bracket: "A/B Playoffs",
        finish: "W",
        color: PlayoffColor.PromotionPlayoff,
        result: "",
        transition: PlayoffTransition.Promoted,
      })
    ).toEqual("⬆");

    expect(
      showResultIcon({
        bracket: "A/B Playoffs",
        finish: "F",
        color: PlayoffColor.RelegationPlayoff,
        result: "",
        transition: PlayoffTransition.Relegated,
      })
    ).toEqual("⬇");

    expect(
      showResultIcon({
        bracket: "A/B Playoffs",
        finish: "F",
        color: PlayoffColor.PromotionPlayoff,
        result: "",
        transition: PlayoffTransition.NoChange,
      })
    ).toEqual("");

    expect(
      showResultIcon({
        bracket: "",
        finish: "",
        color: PlayoffColor.AutoPromoted,
        result: "",
        transition: PlayoffTransition.Promoted,
      })
    ).toEqual("⬆");
  });

  it("fails gracefully", () => {
    expect(showResultIcon()).toEqual("");
  });
});
