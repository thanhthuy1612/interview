"use client";

import { QuestionOneType } from "@/components/question1/columns";
import QuestionOneForm, {
  formSchema,
} from "@/components/question1/QuestionOneForm";
import QuestionOneTable from "@/components/question1/QuestionOneTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { z } from "zod";

const QuestionOne: React.FC = () => {
  const [request, setRequest] = React.useState<
    z.infer<typeof formSchema> | undefined
  >();
  const [data, setData] = React.useState<QuestionOneType[]>([]);

  const addElement = (array: number[], i: number, x: number) => {
    if (i === 0) {
      // Thêm phần tử x vào đầu danh sách
      array.unshift(x);
    } else {
      // Thêm vào sau phần tử x vào vị trí thứ i
      // splice(start, deleteCount, item1, item2, /* …, */ itemN)
      array.splice(i, 0, x);
    }
  };

  // Hàm tìm phần tử nhỏ nhất trong đoạn từ i đến j
  const findMin = (array: number[], i: number, j: number) => {
    // Tìm phần tử nhỏ nhất trong đoạn từ i đến j
    return Math.min(...array.slice(i - 1, j));
  };

  const handleRequest = (array: number[], t: string, x: number, y: number) => {
    switch (t) {
      // + i x – bổ sung số nguyên x vào vị trí sau phần tử thứ i của danh sách các số nguyên hiện có,
      // nếu i = 0 thì có nghĩa là bổ sung vào đầu danh sách,
      case "+":
        addElement(array, x, y);
        setData((pre) => [
          ...pre,
          {
            request: `${request?.type} ${request?.i} ${request?.j}`,
            output: null,
            array,
          },
        ]);
        return;
      // ? i j – đưa ra phần tử nhỏ nhất trong đoạn từ phần tử thứ i đến hết phần tử thứ j trong danh sách.
      case "?":
        const min = findMin(array, x, y);
        setData((pre) => [
          ...pre,
          {
            request: `${request?.type} ${request?.i} ${request?.j}`,
            output: min,
            array,
          },
        ]);
        return min;
      default:
        break;
    }
  };
  React.useEffect(() => {
    if (request?.type && request?.i && request?.j) {
      const currentArray = data.length ? [...data[data.length - 1].array] : [];
      handleRequest(
        currentArray,
        request?.type,
        parseFloat(request?.i),
        parseFloat(request?.j)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);

  return (
    <div className="flex flex-col items-center mt-10 mx-5">
      <Card className="w-full max-w-[1190px] mx-5">
        <CardHeader>
          <CardTitle>Question 1</CardTitle>
          <CardDescription>
            + i x – adds integer x to the position after element i of the
            existing list of integers, if i = 0 then it means adding to the
            beginning of the list
            <br />? i j – returns the smallest element in the range from element
            i to the end of element j in the list
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QuestionOneForm handleSubmit={setRequest} />
        </CardContent>
      </Card>
      <div className="container mx-5 py-10 max-w-[1190px]">
        <QuestionOneTable data={data} />
      </div>
    </div>
  );
};

export default QuestionOne;
