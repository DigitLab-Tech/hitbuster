import { TableInterface } from "../TableInterface";
import categoriesTable from "./categoriesTable";
import moviesTable from "./moviesTable";

const moviesCategoriesTable: TableInterface = {
  getTableName: function (): string {
    return "Movies_Categories";
  },

  getCreationQuery: function (): string {
    return `CREATE TABLE IF NOT EXISTS ${this.getTableName()}(
      id SERIAL PRIMARY KEY,
      movie_id BIGINT NOT NULL,
      category_id BIGINT NOT NULL,
      created_at TIMESTAMP DEFAULT now() NOT NULL
    );`;
  },

  getRelationQueries() {
    return [
      `ALTER TABLE ${this.getTableName()} 
      ADD CONSTRAINT movie_category_movie_id_foreign 
      FOREIGN KEY(movie_id) 
      REFERENCES ${moviesTable.getTableName()}(id);`,
      `ALTER TABLE ${this.getTableName()} 
      ADD CONSTRAINT movie_category_category_id_foreign 
      FOREIGN KEY(category_id) 
      REFERENCES ${categoriesTable.getTableName()} (id);`,
    ];
  },

  getSeedQuery() {
    return null;
  },
} as const;

export default moviesCategoriesTable;
