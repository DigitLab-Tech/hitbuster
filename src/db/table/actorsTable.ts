import { TableInterface } from "../TableInterface";

const actorsTable: TableInterface = {
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
} as const;

export default actorsTable;
