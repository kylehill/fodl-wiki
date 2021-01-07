import { StatsPageInitializerProps, StatsPageFilter } from "types/stats_page";

const filterDefinitions = ({
  divisions,
  seasons,
}: StatsPageInitializerProps): StatsPageFilter[] => {
  const DivisionFilter: StatsPageFilter = {
    expanded: false,
    title: "Divisions",
    field: "division",
    options: [...divisions],
    selected: new Set(divisions),
    filter: (records, selected) => {
      return records.filter((record) => !!record.division && selected.has(record.division));
    },
  };

  const SeasonFilter: StatsPageFilter = {
    expanded: false,
    title: "Seasons",
    field: "season",
    options: [...seasons],
    selected: new Set(seasons),
    filter: (records, selected) => {
      return records.filter((record) => !!record.season && selected.has(record.season));
    },
  };

  return [DivisionFilter, SeasonFilter];
};

export default filterDefinitions;
