import usersTable from "@/db/table/usersTable";
import { db } from "@vercel/postgres";
import { Metadata } from "next/types";
import UserForm from "./UserForm";

export const metadata: Metadata = {
  title: "Best Suggestion",
};

export async function getAllUsers() {
  const client = await db.connect();

  return await client.query<{
    id: string;
    firstname: string;
    lastname: string;
  }>(usersTable.getAllQuery());
}

export default async function BestSuggestion() {
  const allUsersResult = await getAllUsers();
  const allUsers = allUsersResult.rows;

  return <UserForm allUsers={allUsers} />;
}
