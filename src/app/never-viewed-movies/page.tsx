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
  title: "Best Movie Actors",
};

export async function getNeverViewedMovies() {
  const client = await db.connect();
  return await client.query<{
    name: string;
  }>(moviesTable.getNeverViewedMoviesQuery());
}

export default async function bestMovieActors() {
  const getNeverViewedMoviesResult = await getNeverViewedMovies();
  const rows = getNeverViewedMoviesResult.rows;

  return (
    <div className="flex flex-col gap-3 justify-center items-center w-full h-screen">
      <h1 className="font-bold text-2xl">Never viewed movies</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
