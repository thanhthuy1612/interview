"use client";

import QuestionThreeForm, {
  formSchema,
} from "@/components/question3/QuestionThreeForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { z } from "zod";

const QuestionThree: React.FC = () => {
  const [request, setRequest] = React.useState<
    z.infer<typeof formSchema> | undefined
  >();
  const [volumeWater, setVolumeWater] = React.useState<number>(0);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  const drawBlocks = () => {
    const input = request?.input ?? "";
    const numbers = input.split(",").map(Number);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width / numbers.length;

    if (ctx) {
      // Vẽ các cột
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < numbers.length; i++) {
        // Tăng chiều cao lên 10 để dễ nhìn
        const height = numbers[i] * 10;
        ctx.fillStyle = "#ccc";
        ctx.fillRect(i * width, canvas.height - height, width - 2, height);
      }

      // Tính và vẽ phần nước
      const maxWater = drawWater(numbers, ctx, width, canvas.height);
      setVolumeWater(maxWater);
    }
  };

  const drawWater = (
    heights: number[],
    ctx: CanvasRenderingContext2D,
    width: number,
    canvasHeight: number
  ) => {
    const leftMax: number[] = [];
    const rightMax: number[] = [];
    const n = heights.length;

    leftMax[0] = heights[0];
    for (let i = 1; i < n; i++) {
      leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
    }

    rightMax[n - 1] = heights[n - 1];
    for (let i = n - 2; i >= 0; i--) {
      rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
    }

    // Vẽ phần nước
    // Màu xanh cho nước
    ctx.fillStyle = "blue";
    for (let i = 0; i < n; i++) {
      // Tăng chiều cao lên 10 để dễ nhìn
      const waterHeight = (Math.min(leftMax[i], rightMax[i]) - heights[i]) * 10;
      if (waterHeight > 0) {
        ctx.fillRect(
          i * width,
          canvasHeight - heights[i] * 10 - waterHeight,
          width - 2,
          waterHeight
        );
      }
    }
    // Tính lượng nước
    let water = 0;
    for (let i = 0; i < n; i++) {
      water += Math.min(leftMax[i], rightMax[i]) - heights[i];
    }
    return water;
  };

  React.useEffect(() => {
    if (request?.input) {
      drawBlocks();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request]);
  return (
    <div className="flex flex-col justify-center items-center mx-5">
      <Card className="w-full max-w-[1190px] mx-5">
        <CardHeader>
          <CardTitle>Question 3</CardTitle>
          <CardDescription>
            The input of the input box will be a series of natural numbers [0,
            ∞) and separated by “,”
            <br></br>From the data in the input box, use javascript to draw the
            following shapes using canvas:
            <br></br>For example: with the input of 3,0,2,0,4, we get the
            result:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QuestionThreeForm handleSubmit={setRequest} />
        </CardContent>
        {request?.input && (
          <CardFooter>
            Volume of water that can be contained: {volumeWater}
          </CardFooter>
        )}
      </Card>

      {request?.input && (
        <canvas
          ref={canvasRef}
          width={500}
          height={300}
          className=" border my-10"
        />
      )}
    </div>
  );
};

export default QuestionThree;
