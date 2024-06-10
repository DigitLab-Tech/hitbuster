"use server";

import { createClient, db } from "@vercel/postgres";
import tablesPool from "@/db/tablesPool";
import commentsTable from "@/db/table/commentsTable";
import { revalidatePath } from "next/cache";

export async function initTables() {
  const client = createClient();
  const tables = tablesPool.getTables();

  console.log(tables[0].getRelationQueries.length);

  await client.connect();

  try {
    for (const table of tables) {
      try {
        await client.query(table.getCreationQuery());
      } catch (error) {
        console.log(error);
      }
    }

    for (const table of tables) {
      const relationQueries = table.getRelationQueries();

      for (const query of relationQueries ?? []) {
        try {
          await client.query(query);
        } catch (error) {
          console.log(error);
        }
      }
    }

    return { msg: "Success" };
  } catch (error) {
    console.log(error);
    return { msg: "something went wrong" };
  } finally {
    await client.end();
  }
}

export async function seedTables() {
  const client = createClient();
  const tables = tablesPool.getTables();

  await client.connect();

  try {
    for (const table of tables) {
      const seedQuery = table.getSeedQuery();
      seedQuery && (await client.query(seedQuery));
    }

    return { msg: "Success" };
  } catch (error) {
    console.log(error);
    return { msg: "something went wrong" };
  } finally {
    await client.end();
  }
}

export async function updateCommentRating(prevState: any, formData: FormData) {
  const client = await db.connect();
  const email = formData.get("user_email");
  const movieName = formData.get("movie_name");
  const rating = formData.get("rating");

  if (email && movieName && rating) {
    const { text, values } = commentsTable.updateCommentRatingQuery(
      email.toString(),
      movieName.toString(),
      rating.toString()
    );

    try {
      await client.query(text, values);
      return { msg: "Success" };
    } catch (error) {
      console.log(error);
      return { msg: "something went wrong" };
    }
  }
  return { msg: "something went wrong" };
}

export async function deleteComment(prevState: any, formData: FormData) {
  const client = await db.connect();
  const email = formData.get("user_email");
  const movieName = formData.get("movie_name");

  if (email && movieName) {
    const { text, values } = commentsTable.deleteCommentQuery(
      email.toString(),
      movieName.toString()
    );

    try {
      await client.query(text, values);
      revalidatePath("/update-comment");
      return { msg: "Success" };
    } catch (error) {
      console.log(error);
      return { msg: "something went wrong" };
    }
  }
  return { msg: "something went wrong" };
}
