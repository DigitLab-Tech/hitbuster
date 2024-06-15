import SQLFunctionInterface from "../SQLFunctionInterface";

export interface GetBestSuggestionFunctionInterface {
  getQuery: (userId: string) => { text: string; values: string[] };
}

const getBestSuggestionFunction: SQLFunctionInterface &
  GetBestSuggestionFunctionInterface = {
  getName: function (): string {
    return "get_best_suggestion";
  },

  getCreationQuery: function (): string {
    return `
    CREATE OR REPLACE FUNCTION public.get_best_suggestion(user_id_param int)
        RETURNS movies.name%type
        LANGUAGE plpgsql
        AS $$
            DECLARE best_movie_id int;
            DECLARE best_suggest_movie_name varchar;
        BEGIN
                SELECT movie_id
                INTO best_movie_id
                FROM comments
                WHERE comments.user_id = user_id_param 
                ORDER BY rating DESC
                LIMIT 1;
                
                IF(best_movie_id IS NULL) THEN
                    RETURN NULL;
                END IF;
                
            SELECT name
            INTO best_suggest_movie_name 
            FROM movies
            WHERE id in (
            SELECT movie_id
            FROM movies_categories
            WHERE category_id IN (
                SELECT category_id
                FROM movies_categories 
                    WHERE best_movie_id = movies_categories.movie_id 
            ))
            ORDER BY movies.rating DESC
            LIMIT 1; 
            RETURN best_suggest_movie_name; 
        END;
        $$
    ;`;
  },

  getQuery: function (userId: string): { text: string; values: string[] } {
    return { text: `SELECT get_best_suggestion($1);`, values: [userId] };
  },
} as const;

export default getBestSuggestionFunction;
