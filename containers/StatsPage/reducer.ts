import * as actions from "./actions";
import {
  StatsPageState,
  StatsPageInitializerProps,
  StatsPageActionName,
  StatsPageReducerFunction,
  StatsPageSortDirection,
} from "types/stats_page";
import viewDefinitions from "./viewDefinitions";
import filterDefinitions from "./filterDefinitions";

export const reducer: StatsPageReducerFunction = (state, action) => {
  switch (action.type) {
    case StatsPageActionName.ExpandFilter:
      return actions.expand_filter(state, action);

    case StatsPageActionName.ToggleFilterSelection:
      return actions.toggle_filter_selected(state, action);

    case StatsPageActionName.ChangeView:
      return actions.change_view(state, action);

    case StatsPageActionName.ChangeSort:
      return actions.change_sort(state, action);

    case StatsPageActionName.ClearFilter:
      return actions.clear_filter(state, action);

    case StatsPageActionName.SelectAllFilter:
      return actions.select_all_filter(state, action);

    default:
      return state;
  }
};

export const initializer = (props: StatsPageInitializerProps): StatsPageState => {
  return {
    views: viewDefinitions,
    filters: filterDefinitions(props),
    sortColumn: viewDefinitions[0].initialSortColumn,
    sortDirection: StatsPageSortDirection.Descending,
    raw: props.raw,
    normalized: viewDefinitions[0].normalize(props.raw),
  };
};
