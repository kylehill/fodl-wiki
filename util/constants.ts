export const constants = {
  dataLocation: {
    seasons: () => `${process.cwd()}/data/data.csv`,
    playoffs: () => `${process.cwd()}/data/playoffs.csv`,
    players: () => `${process.cwd()}/data/players.csv`,
  },
};

export const mocks = {
  dataLocation: {
    seasons: () => `${process.cwd()}/data/mock/data.csv`,
    playoffs: () => `${process.cwd()}/data/mock/playoffs.csv`,
    players: () => `${process.cwd()}/data/mock/players.csv`,
  },
};
