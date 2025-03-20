import QuestionTwoForm from "@/components/question2/QuestionTwoForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const QuestionTwo: React.FC = () => {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-lg mx-5">
        <CardHeader>
          <CardTitle>Question 2</CardTitle>
          <CardDescription>
            Drag&Drop container đọc file văn bản (.txt) người dùng kéo thả vào
            và thống kê ra tổng số từ khác nhau xuất hiện trong file văn bản và
            3 từ được lặp lại nhiều nhất cùng số lần lặp lại của 3 từ đó. (Lưu ý
            không phân biệt chữ hoa hay chữ thường)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QuestionTwoForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionTwo;
