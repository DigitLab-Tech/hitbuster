import { TableInterface } from "../TableInterface";
import usersTable from "./usersTable";

const addressesTable: TableInterface = {
  getTableName: function (): string {
    return "Addresses";
  },

  getCreationQuery: function (): string {
    return `CREATE TABLE IF NOT EXISTS ${this.getTableName()}(
      id SERIAL PRIMARY KEY,
      user_id BIGINT NOT NULL,
      line VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      province VARCHAR(255) NULL,
      country VARCHAR(255) NOT NULL,
      postal_code VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT now() NOT NULL
    );`;
  },

  getRelationQueries: function (): string[] {
    return [
      `ALTER TABLE ${this.getTableName()} 
      ADD CONSTRAINT addresses_user_id_foreign 
      FOREIGN KEY(user_id) 
      REFERENCES ${usersTable.getTableName()} (id);`,
    ];
  },

  getSeedQuery: function (): string {
    return `INSERT INTO ${this.getTableName()} (user_id, line, city, province, country, postal_code) VALUES
    (1, '123 Main St', 'Springfield', 'IL', 'USA', '62701'),
    (2, '456 Elm St', 'Metropolis', 'NY', 'USA', '10001'),
    (3, '789 Maple St', 'Gotham', 'NJ', 'USA', '07001'),
    (4, '101 Oak St', 'Star City', 'CA', 'USA', '90001'),
    (5, '202 Pine St', 'Central City', 'MO', 'USA', '64030'),
    (6, '303 Birch St', 'Smallville', 'KS', 'USA', '66002'),
    (7, '404 Cedar St', 'Fawcett City', 'MD', 'USA', '20701'),
    (8, '505 Willow St', 'Coast City', 'CA', 'USA', '92626'),
    (9, '606 Aspen St', 'Blüdhaven', 'DE', 'USA', '19901'),
    (10, '707 Redwood St', 'Gateway City', 'OR', 'USA', '97034');`;
  },
} as const;

export default addressesTable;
