import { PlayerSeason } from "types/season";

export type StatsPageState = {
  views: StatsPageView[];
  filters: StatsPageFilter[];
  sortColumn: StatsPageSortColumn;
  sortDirection: StatsPageSortDirection;
  raw: PlayerSeason[];
  normalized: StatsPageNormalizedPlayerSeason[];
};

export type StatsPageColumnFormatter = (value: number) => string;
export type StatsPageColumnLinker = (value: string) => React.ReactNode;

export type StatsPageColumnDefinition = {
  title: string;
  format?: StatsPageColumnFormatter;
  link?: StatsPageColumnLinker;
};

export type StatsPageView = {
  active: boolean;
  title: string;
  sections: StatsPageViewSection[];
  columns: Partial<Record<StatsPageSortColumn, StatsPageColumnDefinition>>;
  initialSortColumn: StatsPageSortColumn;
  normalize: (records: PlayerSeason[]) => StatsPageNormalizedPlayerSeason[];
};

export type StatsPageViewSection = {
  title?: string;
  columns: StatsPageSortColumn[];
};

export type StatsPageViewColumn = {
  title: string;
  column: StatsPageSortColumn;
};

export type StatsPageReducerFunction = (
  state: StatsPageState,
  action: StatsPageAction
) => StatsPageState;

export enum StatsPageActionName {
  ExpandFilter,
  ToggleFilterSelection,
  ChangeView,
  ChangeSort,
  SelectAllFilter,
  ClearFilter,
}

export type StatsPageAction =
  | {
      type: StatsPageActionName.ExpandFilter;
      filter: string;
    }
  | {
      type: StatsPageActionName.ToggleFilterSelection;
      filter: string;
      value: string;
    }
  | {
      type: StatsPageActionName.ChangeView;
      view: string;
    }
  | {
      type: StatsPageActionName.ChangeSort;
      column: StatsPageSortColumn;
    }
  | {
      type: StatsPageActionName.SelectAllFilter;
      filter: string;
    }
  | {
      type: StatsPageActionName.ClearFilter;
      filter: string;
    };

export enum StatsPageSortDirection {
  Descending,
  Ascending,
}

export type StatsPageFilter = {
  expanded: boolean;
  title: string;
  field: StatsPageSortColumn;
  options: string[];
  selected: Set<string>;
  filter: (records: PlayerSeason[], selected: Set<string>) => PlayerSeason[];
};

export type StatsPageInitializerProps = {
  seasons: string[];
  divisions: string[];
  raw: PlayerSeason[];
};

export type StatsPageSortColumn = keyof StatsPageNormalizedPlayerSeason;

export type StatsPageNormalizedPlayerSeason = {
  player: string;
  season: string;
  division: string;

  cricket_legs: number;
  mpr: number;
  tbRate: number;
  hitRate: number;
  m9: number;

  x01_legs: number;
  average: number;
  checkoutRate: number;
  highOut: number;
  t80: number;

  rs_match_win: number;
  rs_match_loss: number;
  rs_match_draw: number;
  rs_match_wpct: number;

  rs_bonus: number;
  rs_bonus_rate: number;

  po_match_win: number;
  po_match_loss: number;
  po_match_wpct: number;

  cricket_win: number;
  cricket_loss: number;
  cricket_wpct: number;

  x01_win: number;
  x01_loss: number;
  x01_wpct: number;

  leg_win: number;
  leg_loss: number;
  leg_wpct: number;

  seasonCount: number;
  stars: number;
  playoff_wins: number;
  rs_titles: number;
};
