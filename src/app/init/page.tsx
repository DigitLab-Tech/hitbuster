"use client";

import { NextResponse } from "next/server";
import { useFormState } from "react-dom";
import { initTables, seedTables } from "../actions";

export default function Home() {
  const [initTablesState, initTablesFormAction] = useFormState(initTables, {
    msg: "",
  });
  const [seedTablesState, seedTablesFormAction] = useFormState(seedTables, {
    msg: "",
  });

  return (
    <div className="flex gap-3">
      <form
        className="w-full h-screen flex justify-center items-center"
        action={initTablesFormAction}
      >
        <button>Init Tables</button>
      </form>
      <form
        className="w-full h-screen flex justify-center items-center"
        action={seedTablesFormAction}
      >
        <button>Seed Tables</button>
      </form>
    </div>
  );
}
