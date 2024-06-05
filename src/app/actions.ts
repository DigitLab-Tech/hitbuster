"use server";

import { createClient } from "@vercel/postgres";
import { NextResponse } from "next/server";
import tablesPool from "@/db/tablesPool";

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

    return { msg: "cool" };
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

    return { msg: "cool" };
  } catch (error) {
    console.log(error);
    return { msg: "something went wrong" };
  } finally {
    await client.end();
  }
}
