import { columns, QuestionOneType } from "@/components/question1/columns";
import { DataTable } from "@/components/ui/data-table-basic";
import React from "react";

export interface IQuestionOneTableProps {
  data: QuestionOneType[];
}

const QuestionOneTable: React.FC<IQuestionOneTableProps> = ({ data }) => {
  return <DataTable columns={columns} data={data} />;
};

export default QuestionOneTable;
