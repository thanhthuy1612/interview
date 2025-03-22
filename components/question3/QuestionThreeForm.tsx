"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const formSchema = z.object({
  input: z.string().refine((value) => /^[0-9,\s]*$/.test(value), {
    message: "Accept only natural numbers and commas",
  }),
});

export interface IQuestionThreeFormProps {
  handleSubmit: (value: z.infer<typeof formSchema>) => void;
}

const QuestionThreeForm: React.FC<IQuestionThreeFormProps> = ({
  handleSubmit,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleSubmit(values);
    form.resetField("input");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 space-x-5 w-full flex flex-col md:flex-row"
      >
        <div className="flex-1">
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Input</FormLabel>
                <FormControl>
                  <Input placeholder="Input..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className=" mt-5 cursor-pointer" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};
export default QuestionThreeForm;
