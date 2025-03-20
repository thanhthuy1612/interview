"use client";

import { ColumnDef } from "@tanstack/react-table";

export type QuestionOneType = {
  array: number[];
  output: number | null;
  request: string;
};

export const columns: ColumnDef<QuestionOneType>[] = [
  {
    accessorKey: "request",
    header: "Request",
  },
  {
    accessorKey: "array",
    header: "Array",
  },
  {
    accessorKey: "output",
    header: "Output",
  },
];
