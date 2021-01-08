export const convertNameToSlug = (name: string): string =>
  name.toLowerCase().replace(/\./g, "").replace(/'/g, "").split(" ").join("-");

export const convertSeasonToSlug = (season?: string): string =>
  season ? season.toLowerCase().split(" ").join("-") : "";
