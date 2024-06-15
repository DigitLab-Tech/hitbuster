"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormState } from "react-dom";
import { getBestSuggestion } from "../actions";
import { useState } from "react";

export default function UserForm({
  allUsers,
}: {
  allUsers: { firstname: string; lastname: string; id: string }[];
}) {
  const [userId, setUserId] = useState("0");
  const [getBestSuggestionState, getBestSuggestionFormAction] = useFormState(
    getBestSuggestion,
    {
      suggestion: "no_query",
    }
  );

  return (
    <div className="flex gap-3 items-center">
      <Select onValueChange={(value) => setUserId(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a users" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Users</SelectLabel>
            {allUsers.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.firstname} {user.lastname}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <form action={getBestSuggestionFormAction} className="flex gap-3">
        <input name="userId" type="hidden" value={userId} />
        <Button>Get suggestion</Button>
      </form>
      {getBestSuggestionState.suggestion != "no_query" && (
        <span>
          {getBestSuggestionState.suggestion ? (
            <span>{getBestSuggestionState.suggestion}</span>
          ) : (
            <span>No suggestion</span>
          )}
        </span>
      )}
    </div>
  );
}
