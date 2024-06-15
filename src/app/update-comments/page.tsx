import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import commentsTable from "@/db/table/commentsTable";
import { db } from "@vercel/postgres";
import CommentForm from "./CommentForm";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Update Comments",
};

export type CommentRow = {
  user_email: string;
  movie_name: string;
  rating: number;
};

async function getAll() {
  const client = await db.connect();
  return await client.query<CommentRow>(commentsTable.getAllQuery());
}

export default async function UpdateComment() {
  const allCommentsResult = await getAll();
  const rows = allCommentsResult.rows;

  return (
    <div className="py-6 w-full">
      <h1 className="font-bold text-2xl">Action movies</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User email</TableHead>
            <TableHead>Movie name</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, i) => (
            <CommentForm key={i} row={row} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
