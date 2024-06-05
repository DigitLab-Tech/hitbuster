import { TableInterface } from "../TableInterface";
import moviesTable from "./moviesTable";

const contractsTable: TableInterface = {
  getTableName: function (): string {
    return "Contracts";
  },

  getCreationQuery: function (): string {
    return `CREATE TABLE IF NOT EXISTS ${this.getTableName()}(
      id SERIAL PRIMARY KEY,
      movie_id BIGINT NOT NULL,
      speciality VARCHAR(255) NOT NULL,
      start_at DATE NOT NULL,
      end_at DATE NOT NULL,
      salary REAL NOT NULL,
      created_at TIMESTAMP DEFAULT now() NOT NULL
    );`;
  },

  getRelationQueries: function (): string[] {
    return [
      `ALTER TABLE ${this.getTableName()} 
      ADD CONSTRAINT contract_movie_id_foreign 
      FOREIGN KEY(movie_id) 
      REFERENCES ${moviesTable.getTableName()} (id);`,
    ];
  },

  getSeedQuery: function (): string {
    return `INSERT INTO ${this.getTableName()} (movie_id, speciality, start_at, end_at, salary) VALUES
    (1, 'Director', '2023-01-01', '2023-06-30', 150000.00),
    (3, 'Producer', '2023-02-01', '2023-07-31', 140000.00),
    (5, 'Screenwriter', '2023-03-01', '2023-08-31', 120000.00),
    (4, 'Cinematographer', '2023-04-01', '2023-09-30', 130000.00),
    (6, 'Editor', '2023-05-01', '2023-10-31', 110000.00),
    (8, 'Composer', '2023-06-01', '2023-11-30', 100000.00),
    (7, 'Sound Designer', '2023-07-01', '2023-12-31', 90000.00),
    (3, 'Production Designer', '2023-08-01', '2024-01-31', 95000.00),
    (1, 'Costume Designer', '2023-09-01', '2024-02-28', 85000.00),
    (8, 'Makeup Artist', '2023-10-01', '2024-03-31', 80000.00);`;
  },
} as const;

export default contractsTable;
