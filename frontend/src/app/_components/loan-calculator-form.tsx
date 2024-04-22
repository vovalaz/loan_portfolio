"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

enum LoanType {
  First = "first",
  Second = "second",
  Third = "third",
}

const formSchema = z.object({
  type: z.nativeEnum(LoanType),
  amount: z.number(),
  term: z.number(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function LoanCalculatorForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      term: 0,
    },
  });

  function onSubmit(values: FormSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Loan types</SelectLabel>
                      <SelectItem value={LoanType.First}>First</SelectItem>
                      <SelectItem value={LoanType.Second}>Second</SelectItem>
                      <SelectItem value={LoanType.Third}>Third</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Select loan type</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={() => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter loan amount"
                  {...form.register("amount", { valueAsNumber: true })}
                />
              </FormControl>
              <FormDescription>Enter loan amount</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="term"
          render={() => (
            <FormItem>
              <FormLabel>Term</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter loan term in months"
                  {...form.register("term", { valueAsNumber: true })}
                />
              </FormControl>
              <FormDescription>Enter loan term in months</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
