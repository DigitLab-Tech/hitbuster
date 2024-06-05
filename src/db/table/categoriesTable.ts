import { TableInterface } from "../TableInterface";

const categoriesTable: TableInterface = {
  getTableName: function (): string {
    return "Categories";
  },

  getCreationQuery: function (): string {
    return `CREATE TABLE IF NOT EXISTS ${this.getTableName()}(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT now() NOT NULL
    );`;
  },

  getRelationQueries: function (): null {
    return null;
  },

  getSeedQuery: function (): string {
    return `INSERT INTO Categories (name) VALUES
    ('Action'),
    ('Horror'),
    ('Comedie'),
    ('Adventure'),
    ('Thriller'),
    ('Sci-fi');`;
  },
} as const;

export default categoriesTable;
