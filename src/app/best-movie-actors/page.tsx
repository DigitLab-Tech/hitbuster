import actorsTable from "@/db/table/actorsTable";
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

export const metadata: Metadata = {
  title: "Best Movie Actors",
};

export async function getBestMovieActors() {
  const client = await db.connect();
  return await client.query<{
    firstname: string;
    lastname: string;
    movie_name: string;
    movie_rating: number;
  }>(actorsTable.getBestMovieActorsQuery());
}

export default async function bestMovieActors() {
  const bestMovieActorsResult = await getBestMovieActors();
  const rows = bestMovieActorsResult.rows;

  return (
    <div className="flex flex-col gap-3 justify-center items-center w-full h-screen">
      <h1 className="font-bold text-2xl">Best Movie Actors</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Firstname</TableHead>
            <TableHead>Lastname</TableHead>
            <TableHead>Movie name</TableHead>
            <TableHead className="text-right">Movie rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium">{row.firstname}</TableCell>
              <TableCell>{row.lastname}</TableCell>
              <TableCell>{row.movie_name}</TableCell>
              <TableCell className="text-right">{row.movie_rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
