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
      `ALTER TABLE ${this.getTableName()} ADD PRIMARY KEY (movie_id, category_id);`,
    ];
  },

  getSeedQuery() {
    return `INSERT INTO ${this.getTableName()} (movie_id, category_id) VALUES
      (1, 1),
      (2, 1),
      (3, 1),
      (4, 1),
      (5, 1),
      (5, 3),
      (7, 4),
      (3, 5),
      (8, 1),
      (9, 3),
      (5, 5),
      (2, 6),
      (1, 2);`;
  },
} as const;

export default moviesCategoriesTable;
