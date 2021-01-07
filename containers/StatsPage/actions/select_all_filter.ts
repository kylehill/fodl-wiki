import { StatsPageActionName, StatsPageReducerFunction } from "types/stats_page";

export const select_all_filter: StatsPageReducerFunction = (state, action) => {
  if (action.type !== StatsPageActionName.SelectAllFilter) {
    return state;
  }

  const activeView = state.views.find((view) => view.active);
  if (!activeView) {
    return state;
  }

  const filters = state.filters.map((filter) => {
    return {
      ...filter,
      selected: filter.title === action.filter ? new Set<string>(filter.options) : filter.selected,
    };
  });

  return {
    ...state,
    filters,
    normalized: activeView.normalize(
      filters.reduce((mem, filter) => filter.filter(mem, filter.selected), state.raw)
    ),
  };
};
