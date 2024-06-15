import { db } from "@vercel/postgres";
import { Metadata } from "next/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moviesTable from "@/db/table/moviesTable";

export const metadata: Metadata = {
  title: "Action movies",
};

async function getActionMovies() {
  const client = await db.connect();

  return await client.query<{
    name: string;
    rating: number;
  }>(moviesTable.getActionMoviesQuery());
}

export default async function actionMovies() {
  const actionMoviesResult = await getActionMovies();
  const rows = actionMoviesResult.rows;

  return (
    <div className="py-6 w-full">
      <h1 className="font-bold text-2xl">Action movies</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell className="font-medium">{row.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
