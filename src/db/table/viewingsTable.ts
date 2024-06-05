import { TableInterface } from "../TableInterface";
import moviesTable from "./moviesTable";
import usersTable from "./usersTable";

const viewingsTable: TableInterface = {
  getTableName: function (): string {
    return "Viewings";
  },

  getCreationQuery: function (): string {
    return `CREATE TABLE IF NOT EXISTS ${this.getTableName()}(
      id SERIAL PRIMARY KEY,
      user_id BIGINT NOT NULL,
      movie_id BIGINT NOT NULL,
      current_duration INT NOT NULL,
      ip_address VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT now() NOT NULL
    );`;
  },

  getRelationQueries: function (): string[] {
    return [
      `ALTER TABLE ${this.getTableName()}
      ADD CONSTRAINT viewing_movie_id_foreign 
      FOREIGN KEY(movie_id) 
      REFERENCES ${moviesTable.getTableName()} (id);`,
      `ALTER TABLE ${this.getTableName()} 
      ADD CONSTRAINT viewing_user_id_foreign 
      FOREIGN KEY(user_id) 
      REFERENCES ${usersTable.getTableName()} (id);`,
    ];
  },

  getSeedQuery: function (): string {
    return `INSERT INTO ${this.getTableName()} (user_id, movie_id, current_duration, ip_address) VALUES
    (1, 3, 120, '192.168.1.1'),
    (4, 6, 90, '192.168.1.2'),
    (3, 8, 45, '192.168.1.3'),
    (6, 7, 150, '192.168.1.4'),
    (3, 1, 75, '192.168.1.5'),
    (6, 2, 180, '192.168.1.6'),
    (7, 5, 30, '192.168.1.7'),
    (8, 4, 105, '192.168.1.8'),
    (4, 2, 60, '192.168.1.9'),
    (5, 6, 135, '192.168.1.10');`;
  },
} as const;

export default viewingsTable;
