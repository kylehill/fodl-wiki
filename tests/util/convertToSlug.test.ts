import { convertNameToSlug, convertSeasonToSlug } from "util/convertToSlug";

describe("convertNameToSlug", () => {
  it("correctly converts names", () => {
    expect(convertNameToSlug("Alky")).toEqual("alky");
    expect(convertNameToSlug("Bar-Boy")).toEqual("bar-boy");
    expect(convertNameToSlug("Mr. Packman")).toEqual("mr-packman");
    expect(convertNameToSlug("DJ My Q's")).toEqual("dj-my-qs");
  });
});

describe("convertSeasonToSlug", () => {
  it("correctly converts seasons", () => {
    expect(convertSeasonToSlug("Spring 2020")).toEqual("spring-2020");
    expect(convertSeasonToSlug()).toEqual("");
  });
});
