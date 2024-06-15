"use client";

import { useFormState } from "react-dom";
import { initSQLFunction, initTables, seedTables } from "../actions";
import { Button } from "@/components/ui/button";

export default function Init() {
  const [initTablesState, initTablesFormAction] = useFormState(initTables, {
    msg: "",
  });
  const [seedTablesState, seedTablesFormAction] = useFormState(seedTables, {
    msg: "",
  });
  const [initSQLFunctionState, initSQLFunctionFormAction] = useFormState(
    initSQLFunction,
    {
      msg: "",
    }
  );

  return (
    <div className="flex gap-3 items-center justify-center w-full h-screen">
      <form action={initTablesFormAction}>
        <Button>Init Tables</Button>
      </form>
      <form action={seedTablesFormAction}>
        <Button>Seed Tables</Button>
      </form>
      <form action={initSQLFunctionFormAction}>
        <Button>Init SQL functions/procedures</Button>
      </form>
    </div>
  );
}
