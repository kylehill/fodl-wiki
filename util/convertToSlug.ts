export const convertNameToSlug = (name: string): string =>
  name.toLowerCase().replace(".", "").split(" ").join("-");

export const convertSeasonToSlug = (season?: string): string =>
  season ? season.toLowerCase().split(" ").join("-") : "";
