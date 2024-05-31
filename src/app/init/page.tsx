import dbConnection from "@/db/DBConnection";
import { TableInterface } from "@/db/table/TableInterface";
import userTable from "@/db/table/userTable";

export default async function Home() {
  const connection = await dbConnection.connect();
  const tables: TableInterface[] = [userTable];

  if (connection) {
    for (const table of tables) {
      await connection?.execute(table.getCreateQuery());
    }
  }

  return <div></div>;
}
