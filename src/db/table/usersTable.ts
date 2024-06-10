import { TableInterface } from "../TableInterface";
import viewingsTable from "./viewingsTable";

export interface UsersTableInterface {
  getBestViewerQuery: () => string;
}

const usersTable: TableInterface & UsersTableInterface = {
  getTableName: function (): string {
    return "Users";
  },

  getCreationQuery: function (): string {
    return `CREATE TABLE IF NOT EXISTS ${this.getTableName()} (
      id SERIAL PRIMARY KEY,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT now() NOT NULL
    );`;
  },

  getRelationQueries: function (): null {
    return null;
  },

  getSeedQuery: function (): string {
    const md5 = require("md5");

    return `INSERT INTO ${this.getTableName()} (firstname, lastname, email, password) VALUES
    ('John', 'Doe', 'john.doe@example.com', '${md5("password123")}'),
    ('Jane', 'Smith', 'jane.smith@example.com', '${md5("passw0rd")}'),
    ('Alice', 'Johnson', 'alice.johnson@example.com', '${md5("alice123")}'),
    ('Bob', 'Williams', 'bob.williams@example.com', '${md5("bobwilliams")}'),
    ('Carol', 'Brown', 'carol.brown@example.com', '${md5("browncarol")}'),
    ('David', 'Jones', 'david.jones@example.com', '${md5("david2024")}'),
    ('Eve', 'Miller', 'eve.miller@example.com', '${md5("eve_miller")}'),
    ('Frank', 'Davis', 'frank.davis@example.com', '${md5("frank2024")}'),
    ('Grace', 'Garcia', 'grace.garcia@example.com', '${md5("graceG!")}'),
    ('Henry', 'Martinez', 'henry.martinez@example.com', '${md5(
      "henryM123"
    )}');`;
  },

  getBestViewerQuery: function (): string {
    const tableName = this.getTableName();
    const viewingTableName = viewingsTable.getTableName();

    return `SELECT firstname, lastname, COUNT(${viewingTableName}.id) as view_count
    FROM ${tableName}
    INNER JOIN ${viewingTableName} ON ${tableName}.id = ${viewingTableName}.user_id 
    GROUP BY ${tableName}.id
    ORDER BY view_count DESC
    LIMIT 1;`;
  },
} as const;

export default usersTable;
