import { TableInterface } from "./TableInterface";
import usersTable from "./table/usersTable";
import actorsTable from "./table/actorsTable";
import addressesTable from "./table/addressesTable";
import producersTable from "./table/producersTable";
import castingsTable from "./table/castingsTable";
import categoriesTable from "./table/categoriesTable";
import commentsTable from "./table/commentsTable";
import contractsTable from "./table/contractsTable";
import moviesCategoriesTable from "./table/moviesCategoriesTable";
import moviesTable from "./table/moviesTable";
import viewingsTable from "./table/viewingsTable";

const tablesPool = {
  getTables: () => {
    const pool: TableInterface[] = [
      actorsTable,
      addressesTable,
      moviesTable,
      castingsTable,
      categoriesTable,
      commentsTable,
      contractsTable,
      moviesCategoriesTable,
      producersTable,
      usersTable,
      viewingsTable,
    ];

    return pool.sort((a, b) => {
      const aRelationCount = a.getRelationQueries()?.length ?? 0;
      const bRelationCount = b.getRelationQueries()?.length ?? 0;

      if (aRelationCount < bRelationCount) {
        return -1;
      }

      if (aRelationCount > bRelationCount) {
        return 1;
      }

      return 0;
    });
  },
} as const;

export default tablesPool;
