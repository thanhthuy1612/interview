"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileIcon } from "lucide-react";

interface TopWord {
  word: string;
  count: number;
}

interface Result {
  uniqueWords: number;
  topWords: TopWord[];
}

// Hàm kiểm tra định dạng tệp
const isTxtFile = (file: File) => {
  return file && file.type === "text/plain";
};

const formSchema = z.object({
  file: z.instanceof(File).refine(isTxtFile, {
    message: "Tệp phải có định dạng .txt",
  }),
});

const QuestionTwoForm: React.FC = () => {
  const [result, setResult] = React.useState<Result | null>(null);
  const workerRef = React.useRef<Worker | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // Khởi tạo Web Worker
  const initWorker = () => {
    try {
      workerRef.current = new Worker(
        new URL("./textWorker.ts", import.meta.url)
      );
      workerRef.current.onmessage = (e) => {
        const { error, uniqueWords, topWords, text } = e.data;
        console.log(text);
        if (error) {
          form.setError("file", { message: error });
          setResult(null);
        } else {
          setResult({ uniqueWords, topWords });
          form.clearErrors("file");
        }
      };
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (window.Worker) {
      initWorker();
    }
    return () => {
      // Giải phóng worker khi component bị hủy
      workerRef.current?.terminate();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const file = data.file;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      console.log(text, "1");
      workerRef.current?.postMessage(text);
    };
    reader.readAsText(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Lấy tệp đầu tiên
    setResult(null);
    const file = event.target.files?.[0];
    if (file) {
      // Cập nhật giá trị file trong form
      form.setValue("file", file);
      form.clearErrors("file");
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    console.log(file, "file");
    if (file) {
      // Cập nhật giá trị file trong form
      form.setValue("file", file);
      form.clearErrors("file");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="file"
          render={({}) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <div>
                  <div
                    onDrop={handleDrop}
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                    onDragOver={(event) => event.preventDefault()}
                    className=" border-2 text-center border-dashed rounded-2xl px-5 py-10"
                  >
                    {form.getValues("file")?.name ? (
                      <p className="flex gap-3 justify-center">
                        <FileIcon />
                        {form.getValues("file")?.name}
                      </p>
                    ) : (
                      "Drag and drop text files (.txt) here"
                    )}
                  </div>
                  <Input
                    id="fileInput"
                    className=" hidden"
                    type="file"
                    accept=".txt"
                    onChange={handleFileChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
              <FormDescription>
                - Text files only use alphabets, do not contain numbers.
                <br></br>- Text files only contain the following special
                characters: period (.), comma (,), space ( )
              </FormDescription>
            </FormItem>
          )}
        />
        {result && (
          <div className="border rounded-2xl p-5">
            <p>Total number of different words: {result.uniqueWords}</p>
            <h4>3 most repeated words:</h4>
            <ul>
              {result.topWords.map(({ word, count }) => (
                <li className=" list-disc ml-5" key={word}>
                  {word}: {count}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button className="w-full cursor-pointer" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default QuestionTwoForm;
