import { StatsPageActionName, StatsPageReducerFunction } from "types/stats_page";

export const toggle_filter_selected: StatsPageReducerFunction = (state, action) => {
  if (action.type !== StatsPageActionName.ToggleFilterSelection) {
    return state;
  }

  const activeView = state.views.find((view) => view.active);
  if (!activeView) {
    return state;
  }

  const filters = state.filters.map((filter) => {
    if (filter.title !== action.filter) {
      return filter;
    }

    if (filter.selected.has(action.value)) {
      filter.selected.delete(action.value);
      return filter;
    }

    filter.selected.add(action.value);
    return filter;
  });

  return {
    ...state,
    filters,
    normalized: activeView.normalize(
      filters.reduce((mem, filter) => filter.filter(mem, filter.selected), state.raw)
    ),
  };
};
