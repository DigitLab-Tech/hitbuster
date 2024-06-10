import usersTable from "@/db/table/usersTable";
import { db } from "@vercel/postgres";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Best Viewer",
};

async function getBestViewer() {
  const client = await db.connect();
  return await client.query<{
    firstname: string;
    lastname: string;
    view_count: number;
  }>(usersTable.getBestViewerQuery());
}

export default async function BestViewer() {
  const bestViewerResult = await getBestViewer();
  const bestViewer = bestViewerResult.rows[0];

  return (
    <div className="flex flex-col gap-3 justify-center items-center w-full h-screen">
      <h1 className="font-bold text-2xl">Best viewer</h1>
      <span>
        {bestViewer && bestViewer.firstname + " " + bestViewer.lastname}
      </span>
    </div>
  );
}
