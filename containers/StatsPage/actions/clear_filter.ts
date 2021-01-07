import { StatsPageActionName, StatsPageReducerFunction } from "types/stats_page";

export const clear_filter: StatsPageReducerFunction = (state, action) => {
  if (action.type !== StatsPageActionName.ClearFilter) {
    return state;
  }

  const activeView = state.views.find((view) => view.active);
  if (!activeView) {
    return state;
  }

  const filters = state.filters.map((filter) => {
    return {
      ...filter,
      selected: filter.title === action.filter ? new Set<string>() : filter.selected,
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
