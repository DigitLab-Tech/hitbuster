export interface TableInterface {
  getTableName: () => string;
  getCreationQuery: () => string;
  getRelationQueries: () => string[] | null;
  getSeedQuery: () => string | null;
}
