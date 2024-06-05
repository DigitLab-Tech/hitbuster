import { TableInterface } from "../TableInterface";
import moviesTable from "./moviesTable";
import usersTable from "./usersTable";

const commentsTable: TableInterface = {
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
    return [
      `ALTER TABLE ${this.getTableName()} 
      ADD CONSTRAINT comment_movie_id_foreign 
      FOREIGN KEY(movie_id) 
      REFERENCES ${moviesTable.getTableName()} (id);`,
      `ALTER TABLE ${this.getTableName()} 
      ADD CONSTRAINT comment_user_id_foreign 
      FOREIGN KEY(user_id) 
      REFERENCES ${usersTable.getTableName()} (id);`,
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
} as const;

export default commentsTable;
