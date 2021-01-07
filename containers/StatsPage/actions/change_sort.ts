import {
  StatsPageActionName,
  StatsPageReducerFunction,
  StatsPageSortDirection,
} from "types/stats_page";

export const change_sort: StatsPageReducerFunction = (state, action) => {
  if (action.type !== StatsPageActionName.ChangeSort) {
    return state;
  }

  return {
    ...state,
    sortColumn: action.column,
    sortDirection:
      state.sortColumn === action.column
        ? state.sortDirection === StatsPageSortDirection.Descending
          ? StatsPageSortDirection.Ascending
          : StatsPageSortDirection.Descending
        : StatsPageSortDirection.Descending,
  };
};
