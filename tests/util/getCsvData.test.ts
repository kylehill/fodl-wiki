import { mocks } from "util/constants";
import { getCsvData, getCsvPlayers, getCsvPlayoffs } from "util/getCsvData";

describe("getCsvData", () => {
  it("should import correctly", async (done) => {
    const data = await getCsvData(mocks.dataLocation.seasons());

    const seasons = data.reduce((mem, record) => {
      if (record.season) {
        mem.add(record.season);
        return mem;
      }

      // Rows without full data should have been stripped out
      done.fail();
      return mem;
    }, new Set<string>());

    expect([...seasons]).toEqual(["Spring 2018", "Summer 2018"]);
    expect(data).toHaveLength(29);
    done();
  });
});

describe("getCsvPlayers", () => {
  it("should import correctly", async (done) => {
    const data = await getCsvPlayers(mocks.dataLocation.players());

    expect(data).toHaveLength(14);
    expect(data[0]).toEqual({
      bio:
        "Created by Long Island and a spelling mistake on the SAT, The Kylf has taken his scarf collection and mid-40s average on a grand tour from the depths of FODL C all the way up to the heights of FODL C. He looks forward to midtable obscurity again next season.",
      darts: "25g Bottlesen Hammer Head",
      hashtag: "#GoodJobKylf",
      location: "Washington, DC",
      name: "The Kylf",
      twitter: "kylehill",
      url: "the-kylf.png",
    });
    done();
  });
});

describe("getCsvPlayoffs", () => {
  it("should import correctly", async (done) => {
    const data = await getCsvPlayoffs(mocks.dataLocation.playoffs());

    const seasons = data.reduce((mem, record) => {
      mem.add(record.season);
      return mem;
    }, new Set<string>());

    expect([...seasons]).toEqual(["Spring 2018", "Summer 2018"]);
    expect(data).toHaveLength(17);
    done();
  });
});
