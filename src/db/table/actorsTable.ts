import { TableInterface } from "../TableInterface";
import castingsTable from "./castingsTable";
import moviesTable from "./moviesTable";

export interface ActorsTablesInterface {
  getBestMovieActorsQuery: () => string;
}

const actorsTable: TableInterface & ActorsTablesInterface = {
  getTableName: function (): string {
    return "Actors";
  },

  getCreationQuery: function (): string {
    return `CREATE TABLE IF NOT EXISTS ${this.getTableName()}(
      id SERIAL PRIMARY KEY,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT now() NOT NULL
    );`;
  },

  getRelationQueries: function (): null {
    return null;
  },

  getSeedQuery: function (): string {
    return `INSERT INTO ${this.getTableName()} (firstname, lastname) VALUES
    ('John', 'Doe'),
    ('Jane', 'Smith'),
    ('Alice', 'Johnson'),
    ('Bob', 'Williams'),
    ('Carol', 'Brown'),
    ('David', 'Jones'),
    ('Eve', 'Miller'),
    ('Frank', 'Davis');`;
  },

  getBestMovieActorsQuery() {
    const tableName = this.getTableName();
    const moviesTableName = moviesTable.getTableName();
    const castingsTableName = castingsTable.getTableName();

    return `SELECT firstname, lastname, ${moviesTableName}.name as movie_name, ${moviesTableName}.rating as movie_rating FROM ${tableName}
      INNER JOIN ${castingsTableName} ON ${tableName}.id = ${castingsTableName}.actor_id
      INNER JOIN ${moviesTableName} ON ${castingsTableName}.movie_id = ${moviesTableName}.id
      WHERE ${castingsTableName}.movie_id = (SELECT id FROM ${moviesTableName} ORDER BY rating DESC LIMIT 1)`;
  },
} as const;

export default actorsTable;
