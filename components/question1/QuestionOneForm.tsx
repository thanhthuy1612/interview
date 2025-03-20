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
import { selectedType } from "@/constants/question1";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const formSchema = z.object({
  type: z.string().min(1, { message: "Required!" }),
  i: z.string().min(-1, { message: "Required!" }),
  j: z.string().min(0, { message: "Required!" }),
});

export interface IQuestionOneFormProps {
  handleSubmit: (value: z.infer<typeof formSchema>) => void;
}

const QuestionOneForm: React.FC<IQuestionOneFormProps> = ({ handleSubmit }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      i: "",
      j: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    handleSubmit(values);
    form.resetField("type");
    form.resetField("i");
    form.resetField("j");
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedType.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-1">
          <FormField
            control={form.control}
            name="i"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number 1</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="i" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex-1">
          <FormField
            control={form.control}
            name="j"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number 2</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="j" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full flex-1 mt-5 cursor-pointer" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default QuestionOneForm;
