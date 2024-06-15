import SQLFunctionInterface from "../SQLFunctionInterface";

export interface updateCommentRatingProcedureInterface {
  getQuery: (
    userEmail: string,
    movieName: string,
    rating: number | string
  ) => { text: string; values: string[] };
}

const updateCommentRatingProcedure: SQLFunctionInterface &
  updateCommentRatingProcedureInterface = {
  getName: function (): string {
    return "update_comment_rating";
  },

  getCreationQuery: function (): string {
    return `
    CREATE OR REPLACE PROCEDURE update_comment_rating(user_email varchar, movie_name varchar, rating_param int)
    LANGUAGE plpgsql
    AS $$
    BEGIN
      UPDATE comments
      SET rating = rating_param 
      FROM users, movies
      WHERE comments.movie_id = movies.id  
      AND comments.user_id = users.id  
      AND users.email = user_email 
      AND movies.name = movie_name;
      
      UPDATE movies
      SET rating = (
        SELECT AVG(comments.rating) as rating_avg FROM comments
        INNER JOIN movies ON comments.movie_id = movies.id
        WHERE movies.name = movie_name
        GROUP BY comments.movie_id
      )
      WHERE movies.name = movie_name;
    END;
    $$;
`;
  },

  getQuery: function (
    userEmail: string,
    movieName: string,
    rating: number | string
  ): { text: string; values: string[] } {
    return {
      text: `CALL update_comment_rating($1, $2, $3);`,
      values: [userEmail, movieName, rating.toString()],
    };
  },
} as const;

export default updateCommentRatingProcedure;
