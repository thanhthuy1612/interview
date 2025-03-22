import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-[1190px] mx-5">
        <CardHeader>
          <CardTitle>Information</CardTitle>
          <CardDescription>TEST ROUND 1 - 20250319</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div>
            Link git:{" "}
            <Link
              className=" text-rose-600 hover:text-rose-800"
              href={"https://github.com/thanhthuy1612/interview"}
            >
              github
            </Link>
          </div>
          <div>
            Link question:{" "}
            <Link
              className=" text-rose-600 hover:text-rose-800"
              href={
                "https://docs.google.com/document/d/1uToGwJgwLVcpdD1an7JhYTucoE-5WAWBy6XyHBUWmvE"
              }
            >
              question
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
