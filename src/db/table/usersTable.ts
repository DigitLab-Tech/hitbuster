import { TableInterface } from "../TableInterface";

const usersTable: TableInterface = {
  getTableName: function (): string {
    return "Users";
  },

  getCreationQuery: function (): string {
    return `CREATE TABLE IF NOT EXISTS ${this.getTableName()} (
      id SERIAL PRIMARY KEY,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT now() NOT NULL
    );`;
  },

  getRelationQueries: function (): null {
    return null;
  },

  getSeedQuery: function (): string {
    return `INSERT INTO ${this.getTableName()} (firstname, lastname, email, password) VALUES
    ('John', 'Doe', 'john.doe@example.com', 'password123'),
    ('Jane', 'Smith', 'jane.smith@example.com', 'passw0rd'),
    ('Alice', 'Johnson', 'alice.johnson@example.com', 'alice123'),
    ('Bob', 'Williams', 'bob.williams@example.com', 'bobwilliams'),
    ('Carol', 'Brown', 'carol.brown@example.com', 'browncarol'),
    ('David', 'Jones', 'david.jones@example.com', 'david2024'),
    ('Eve', 'Miller', 'eve.miller@example.com', 'eve_miller'),
    ('Frank', 'Davis', 'frank.davis@example.com', 'frank2024'),
    ('Grace', 'Garcia', 'grace.garcia@example.com', 'graceG!'),
    ('Henry', 'Martinez', 'henry.martinez@example.com', 'henryM123');`;
  },
} as const;

export default usersTable;
