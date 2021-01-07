import { StatsPageActionName, StatsPageReducerFunction } from "types/stats_page";

export const expand_filter: StatsPageReducerFunction = (state, action) => {
  if (action.type !== StatsPageActionName.ExpandFilter) {
    return state;
  }

  return {
    ...state,
    filters: state.filters.map((filter) => ({
      ...filter,
      expanded: filter.title === action.filter ? !filter.expanded : filter.expanded,
    })),
  };
};
