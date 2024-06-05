import { TableInterface } from "../TableInterface";

const producersTable: TableInterface = {
  getTableName: function (): string {
    return "Producers";
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
    return `INSERT INTO ${this.getTableName()} (name) VALUES
    ('Disney'),
    ('Nexflix'),
    ('Apple'),
    ('Amazon');`;
  },
} as const;

export default producersTable;
