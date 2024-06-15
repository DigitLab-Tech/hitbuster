import { TableInterface } from "../TableInterface";
import moviesTable from "./moviesTable";
import usersTable from "./usersTable";

export interface CommentsTableInterface {
  updateCommentRatingQuery: (
    userEmail: string,
    movieName: string,
    rating: number | string
  ) => { text: string; values: string[] };
  deleteCommentQuery: (
    userEmail: string,
    movieName: string
  ) => { text: string; values: string[] };
  getAllQuery: () => string;
}

const commentsTable: TableInterface & CommentsTableInterface = {
  getTableName: function (): string {
    return "Comments";
  },

  getCreationQuery: function (): string {
    return `CREATE TABLE IF NOT EXISTS ${this.getTableName()}(
      id SERIAL PRIMARY KEY,
      user_id BIGINT NOT NULL,
      movie_id BIGINT NOT NULL,
      description TEXT NOT NULL,
      rating INT NOT NULL,
      created_at TIMESTAMP DEFAULT now() NOT NULL
    );`;
  },

  getRelationQueries: function (): string[] {
    const tableName = this.getTableName();

    return [
      `ALTER TABLE ${tableName} 
      ADD CONSTRAINT comment_movie_id_foreign 
      FOREIGN KEY(movie_id) 
      REFERENCES ${moviesTable.getTableName()} (id);`,
      `ALTER TABLE ${tableName} 
      ADD CONSTRAINT comment_user_id_foreign 
      FOREIGN KEY(user_id) 
      REFERENCES ${usersTable.getTableName()} (id);`,
      `ALTER TABLE ${tableName} ADD PRIMARY KEY (user_id, movie_id);`,
    ];
  },

  getSeedQuery: function (): string {
    return `INSERT INTO ${this.getTableName()} (user_id, movie_id, description, rating) VALUES
    (1, 1, 'Amazing movie with a thrilling plot and great acting.', 5),
    (2, 3, 'A decent watch, but the story could have been better.', 3),
    (3, 3, 'Fantastic visual effects and a gripping storyline.', 4),
    (4, 5, 'The movie was too slow and not very engaging.', 2),
    (5, 5, 'An absolute masterpiece with stellar performances.', 5),
    (6, 6, 'Pretty average, not very memorable.', 3),
    (7, 7, 'Great action scenes but lacked depth in the story.', 4),
    (5, 7, 'Loved the characters and the plot twists.', 5),
    (6, 2, 'It was okay, had some good moments but also some flaws.', 3),
    (3, 2, 'Brilliant direction and excellent cinematography.', 5);`;
  },

  updateCommentRatingQuery: function (
    userEmail: string,
    movieName: string,
    rating: number | string
  ): { text: string; values: string[] } {
    const tableName = this.getTableName();
    const usersTableName = usersTable.getTableName();
    const moviesTableName = moviesTable.getTableName();

    return {
      text: `
      UPDATE ${tableName}
      SET rating = $3
      FROM ${usersTableName}, ${moviesTableName}
      WHERE ${tableName}.movie_id = ${moviesTableName}.id 
      AND ${tableName}.user_id = ${usersTableName}.id 
      AND ${usersTableName}.email = $1 
      AND ${moviesTableName}.name = $2;`,
      values: [userEmail, movieName, rating.toString()],
    };
  },

  deleteCommentQuery: function (userEmail: string, movieName: string) {
    const tableName = this.getTableName();
    const usersTableName = usersTable.getTableName();
    const moviesTableName = moviesTable.getTableName();

    return {
      text: `
      DELETE FROM ${tableName}
      USING ${usersTableName}, ${moviesTableName}
      WHERE ${tableName}.movie_id = ${moviesTableName}.id 
      AND ${tableName}.user_id = ${usersTableName}.id 
      AND ${usersTableName}.email = $1 
      AND ${moviesTableName}.name = $2;`,
      values: [userEmail, movieName],
    };
  },

  getAllQuery: function (): string {
    const tableName = this.getTableName();
    const usersTableName = usersTable.getTableName();
    const moviesTableName = moviesTable.getTableName();

    return `SELECT ${usersTableName}.email as user_email, ${moviesTableName}.name as movie_name, ${tableName}.rating FROM ${tableName}
    INNER JOIN ${moviesTableName} ON ${tableName}.movie_id = ${moviesTableName}.id
    INNER JOIN ${usersTableName} ON ${tableName}.user_id = ${usersTableName}.id
    ORDER BY ${usersTableName}.id`;
  },
} as const;

export default commentsTable;
