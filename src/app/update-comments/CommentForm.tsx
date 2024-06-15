"use client";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { FormEvent, useState } from "react";
import { CommentRow } from "./page";
import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { deleteComment, updateCommentRating } from "../actions";

export default function CommentForm({ row }: { row: CommentRow }) {
  const [rating, setRating] = useState<string | number>(row.rating);

  const handleInput = (event: FormEvent<HTMLInputElement>) => {
    setRating(event.currentTarget.value);
  };

  const [updateCommentRatingState, updateCommentRatingFormAction] =
    useFormState(updateCommentRating, {
      msg: "",
    });

  const [deleteCommentState, deleteCommentFormAction] = useFormState(
    deleteComment,
    {
      msg: "",
    }
  );

  return (
    <TableRow>
      <TableCell className="font-medium">{row.user_email}</TableCell>
      <TableCell className="font-medium">{row.movie_name}</TableCell>
      <TableCell className="font-medium">
        <Input defaultValue={row.rating} onInput={handleInput} />
      </TableCell>
      <TableCell className="flex gap-3 font-medium">
        <form action={updateCommentRatingFormAction}>
          <input name="user_email" type="hidden" value={row.user_email} />
          <input name="movie_name" type="hidden" value={row.movie_name} />
          <input name="rating" type="hidden" value={rating} />
          <Button>Save</Button>
        </form>
        <form action={deleteCommentFormAction}>
          <input name="user_email" type="hidden" value={row.user_email} />
          <input name="movie_name" type="hidden" value={row.movie_name} />
          <input name="rating" type="hidden" value={rating} />
          <Button className="bg-red-400">Delete</Button>
        </form>
      </TableCell>
    </TableRow>
  );
}
