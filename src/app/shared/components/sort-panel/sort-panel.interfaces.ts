export interface SortOption {
  key: any;
  label: string;
}
export interface SortPreferences {
  sortBy: any;
  sortOrder: SortOrder;
}

export type SortOrder = 'ASC' | 'DESC';
