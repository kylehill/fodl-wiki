import { PlayerSeason } from "types/season";
import { mocks } from "util/constants";
import { getCsvData } from "util/getCsvData";
import {
  addPlayerSeasons,
  calculateRecord,
  combinePlayerSeasons,
  combineRecords,
  displayRecord,
} from "util/recordMath";

describe("addPlayerSeasons", () => {
  it("adds mock data", async (done) => {
    const records = await getCsvData(mocks.dataLocation.seasons());
    const testData = records.filter((record) => record.player === "The Surgeon");
    expect(testData).toHaveLength(2);

    const added = addPlayerSeasons(testData[0], testData[1]);
    expect(added.player).toEqual("The Surgeon");
    expect(added.cricket?.marks).toEqual(1222);
    expect(added.x01?.chances).toEqual(360);

    done();
  });
});

describe("calculateRecord", () => {
  it("calculates the record", () => {
    const record: PlayerSeason = {
      player: "Test Data",
      cricket: {
        darts: 100,
        hits: 60,
        marks: 80,
        m9: 0,
        tb: 10,
      },
      x01: {
        darts: 100,
        points: 1501,
        chances: 12,
        doubles: 3,
        highOut: 60,
        t80: 1,
      },
    };

    const calculated = calculateRecord(record);
    expect(calculated.cricket?.hitRate).toEqual(0.6);
    expect(calculated.x01?.checkoutRate).toEqual(0.25);
  });

  it("fails gracefully for missing data", () => {
    expect(calculateRecord({ player: "Test Data" })).toEqual({ player: "Test Data" });
    expect(
      calculateRecord({
        player: "Test Data",
        cricket: {
          darts: 100,
          hits: 60,
          marks: 80,
          m9: 0,
          tb: 10,
        },
      }).cricket?.hitRate
    ).toEqual(0.6);
    expect(
      calculateRecord({
        player: "Test Data",
        x01: {
          darts: 100,
          points: 1501,
          chances: 12,
          doubles: 3,
          highOut: 60,
          t80: 1,
        },
      }).x01?.checkoutRate
    ).toEqual(0.25);
  });
});

describe("combinePlayerSeasons", () => {
  it("adds mock data", async (done) => {
    const records = await getCsvData(mocks.dataLocation.seasons());
    const testData = records.filter((record) => record.season === "Spring 2018");
    expect(testData).toHaveLength(12);

    const added = combinePlayerSeasons(testData);
    expect(added.regular?.match).toEqual({ W: 66, L: 66, D: 0 });
    expect(added.regular?.cricket).toEqual({ W: 132, L: 132, D: 0 });

    done();
  });

  it("adds partial data", async (done) => {
    const records = await getCsvData(mocks.dataLocation.seasons());
    const testData = records.filter((record) => record.season === "Summer 2018");
    expect(testData).toHaveLength(17);

    const added = combinePlayerSeasons(testData);
    expect(added.cricket?.m9).toEqual(1);

    done();
  });
});

describe("combineRecords", () => {
  it("should format correctly", () => {
    expect(combineRecords([{ W: 5, L: 2, D: 0 }])).toEqual("5-2");
    expect(
      combineRecords([
        { W: 4, L: 7, D: 3 },
        { W: 2, L: 1, D: 0 },
      ])
    ).toEqual("6-8-3");
    expect(
      combineRecords([{ W: 4, L: 7, D: 3 }, { W: 2, L: 1, D: 0 }, undefined, { W: 10, L: 6, D: 1 }])
    ).toEqual("16-14-4");
  });

  it("should fail gracefully", () => {
    expect(combineRecords([])).toEqual("-");
  });
});

describe("displayRecord", () => {
  it("should format correctly", () => {
    expect(displayRecord({ W: 5, L: 2, D: 0 })).toEqual("5-2");
    expect(displayRecord({ W: 4, L: 7, D: 3 })).toEqual("4-7-3");
    expect(displayRecord({ W: 4, L: 7, D: 3 }, { W: 2, L: 1, D: 0 })).toEqual("6-8-3");
  });

  it("should fail gracefully", () => {
    expect(displayRecord()).toEqual("-");
  });
});
