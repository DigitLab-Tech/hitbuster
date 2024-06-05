import { TableInterface } from "../TableInterface";
import actorsTable from "./actorsTable";
import moviesTable from "./moviesTable";

const castingsTable: TableInterface = {
  getTableName: function (): string {
    return "Castings";
  },

  getCreationQuery: function (): string {
    return `CREATE TABLE IF NOT EXISTS ${this.getTableName()}(
      id SERIAL PRIMARY KEY,
      actor_id BIGINT NOT NULL,
      movie_id BIGINT NOT NULL,
      character_name VARCHAR(255) NOT NULL,
      cachet REAL NOT NULL,
      started_at DATE NOT NULL,
      ended_at DATE NOT NULL,
      created_at TIMESTAMP DEFAULT now() NOT NULL
    );`;
  },

  getRelationQueries: function (): string[] {
    return [
      `ALTER TABLE ${this.getTableName()} 
      ADD CONSTRAINT casting_actor_id_foreign 
      FOREIGN KEY(actor_id) 
      REFERENCES ${actorsTable.getTableName()} (id);`,
      `ALTER TABLE ${this.getTableName()} 
      ADD CONSTRAINT casting_movie_id_foreign 
      FOREIGN KEY(movie_id) 
      REFERENCES ${moviesTable.getTableName()} (id);`,
    ];
  },

  getSeedQuery: function (): string {
    return `INSERT INTO ${this.getTableName()} (actor_id, movie_id, character_name, cachet, started_at, ended_at) VALUES
    (1, 1, 'John McClane', 1000000.00, '2023-01-01', '2023-03-01'),
    (2, 2, 'Ellen Ripley', 1200000.00, '2023-02-01', '2023-04-01'),
    (3, 3, 'Indiana Jones', 1500000.00, '2023-03-01', '2023-05-01'),
    (4, 2, 'Sarah Connor', 1100000.00, '2023-04-01', '2023-06-01'),
    (5, 1, 'James Bond', 2000000.00, '2023-05-01', '2023-07-01'),
    (4, 3, 'Lara Croft', 900000.00, '2023-06-01', '2023-08-01'),
    (6, 2, 'Neo', 1800000.00, '2023-07-01', '2023-09-01'),
    (6, 1, 'Frodo Baggins', 800000.00, '2023-08-01', '2023-10-01'),
    (5, 1, 'Tony Stark', 2500000.00, '2023-09-01', '2023-11-01'),
    (1, 2, 'Hermione Granger', 850000.00, '2023-10-01', '2023-12-01');`;
  },
} as const;

export default castingsTable;
