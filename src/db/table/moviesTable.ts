import { TableInterface } from "../TableInterface";
import categoriesTable from "./categoriesTable";
import moviesCategoriesTable from "./moviesCategoriesTable";
import producersTable from "./producersTable";
import viewingsTable from "./viewingsTable";

export interface MoviesTableInterface {
  getNeverViewedMoviesQuery: () => string;
  getActionMoviesQuery: () => string;
}

const moviesTable: TableInterface & MoviesTableInterface = {
  getTableName: function (): string {
    return "Movies";
  },

  getCreationQuery: function (): string {
    return `CREATE TABLE IF NOT EXISTS ${this.getTableName()}(
      id SERIAL PRIMARY KEY,
      producer_id BIGINT NOT NULL,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      duration INT NOT NULL,
      language VARCHAR(255) NOT NULL,
      language_origin VARCHAR(255) NOT NULL,
      rating REAL NOT NULL,
      created_at TIMESTAMP DEFAULT now() NOT NULL
    );`;
  },

  getRelationQueries: function (): string[] {
    return [
      `ALTER TABLE ${this.getTableName()} 
      ADD CONSTRAINT movie_producer_id_foreign 
      FOREIGN KEY(producer_id) 
      REFERENCES ${producersTable.getTableName()} (id);`,
    ];
  },

  getSeedQuery: function (): string {
    return `INSERT INTO ${this.getTableName()} (producer_id, name, description, duration, language, language_origin, rating) VALUES
    (1, 'The Matrix', 'A computer hacker learns about the true nature of reality and his role in the war against its controllers.', 136, 'English', 'English', 8.7),
    (2, 'Inception', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 148, 'English', 'English', 8.8),
    (3, 'Interstellar', 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.', 169, 'English', 'English', 8.6),
    (4, 'The Dark Knight', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 152, 'English', 'English', 9.0),
    (1, 'Fight Club', 'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.', 139, 'English', 'English', 8.8),
    (2, 'Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 154, 'English', 'English', 8.9),
    (3, 'The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 142, 'English', 'English', 9.3),
    (4, 'The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 175, 'English', 'English', 9.2),
    (2, 'Forrest Gump', 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.', 142, 'English', 'English', 8.8),
    (4, 'The Lord of the Rings: The Return of the King', 'Gandalf and Aragorn lead the World of Men against Sauron''s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.', 201, 'English', 'English', 8.9);`;
  },

  getNeverViewedMoviesQuery: function (): string {
    return `SELECT name FROM ${this.getTableName()}
      WHERE id NOT IN  (SELECT movie_id FROM ${viewingsTable.getTableName()})`;
  },

  getActionMoviesQuery: function (): string {
    const tableName = this.getTableName();
    const moviesCategoriesTableName = moviesCategoriesTable.getTableName();
    const categoriesTableName = categoriesTable.getTableName();

    return `SELECT ${tableName}.name, rating FROM ${tableName}
      INNER JOIN ${moviesCategoriesTableName} ON ${tableName}.id = ${moviesCategoriesTableName}.movie_id
      INNER JOIN ${categoriesTableName} ON ${moviesCategoriesTableName}.category_id = ${categoriesTableName}.id
      WHERE ${categoriesTableName}.name = 'Action';`;
  },
} as const;

export default moviesTable;
