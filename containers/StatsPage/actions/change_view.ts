import {
  StatsPageActionName,
  StatsPageReducerFunction,
  StatsPageSortDirection,
} from "types/stats_page";

export const change_view: StatsPageReducerFunction = (state, action) => {
  if (action.type !== StatsPageActionName.ChangeView) {
    return state;
  }

  const activeView = state.views.find((view) => view.title === action.view);
  const sortColumn = activeView?.initialSortColumn;

  if (!activeView || !sortColumn) {
    return state;
  }

  return {
    ...state,
    sortColumn,
    views: state.views.map((view) => ({
      ...view,
      active: view.title === action.view,
    })),
    sortDirection: StatsPageSortDirection.Descending,
    normalized: activeView.normalize(
      state.filters.reduce((mem, filter) => filter.filter(mem, filter.selected), state.raw)
    ),
  };
};
